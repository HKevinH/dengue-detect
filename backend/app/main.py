from fastapi import FastAPI
from app.api.v1.endpoints import router as user_router
from app.db.init_db import init_db
from app.api.v1.generate import router as generate_router
from app.api.v1.predict import router as predict_router
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()
prefix = "/api/v1"

# Incluir las rutas de la API
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Permitir todas las solicitudes
    allow_credentials=True,
    allow_methods=["*"],  # Permite todos los métodos (GET, POST, etc.)
    allow_headers=["*"],  # Permite todos los encabezados
)

app.include_router(user_router, prefix=f"{prefix}", tags=["users"])
app.include_router(generate_router, prefix=f"{prefix}", tags=["generate"])
app.include_router(predict_router, prefix=f"{prefix}", tags=["predict"])

# @app.on_event("startup")
# async def startup_event():
    # await init_db()

@app.get("/")
def read_root():
    return {"message": "Welcome to the FastAPI Backend with Layered Architecture"}

