from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from app.schemas.user_schema import UserCreate, UserResponse, UserLogin, LoginResponse
from app.services.userService import create_user, authenticate_user, create_access_token,logout_user
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
    if not user:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Ocurrió un error al crear el usuario"
        )
    else :
        raise HTTPException(
            status_code=status.HTTP_201_CREATED,
            detail="Usuario creado exitosamente",
            data=user
        )
        
        
@router.post("/login", response_model=LoginResponse)
async def login_user(user_login: UserLogin, db: AsyncSession= Depends(get_db)):
    user = await authenticate_user(db, user_login.email, user_login.password)
    if not user:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail='El correo o contreseña son incorrectos'
        )
    access_token = create_access_token(data={"sub": user.email})
    return {"access_token": access_token, "token_type": "bearer"}

@router.post("/me", response_model=UserResponse)
async def get_user_me(user_login: UserLogin, db: AsyncSession = Depends(get_db)):
    # Pending to implement the logic to get the user from the token
    result = await authenticate_user(db, user_login.email, user_login.password)
    return result


@router.get("/logout/{user_id}")
async def logout(user_id: int, db: AsyncSession = Depends(get_db)):
    print(user_id)
    user_logout = await logout_user(id=user_id, db=db)
    if not user_logout:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Ocurrió un error al cerrar sesión"
        )
        
    return {"message": "Sesión cerrada exitosamente"}
  
  
@router.post("/updateUser/{user_id}", response_model=UserResponse)
async def update_user(user_id: int, db: AsyncSession = Depends(get_db)):
    # Pending to implement the logic to update the user
    return {"message": "User updated successfully"}