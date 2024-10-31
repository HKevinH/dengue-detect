# app/services/generation_service.py

import pandas as pd
import torch
from app.models.load_models import cvae, label_encoder, encoder
from app.models.patien import symptom_columns, categorical_columns

def preprocess_input(data):
    # Preprocesar los datos
    input_df = pd.DataFrame([data.dict()])
    input_df[categorical_columns] = input_df[categorical_columns].astype(str)
    input_cat_encoded = encoder.transform(input_df[categorical_columns])
    input_cat_df = pd.DataFrame(input_cat_encoded, columns=encoder.get_feature_names_out(categorical_columns))
    input_final = pd.concat([input_df[symptom_columns].reset_index(drop=True), input_cat_df], axis=1)
    return input_final

def generate_samples(data, class_label, num_samples):
    input_final = preprocess_input(data)
    input_tensor = torch.tensor(input_final.values, dtype=torch.float32)
    with torch.no_grad():
        y_new = torch.tensor([class_label] * num_samples)
        z = torch.randn(num_samples, cvae.latent_dim)
        samples = cvae.decode(z, y_new)
        samples = samples.numpy()
    samples_df = pd.DataFrame(samples, columns=input_final.columns)
    for col in symptom_columns:
        samples_df[col] = (samples_df[col] > 0.5).astype(int)
    return samples_df.to_dict(orient='records')
