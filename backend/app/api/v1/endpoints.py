from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from app.schemas.user_schema import UserCreate, UserResponse
from app.services.UserService import create_user
from app.db.session import get_db

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
def register_user(user_create: UserCreate, db: Session = Depends(get_db)):
    user = create_user(db, user_create)
    if user is None:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="El correo ya está en uso"
        )
    return user