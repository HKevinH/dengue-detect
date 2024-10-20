from fastapi import FastAPI
from app.api.v1.endpoints import router as user_router
from app.db.init_db import init_db

app = FastAPI()

# Incluir las rutas de la API
app.include_router(user_router, prefix="/api/v1", tags=["users"])

@app.on_event("startup")
async def startup_event():
    # Crear las tablas en la base de datos de manera asíncrona
    await init_db()

@app.get("/")
def read_root():
    return {"message": "Welcome to the FastAPI Backend with Layered Architecture"}

