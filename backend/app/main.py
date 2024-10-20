from fastapi import FastAPI
from app.api.v1.endpoints import router as user_router

app = FastAPI()

# Incluir las rutas de la API
app.include_router(user_router, prefix="/api/v1", tags=["users"])

@app.get("/")
def read_root():
    return {"message": "Welcome to the FastAPI Backend with Layered Architecture"}
