# Importamos las dependencias necesarias de FastAPI y otros módulos del proyecto
from fastapi import APIRouter, HTTPException  # APIRouter para definir rutas y HTTPException para manejar errores HTTP
from app.models.patien import PatientData  # Modelo de datos del paciente definido en otra parte del proyecto
from app.services.generation_service import generate_samples  # Servicio que genera muestras basado en datos del paciente
from fastapi.responses import JSONResponse  # Respuesta personalizada en formato JSON

# Creación de un enrutador para agrupar endpoints relacionados
router = APIRouter()

# Definición del endpoint POST para generar muestras
@router.post("/samples/")
def generate_samples_endpoint(data: PatientData, class_label: int, num_samples: int = 1):
    """
    Endpoint para generar muestras basadas en los datos de entrada.
    Parámetros:
        - data: Objeto de tipo PatientData que contiene los datos del paciente.
        - class_label: Etiqueta de clase para las muestras a generar (por ejemplo, 0 o 1).
        - num_samples: Número de muestras a generar (valor por defecto: 1).
    Retorna:
        - JSONResponse con las muestras generadas o un error HTTP en caso de fallos.
    """

    # Validación: Verificar que el número de muestras solicitado sea mayor a 0
    if num_samples < 1:
        raise HTTPException(status_code=400, detail="num_samples must be greater than 0")
    
    # Validación: Verificar que `class_label` esté dentro del rango permitido
    max_class_label = 2  # Definimos el máximo valor de clase permitido (por ejemplo, clases 0 y 1)
    if class_label < 0 or class_label > max_class_label:
        raise HTTPException(
            status_code=400, 
            detail=f"class_label must be between 0 and {max_class_label}"
        )
    
    # Intentamos generar muestras llamando al servicio
    try:
        samples = generate_samples(data, class_label, num_samples)  # Generar las muestras
        return JSONResponse(
            content={"data": samples},  # Enviar los datos generados como respuesta
            status_code=200  # Código HTTP para éxito
        )
    except Exception as e:
        """
        Capturamos cualquier excepción inesperada durante la generación.
        - Registramos el error con su traza.
        - Retornamos un error HTTP 500 con detalles.
        """
        import traceback  # Módulo para obtener información detallada sobre el error
        error_message = f"Error generating samples: {str(e)}\n{traceback.format_exc()}"
        print(error_message)  # Imprimimos el mensaje de error en los logs
        raise HTTPException(
            status_code=500,  # Código HTTP para errores internos del servidor
            detail=error_message  # Incluimos detalles del error en la respuesta
        )

