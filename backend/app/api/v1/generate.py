# app/api/endpoints/generate.py

from fastapi import APIRouter, HTTPException
from app.models.patien import PatientData
from app.services.generation_service import generate_samples
from fastapi.responses import JSONResponse

router = APIRouter()

@router.post("/samples/")
@router.post("/samples/")
def generate_samples_endpoint(data: PatientData, class_label: int, num_samples: int = 1):
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
