from fastapi import FastAPI
from app.api.v1.endpoints import router as item_router

app = FastAPI()

# Incluir las rutas de la API
app.include_router(item_router, prefix="/api/v1")

@app.get("/")
def read_root():
    return {"message": "Welcome to the FastAPI Backend with Layered Architecture"}
