# app/api/endpoints/predict.py

from fastapi import APIRouter
from app.models.patien import PatientData
from app.services.prediction_service import predict_classification

router = APIRouter()

@router.post("/classification/")
def predict_classification_endpoint(data: PatientData):
    return predict_classification(data)
