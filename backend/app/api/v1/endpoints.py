from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from app.schemas.user_schema import UserCreate, UserResponse
from app.services.userService import create_user
from app.db.session import get_db
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy.future import select
from app.models.user import User

router = APIRouter()

# Definir todos los endpoints y testarlos
# Usar Token y JWT para verificar acceso a los endpoints
# Importante documentar todos los endpoints
# Ejemplo de un CRUD
# Crear un item
# Leer un item
# Actualizar un item
# Importante no meter logica de negocio en los endpoints


@router.post("/register", response_model=UserResponse, status_code=status.HTTP_201_CREATED)
async def register_user(user_create: UserCreate, db: AsyncSession = Depends(get_db)):
    result = await db.execute(select(User).where(User.email == user_create.email))
    user_in_db = result.scalars().first()

    if user_in_db:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="El correo ya está en uso"
        )
        
    user = await create_user(db, user_create)
    await db.commit()
    return user


@router.get("/login")
async def login_user():
    return {"message": "Login User"}