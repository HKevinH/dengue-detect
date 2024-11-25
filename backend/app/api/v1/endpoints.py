"""
# FastAPI User Management API

Este archivo define un conjunto de endpoints relacionados con la gestión de usuarios, como registro, inicio de sesión, cierre de sesión, actualización de datos y obtención de resultados. La lógica principal se encuentra en servicios y modelos externos para mantener el principio de separación de responsabilidades.

## Endpoints incluidos:
- `/register`: Registrar un nuevo usuario.
- `/login`: Iniciar sesión con credenciales válidas.
- `/me`: Obtener datos del usuario autenticado.
- `/logout/{user_id}`: Cerrar sesión de un usuario.
- `/updateUser/{user_id}`: Actualizar información de un usuario.
- `/results/{user_id}`: Obtener resultados relacionados con un usuario.

### Tecnologías utilizadas:
- FastAPI: Framework principal para la creación de la API.
- SQLAlchemy: ORM utilizado para la gestión de la base de datos.
- JWT: Tokens para autenticación y autorización.
- AsyncSession: Manejo de consultas de base de datos asíncronas.

### Consideraciones:
- Este archivo no contiene lógica de negocio. Esta reside en los servicios (userService).
- Todos los endpoints están diseñados para trabajar con un sistema basado en JWT.
"""

from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from app.schemas.user_schema import UserCreate, UserResponse, UserLogin, LoginResponse
from app.services.userService import create_user, authenticate_user, create_access_token, logout_user
from app.db.session import get_db
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy.future import select
from app.models.user import User

router = APIRouter()

# --- Endpoint: Registro de usuario ---
@router.post("/register", response_model=UserResponse, status_code=status.HTTP_201_CREATED)
async def register_user(user_create: UserCreate, db: AsyncSession = Depends(get_db)):
    """
    Registra un nuevo usuario en el sistema.

    - **user_create**: Esquema que contiene los datos del usuario a registrar.
    - **db**: Sesión de base de datos inyectada automáticamente.
    
    Retorna un mensaje de éxito si el usuario se registra correctamente, o un error si el correo ya existe o si ocurre algún fallo en el proceso.
    """
    result = await db.execute(select(User).where(User.email == user_create.email))
    user_in_db = result.scalars().first()

    if user_in_db:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="El correo ya está en uso"
        )
        
    user = await create_user(db, user_create)
    await db.commit()
    if not user:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Ocurrió un error al crear el usuario"
        )
    else:
        raise HTTPException(
            status_code=status.HTTP_201_CREATED,
            detail="Usuario creado exitosamente",
            data=user
        )


# --- Endpoint: Inicio de sesión ---
@router.post("/login", response_model=LoginResponse)
async def login_user(user_login: UserLogin, db: AsyncSession = Depends(get_db)):
    """
    Permite a un usuario iniciar sesión en el sistema.

    - **user_login**: Esquema con las credenciales del usuario.
    - **db**: Sesión de base de datos inyectada automáticamente.
    
    Retorna un token de acceso en caso de éxito, o un error si las credenciales son incorrectas.
    """
    user = await authenticate_user(db, user_login.email, user_login.password)
    if not user:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail='El correo o contraseña son incorrectos'
        )
    access_token = create_access_token(data={"sub": user.email})
    return {"access_token": access_token, "token_type": "bearer"}


# --- Endpoint: Obtener información del usuario autenticado ---
@router.post("/me", response_model=UserResponse)
async def get_user_me(user_login: UserLogin, db: AsyncSession = Depends(get_db)):
    """
    Retorna información del usuario autenticado.

    - **user_login**: Esquema con las credenciales del usuario.
    - **db**: Sesión de base de datos inyectada automáticamente.
    
    (Nota: Este endpoint necesita lógica adicional para manejar tokens).
    """
    result = await authenticate_user(db, user_login.email, user_login.password)
    return result


# --- Endpoint: Cerrar sesión ---
@router.get("/logout/{user_id}")
async def logout(user_id: int, db: AsyncSession = Depends(get_db)):
    """
    Cierra la sesión de un usuario específico.

    - **user_id**: Identificador del usuario.
    - **db**: Sesión de base de datos inyectada automáticamente.
    
    Retorna un mensaje de éxito si el cierre de sesión se realiza correctamente.
    """
    print(user_id)
    user_logout = await logout_user(id=user_id, db=db)
    if not user_logout:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Ocurrió un error al cerrar sesión"
        )
        
    return {"message": "Sesión cerrada exitosamente"}


# --- Endpoint: Actualizar usuario ---
@router.post("/updateUser/{user_id}", response_model=UserResponse)
async def update_user(user_id: int, db: AsyncSession = Depends(get_db)):
    """
    Actualiza información del usuario.

    - **user_id**: Identificador del usuario.
    - **db**: Sesión de base de datos inyectada automáticamente.
    
    (Nota: Este endpoint necesita lógica adicional para manejar la actualización).
    """
    return {"message": "User updated successfully"}


# --- Endpoint: Obtener resultados ---
@router.get("/results/{user_id}")
async def get_results(user_id: int, db: AsyncSession = Depends(get_db)):
    """
    Obtiene resultados relacionados con un usuario.

    - **user_id**: Identificador del usuario.
    - **db**: Sesión de base de datos inyectada automáticamente.
    
    (Nota: Este endpoint necesita lógica adicional para obtener y procesar los resultados).
    """
    return {"message": "Results obtained successfully"}
