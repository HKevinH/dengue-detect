"""
# Servicio de Predicción

Este archivo implementa funciones para preprocesar datos y realizar predicciones utilizando un modelo preentrenado. Está diseñado para ser utilizado en tareas de clasificación, donde los datos de entrada son procesados y evaluados mediante un modelo Gradient Boosting (GB).

## Funciones principales:
1. **`preprocess_input`**:
   - Convierte los datos de entrada del usuario en un formato adecuado para el modelo de predicción.
   - Codifica las columnas categóricas en un formato One-Hot.
   - Combina columnas sintomáticas y categóricas codificadas en un solo DataFrame.

2. **`predict_classification`**:
   - Realiza predicciones utilizando el modelo preentrenado.
   - Asocia las predicciones con sus etiquetas correspondientes utilizando un codificador de etiquetas.
   - Devuelve el resultado de la predicción en un formato legible.

## Cómo extender:
- Agregar validaciones adicionales para verificar la integridad de los datos de entrada.
- Incluir soporte para otros modelos o tipos de predicción (por ejemplo, regresión).

"""
import pandas as pd
import torch
from app.models.load_models import gb_model, label_encoder, encoder  # Importar modelo y codificadores
from app.models.patien import symptom_columns, categorical_columns  # Importar columnas necesarias

def preprocess_input(data):
    """
    Preprocesa los datos de entrada del usuario.

    ### Parámetros:
    - **`data`**: Objeto de datos del usuario, compatible con `BaseModel` de Pydantic.

    ### Proceso:
    - Convierte los datos en un DataFrame.
    - Codifica las columnas categóricas en formato One-Hot utilizando el codificador cargado.
    - Combina columnas sintomáticas con categóricas codificadas en un único DataFrame.

    ### Retorno:
    - DataFrame con las columnas necesarias para el modelo de predicción.
    """
    # Convierte los datos del usuario en un DataFrame
    input_df = pd.DataFrame([data.dict()])

    # Convierte las columnas categóricas a texto
    input_df[categorical_columns] = input_df[categorical_columns].astype(str)

    # Codifica las columnas categóricas
    input_cat_encoded = encoder.transform(input_df[categorical_columns])
    input_cat_df = pd.DataFrame(input_cat_encoded, columns=encoder.get_feature_names_out(categorical_columns))

    # Combina columnas sintomáticas y categóricas codificadas
    input_final = pd.concat([input_df[symptom_columns].reset_index(drop=True), input_cat_df], axis=1)
    return input_final

def predict_classification(data):
    """
    Realiza la predicción de clasificación basada en los datos de entrada.

    ### Parámetros:
    - **`data`**: Objeto de datos del usuario, compatible con `BaseModel` de Pydantic.

    ### Proceso:
    - Preprocesa los datos para obtener el formato requerido por el modelo.
    - Ajusta el orden de las columnas en base a las características esperadas por el modelo.
    - Utiliza el modelo preentrenado para realizar la predicción.
    - Decodifica la etiqueta predicha utilizando el codificador de etiquetas.

    ### Retorno:
    - Diccionario con los siguientes elementos:
      - **`prediction`**: Valor numérico de la predicción (por ejemplo, 0 o 1).
      - **`prediction_label`**: Etiqueta descriptiva asociada a la predicción.
    """
    print("Iniciando predicción")
    
    # Preprocesa los datos de entrada
    input_final = preprocess_input(data)

    # Ajusta las columnas al formato esperado por el modelo
    input_final = input_final.reindex(columns=gb_model.feature_names_in_, fill_value=0)

    # Realiza la predicción utilizando el modelo preentrenado
    prediction = gb_model.predict(input_final)[0]

    # Decodifica la predicción a su etiqueta original
    prediction_label = label_encoder.inverse_transform([prediction])[0]

    # Retorna la predicción como un diccionario
    return {"prediction": int(prediction), "prediction_label": prediction_label}
