# Importamos las dependencias necesarias de FastAPI y otros módulos del proyecto
from fastapi import APIRouter, HTTPException  # APIRouter para definir rutas y HTTPException para manejar errores HTTP
from app.models.patien import PatientData  # Modelo que representa los datos de un paciente
from app.services.prediction_service import predict_classification  # Servicio que realiza predicciones basadas en los datos del paciente

# Creación de un enrutador para agrupar endpoints relacionados
router = APIRouter()

# Definición del endpoint POST para realizar predicciones
@router.post("/classification")
def predict_classification_endpoint(data: PatientData):
    """
    Endpoint para predecir la clasificación basada en los datos de entrada.
    Parámetros:
        - data: Objeto de tipo PatientData que contiene los datos del paciente.
    Retorna:
        - Resultado de la predicción realizada por el servicio de clasificación.
    """
    try:
        # Llamada al servicio de predicción con los datos proporcionados
        predict = predict_classification(data)
        return predict  # Devolvemos el resultado de la predicción
    except Exception as e:
        """
        Capturamos cualquier excepción inesperada durante la predicción.
        - Retornamos un error HTTP 500 con detalles del error.
        """
        raise HTTPException(
            status_code=500,  # Código HTTP para errores internos del servidor
            detail=str(e)  # Incluimos el mensaje de error en la respuesta
        )
