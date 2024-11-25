"""
# Database Session Management

Este archivo configura y gestiona las sesiones de base de datos asíncronas para el proyecto FastAPI. Utiliza SQLAlchemy como ORM y está diseñado para manejar conexiones a bases de datos asíncronas. Este archivo es esencial para la interacción entre los modelos de datos y la base de datos.

## Componentes principales:
1. **Configuración de la base de datos**:
   - Utiliza `DATABASE_URL` definido en la configuración del proyecto.
   - Se crea un motor asíncrono (`create_async_engine`) con la URL de la base de datos.

2. **Declaración de la base**:
   - `Base`: Clase base para los modelos ORM.

3. **Gestión de sesiones**:
   - `SessionLocal`: Objeto de fábrica para crear sesiones asíncronas.
   - `get_db`: Dependencia utilizada en FastAPI para inyectar sesiones de base de datos en los endpoints.

## Tecnologías utilizadas:
- **SQLAlchemy**: Manejo de ORM.
- **FastAPI**: Framework para la API.
- **AsyncSession**: Soporte para operaciones de base de datos asíncronas.

## Cómo extender:
- Agregar configuraciones adicionales al motor, como pool size o timeout, según sea necesario.
- Implementar migraciones utilizando herramientas como Alembic.

"""

from sqlalchemy.ext.asyncio import create_async_engine, AsyncSession
from sqlalchemy.orm import sessionmaker
from app.core.config import settings
from sqlalchemy.ext.declarative import declarative_base
from fastapi import FastAPI

# Instancia de la aplicación FastAPI
app = FastAPI()

# URL de la base de datos (obtenida de las configuraciones del proyecto)
DATABASE_URL = settings.DATABASE_URL  

# Clase base para los modelos ORM
Base = declarative_base()

# Configuración del motor asíncrono
engine = create_async_engine(
    DATABASE_URL,  # URL de la base de datos
    echo=True      # Activa logs de SQL para depuración
)

# Configuración de fábrica de sesiones
SessionLocal = sessionmaker(
    bind=engine,        # Motor asíncrono
    class_=AsyncSession,  # Tipo de sesión
    expire_on_commit=False  # Los objetos no se desvinculan automáticamente después de commit
)
    
# Dependencia para obtener una sesión de base de datos en FastAPI
async def get_db():
    """
    Crea y gestiona una sesión de base de datos asíncrona.

    Este método es utilizado como una dependencia en los endpoints de FastAPI para 
    proporcionar acceso a la base de datos. Garantiza que la sesión se cierre correctamente
    después de usarse.

    ### Uso en un endpoint:
    ```python
    @app.get("/items/")
    async def read_items(db: AsyncSession = Depends(get_db)):
        # Lógica del endpoint utilizando la sesión
        pass
    ```

    ### Flujo:
    - Crea una sesión de base de datos.
    - La devuelve al endpoint que la utiliza.
    - Cierra la sesión al finalizar.
    """
    async with SessionLocal() as session:
        yield session
