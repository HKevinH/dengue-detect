# app/api/endpoints/generate.py

from fastapi import APIRouter
from app.models.patien import PatientData
from app.services.generation_service import generate_samples

router = APIRouter()

@router.post("/samples/")
def generate_samples_endpoint(data: PatientData, class_label: int, num_samples: int = 1):
    return generate_samples(data, class_label, num_samples)
