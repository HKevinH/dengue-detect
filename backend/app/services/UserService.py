"""
# Servicios de Usuario

Este archivo define las funciones relacionadas con la gestión de usuarios en la base de datos, incluyendo registro, autenticación, creación de tokens, actualización de datos y cierre de sesión. Utiliza SQLAlchemy, Passlib para el manejo de contraseñas y JWT para la autenticación basada en tokens.

## Funciones incluidas:
1. **`create_user`**:
   - Registra un nuevo usuario en la base de datos.
   - La contraseña es almacenada de forma segura utilizando hashing con `bcrypt`.

2. **`authenticate_user`**:
   - Verifica las credenciales de un usuario (correo y contraseña).
   - Si las credenciales son correctas, actualiza el estado del usuario a "en línea".

3. **`create_access_token`**:
   - Genera un token JWT para autenticación.
   - Los datos codificados incluyen información clave para identificar al usuario.

4. **`logout_user`**:
   - Marca al usuario como "offline" al cerrar sesión.

5. **`updateUser`**:
   - Actualiza los datos de un usuario en la base de datos.

6. **`getResultsByUser`**:
   - Recupera los datos de un usuario por su identificador.

## Cómo extender:
- Agregar validaciones adicionales para roles, estados de cuenta u otros atributos.
- Incluir manejo de excepciones para errores específicos, como usuarios no encontrados.
"""

from sqlalchemy.orm import Session
from ..models.user import User
from app.schemas.user_schema import UserCreate
from passlib.context import CryptContext
from sqlalchemy.future import select
from sqlalchemy import update

import jwt
from sqlalchemy.ext.asyncio import AsyncSession
from fastapi import HTTPException, status

# Clave y algoritmo para la generación de tokens JWT
SECRET_KEY = "R2VzaXRpb24gZGUgcHJveWVjdG9zIFRJIC0gVVNDIC0gQml0QnVpbGRlcnMgLSBEZXRlbmNpb24gZGVsIGRlbmd1ZQ=="
ALGORITHM = "HS256"

# Contexto para hashing de contraseñas
pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")

# --- Función: Crear un nuevo usuario ---
async def create_user(db: Session, user_create: UserCreate):
    """
    Registra un nuevo usuario en la base de datos.

    ### Parámetros:
    - **`db`**: Sesión de la base de datos.
    - **`user_create`**: Objeto con los datos del usuario a registrar.

    ### Proceso:
    - La contraseña se encripta utilizando `bcrypt`.
    - Se agrega el nuevo usuario a la base de datos y se confirma el cambio.

    ### Retorno:
    - El usuario creado.
    """
    hashed_password = pwd_context.hash(user_create.password)
    print(hashed_password)

    new_user = User(
        name=user_create.name,
        email=user_create.email,
        password=hashed_password,
        state_account="activo",
        role="paciente",  
        online=False
    )

    db.add(new_user)
    await db.commit()
    await db.refresh(new_user)

    return new_user

# --- Función: Autenticar usuario ---
async def authenticate_user(db: AsyncSession, email: str, password: str):
    """
    Autentica un usuario utilizando su correo y contraseña.

    ### Parámetros:
    - **`db`**: Sesión de la base de datos.
    - **`email`**: Correo del usuario.
    - **`password`**: Contraseña del usuario.

    ### Proceso:
    - Verifica si el correo existe y si la contraseña coincide.
    - Si es correcto, actualiza el estado del usuario a "en línea".

    ### Excepciones:
    - Lanza `HTTPException` si las credenciales son incorrectas.

    ### Retorno:
    - Objeto del usuario autenticado.
    """
    result = await db.execute(select(User).where(User.email == email))
    user = result.scalars().first()

    if not user or not pwd_context.verify(password, user.password):
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail='El correo o contraseña son incorrectos'
        )
    stmt = update(User).where(User.email == email).values(online=True)
    await db.execute(stmt)
    await db.commit()
    return user

# --- Función: Crear un token de acceso ---
def create_access_token(data: dict):
    """
    Genera un token JWT para autenticación.

    ### Parámetros:
    - **`data`**: Diccionario con datos a codificar en el token.

    ### Retorno:
    - Token JWT codificado.
    """
    to_encode = data.copy()
    return jwt.encode(to_encode, SECRET_KEY, algorithm=ALGORITHM)

# --- Función: Cerrar sesión ---
async def logout_user(db: AsyncSession, id: str):
    """
    Marca al usuario como "offline" al cerrar sesión.

    ### Parámetros:
    - **`db`**: Sesión de la base de datos.
    - **`id`**: Identificador del usuario.

    ### Retorno:
    - `True` si la operación fue exitosa.
    """
    stmt = update(User).where(User.id == id).values(online=False)
    await db.execute(stmt)
    await db.commit()
    return True

# --- Función: Actualizar usuario ---
async def updateUser(db: AsyncSession, user):
    """
    Actualiza los datos de un usuario en la base de datos.

    ### Parámetros:
    - **`db`**: Sesión de la base de datos.
    - **`user`**: Objeto con los datos actualizados del usuario.

    ### Retorno:
    - Resultado de la operación.
    """
    stmt = update(User).where(User.id == user.id).values(
        name=user.name,
        email=user.email,
        password=user.password,
        state_account=user.state_account,
        role=user.role,
        online=user.online
    )
    result = await db.execute(stmt)
    await db.commit()
    return result

# --- Función: Obtener resultados por usuario ---
async def getResultsByUser(db: AsyncSession, id: str):
    """
    Recupera los datos de un usuario por su identificador.

    ### Parámetros:
    - **`db`**: Sesión de la base de datos.
    - **`id`**: Identificador del usuario.

    ### Retorno:
    - Objeto del usuario.
    """
    result = await db.execute(select(User).where(User.id == id))
    user = result.scalars().first()
    return user

