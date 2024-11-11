# app/services/prediction_service.py

import pandas as pd
import torch
from app.models.load_models import gb_model, label_encoder, encoder
from app.models.patien import symptom_columns, categorical_columns

def preprocess_input(data):
    # Preprocesar los datos
    input_df = pd.DataFrame([data.dict()])
    input_df[categorical_columns] = input_df[categorical_columns].astype(str)
    input_cat_encoded = encoder.transform(input_df[categorical_columns])
    input_cat_df = pd.DataFrame(input_cat_encoded, columns=encoder.get_feature_names_out(categorical_columns))
    input_final = pd.concat([input_df[symptom_columns].reset_index(drop=True), input_cat_df], axis=1)
    return input_final

def predict_classification(data):
    print("entre")
    input_final = preprocess_input(data)
    input_final = input_final.reindex(columns=gb_model.feature_names_in_, fill_value=0)
    prediction = gb_model.predict(input_final)[0]
    prediction_label = label_encoder.inverse_transform([prediction])[0]
    return {"prediction": int(prediction), "prediction_label": prediction_label}
