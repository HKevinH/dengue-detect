"""
# Punto de Entrada Principal para la Aplicación FastAPI

Este archivo configura la instancia principal de FastAPI, define los middlewares y enruta las diferentes funcionalidades de la API. Implementa una arquitectura modular con rutas específicas agrupadas por funcionalidad.

## Componentes principales:
1. **Configuración de la instancia FastAPI**:
   - Define la raíz (`/`) de la aplicación.
   - Configura un prefijo general (`/api/v1`) para las rutas de la versión 1 de la API.

2. **Middlewares**:
   - **`CORS`**: Permite solicitudes de orígenes cruzados (Cross-Origin Resource Sharing). Actualmente configurado para aceptar solicitudes de cualquier origen.

3. **Rutas**:
   - **`user_router`**:
     - Gestiona las rutas relacionadas con los usuarios, importadas desde `app.api.v1.endpoints`.
   - **`generate_router`**:
     - Define las rutas relacionadas con la generación de datos, importadas desde `app.api.v1.generate`.
   - **`predict_router`**:
     - Define las rutas relacionadas con predicciones, importadas desde `app.api.v1.predict`.

4. **Base de datos**:
   - Se incluye una función para inicializar la base de datos (`init_db`), aunque está comentada en esta implementación.

5. **Raíz de la API**:
   - Define un endpoint simple (`/`) que devuelve un mensaje de bienvenida.

## Cómo extender:
- Agregar nuevos módulos de rutas para nuevas funcionalidades.
- Ajustar los parámetros de CORS según las necesidades de seguridad del entorno.
- Implementar eventos de inicio (`startup_event`) para inicializar la base de datos u otros servicios.

"""
from fastapi import FastAPI
from app.api.v1.endpoints import router as user_router
from app.db.init_db import init_db
from app.api.v1.generate import router as generate_router
from app.api.v1.predict import router as predict_router
from fastapi.middleware.cors import CORSMiddleware

# Instancia principal de FastAPI
app = FastAPI()

# Prefijo general para la API
prefix = "/api/v1"

# --- Configuración de Middlewares ---
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Permitir todas las solicitudes (se recomienda ajustar en producción)
    allow_credentials=True,
    allow_methods=["*"],  # Permite todos los métodos (GET, POST, PUT, DELETE, etc.)
    allow_headers=["*"],  # Permite todos los encabezados
)

# --- Inclusión de rutas ---
# Rutas relacionadas con usuarios
app.include_router(user_router, prefix=f"{prefix}", tags=["users"])
# Rutas para la generación de datos
app.include_router(generate_router, prefix=f"{prefix}", tags=["generate"])
# Rutas para predicciones
app.include_router(predict_router, prefix=f"{prefix}", tags=["predict"])

# --- Inicialización de la base de datos (comentar/descomentar según necesidad) ---
# @app.on_event("startup")
# async def startup_event():
#     await init_db()

# --- Raíz de la API ---
@app.get("/")
def read_root():
    """
    Endpoint raíz de la API.

    ### Retorno:
    - Un mensaje de bienvenida.
    """
    return {"message": "Welcome to the FastAPI Backend with Layered Architecture"}

