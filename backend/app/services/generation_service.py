"""
# Servicio de Generación de Muestras

Este archivo define las funciones para preprocesar datos de entrada y generar muestras sintéticas utilizando un modelo Condicional Variacional Autoencoder (CVAE). El servicio se integra con modelos preentrenados y codificadores previamente cargados.

## Funciones principales:
1. **`preprocess_input`**:
   - Convierte los datos de entrada del usuario en un formato adecuado para el modelo.
   - Codifica columnas categóricas utilizando un codificador One-Hot.
   - Combina columnas sintomáticas y categóricas codificadas en un único DataFrame.

2. **`generate_samples`**:
   - Utiliza el modelo CVAE para generar muestras sintéticas basadas en los datos preprocesados.
   - Las muestras generadas están condicionadas a una etiqueta de clase específica.
   - Devuelve las muestras generadas en formato de lista de diccionarios.

## Cómo extender:
- Agregar validaciones adicionales para los datos de entrada.
- Incluir nuevas funcionalidades, como generar múltiples configuraciones de muestras en una sola ejecución.
"""

import pandas as pd
import torch
from app.models.load_models import cvae, label_encoder, encoder  # Importar modelos y codificadores
from app.models.patien import symptom_columns, categorical_columns  # Importar columnas necesarias

def preprocess_input(data):
    """
    Preprocesa la entrada de datos del usuario convirtiéndola a un formato adecuado para el modelo.

    ### Parámetros:
    - **`data`**: Objeto de datos del usuario, compatible con `BaseModel` de Pydantic.

    ### Proceso:
    - Convierte los datos del usuario en un DataFrame.
    - Codifica columnas categóricas utilizando un codificador One-Hot.
    - Combina las columnas sintomáticas con las categóricas codificadas.

    ### Retorno:
    - DataFrame preprocesado con las columnas necesarias para el modelo CVAE.
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

    ### Parámetros:
    - **`data`**: Objeto de datos del usuario, compatible con `BaseModel` de Pydantic.
    - **`class_label`**: Etiqueta de clase para condicionar la generación de muestras.
    - **`num_samples`**: Número de muestras a generar.

    ### Proceso:
    - Preprocesa los datos para obtener el formato necesario.
    - Genera un espacio latente aleatorio y lo decodifica con el modelo CVAE.
    - Convierte las columnas sintomáticas a valores binarios (0 o 1).

    ### Validaciones:
    - Verifica que el tamaño de `y_new` coincida con el número de muestras.
    - Comprueba que el número de columnas en la salida del modelo coincida con las columnas de entrada.

    ### Retorno:
    - Lista de diccionarios con las muestras generadas.

    ### Excepciones:
    - Lanza `ValueError` si hay inconsistencias en las dimensiones de entrada o salida.
    """
    # Preprocesa la entrada para obtener el formato final necesario
    input_final = preprocess_input(data)
    input_tensor = torch.tensor(input_final.values, dtype=torch.float32)

    # Genera espacio latente aleatorio
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
