"""
# FastAPI Sample Generation Endpoint

Este archivo contiene el endpoint principal para la generación de muestras basadas en datos de pacientes. Utiliza un servicio especializado para crear datos simulados o generados según las especificaciones del usuario.

## Endpoints incluidos:
- `/samples/`: Genera muestras sintéticas a partir de datos de pacientes, con una etiqueta de clase especificada y un número determinado de muestras.

### Descripción general:
- **`PatientData`**: Modelo que contiene los datos necesarios de entrada para el generador.
- **`class_label`**: Etiqueta de clase para las muestras generadas. Solo se permiten valores dentro de un rango definido.
- **`num_samples`**: Número de muestras a generar. Debe ser mayor a 0.

### Tecnologías utilizadas:
- FastAPI: Framework para la creación del API.
- JSONResponse: Manejo personalizado de respuestas en formato JSON.
- Servicios externos: `generation_service` contiene la lógica de generación de datos.

### Manejo de errores:
- Validación de parámetros (`num_samples`, `class_label`).
- Excepciones generales capturadas para registrar errores y retornar mensajes significativos al cliente.

### Cómo extender:
- Modificar `max_class_label` para soportar más clases.
- Ajustar la lógica de generación en `generation_service`.

"""

from fastapi import APIRouter, HTTPException
from app.models.patien import PatientData
from app.services.generation_service import generate_samples
from fastapi.responses import JSONResponse

router = APIRouter()

# --- Endpoint: Generar muestras ---
@router.post("/samples/")
def generate_samples_endpoint(data: PatientData, class_label: int, num_samples: int = 1):
    """
    Genera muestras sintéticas basadas en los datos de un paciente.

    - **data**: Datos del paciente, proporcionados mediante el modelo `PatientData`.
    - **class_label**: Etiqueta de clase para las muestras generadas. Rango permitido definido por `max_class_label`.
    - **num_samples**: Número de muestras a generar. Debe ser mayor que 0. Valor predeterminado: 1.

    ### Respuestas:
    - **200**: Retorna las muestras generadas en un objeto JSON.
    - **400**: Error de validación en los parámetros (`num_samples` o `class_label`).
    - **500**: Error interno del servidor durante la generación.

    ### Ejemplo de respuesta exitosa:
    ```json
    {
        "data": [
            {"feature1": 0.5, "feature2": 1.2, "class_label": 1},
            {"feature1": 0.8, "feature2": 1.0, "class_label": 1}
        ]
    }
    ```

    ### Excepciones manejadas:
    - **`num_samples` menor a 1**: Genera un error 400.
    - **`class_label` fuera del rango permitido**: Genera un error 400.
    - **Errores durante la generación de muestras**: Se capturan y retornan como error 500 con trazas para facilitar la depuración.
    """
    if num_samples < 1:
        raise HTTPException(status_code=400, detail="num_samples must be greater than 0")
    
    # Validar que `class_label` esté dentro del rango permitido
    max_class_label = 2  # Asumiendo que el modelo solo soporta dos clases (0 y 1)
    if class_label < 0 or class_label > max_class_label:
        raise HTTPException(status_code=400, detail=f"class_label must be between 0 and {max_class_label}")
    
    try:
        samples = generate_samples(data, class_label, num_samples)
        return JSONResponse(
            content={"data": samples},
            status_code=200
        )
    except Exception as e:
        import traceback
        error_message = f"Error generating samples: {str(e)}\n{traceback.format_exc()}"
        print(error_message)
        raise HTTPException(
            status_code=500,
            detail=error_message
        )
