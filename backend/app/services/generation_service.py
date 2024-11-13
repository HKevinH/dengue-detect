# app/services/generation_service.py

import pandas as pd
import torch
from app.models.load_models import cvae, label_encoder, encoder  # Importar modelos y codificadores
from app.models.patien import symptom_columns, categorical_columns  # Importar columnas necesarias

def preprocess_input(data):
    """
    Preprocesa la entrada de datos del usuario convirtiéndola a un formato adecuado para el modelo.
    """
    # Convierte los datos del usuario en un DataFrame
    input_df = pd.DataFrame([data.dict()])

    # Asegura que las columnas categóricas estén en formato de texto
    input_df[categorical_columns] = input_df[categorical_columns].astype(str)

    # Codifica las columnas categóricas usando el encoder
    input_cat_encoded = encoder.transform(input_df[categorical_columns])
    input_cat_df = pd.DataFrame(input_cat_encoded, columns=encoder.get_feature_names_out(categorical_columns))

    # Concatena las columnas sintomáticas y las categóricas codificadas en un solo DataFrame
    input_final = pd.concat([input_df[symptom_columns].reset_index(drop=True), input_cat_df], axis=1)
    return input_final


def generate_samples(data, class_label, num_samples):
    """
    Genera muestras usando el modelo CVAE basado en la entrada de datos y una etiqueta de clase específica.
    """
    # Preprocesa la entrada para obtener el formato final necesario
    input_final = preprocess_input(data)
    input_tensor = torch.tensor(input_final.values, dtype=torch.float32)

    z = torch.randn(num_samples, cvae.latent_dim)  # Dimensión `(num_samples, latent_dim)`
    y_new = torch.tensor([class_label] * num_samples)  # Dimensión `(num_samples,)`

    # Verifica que el tamaño de `y_new` coincida con `num_samples`
    if y_new.shape[0] != num_samples:
        raise ValueError("`y_new` no tiene el mismo tamaño que `num_samples`.")

    # Decodificar el espacio latente para generar muestras con el modelo CVAE
    with torch.no_grad():
        samples = cvae.decode(z, y_new)  # Genera la salida del modelo

        # Validar que el número de columnas de salida coincida con las columnas de entrada preprocesada
        if samples.shape[1] != len(input_final.columns):
            raise ValueError(f"La salida de `samples` tiene {samples.shape[1]} columnas, "
                             f"pero se esperaban {len(input_final.columns)} columnas.")

        samples = samples.numpy()

    # Convierte la salida a un DataFrame con las mismas columnas que `input_final`
    samples_df = pd.DataFrame(samples, columns=input_final.columns)

    # Convierte las columnas sintomáticas a valores binarios (0 o 1)
    for col in symptom_columns:
        samples_df[col] = (samples_df[col] > 0.5).astype(int)

    # Devuelve las muestras generadas en formato de lista de diccionarios
    return samples_df.to_dict(orient='records')
