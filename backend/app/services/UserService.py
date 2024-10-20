from sqlalchemy.orm import Session
from ..models.user import User
from app.schemas.user_schema import UserCreate
from passlib.context import CryptContext

pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")

def create_user(db: Session, user_create: UserCreate):
    user_in_db = db.query(User).filter(User.email == user_create.email).first()
    if user_in_db:
        return None 

    hashed_password = pwd_context.hash(user_create.password)

    new_user = User(
        nombre=user_create.nombre,
        email=user_create.email,
        password_hash=hashed_password,
        estado_cuenta="activo",
        rol="paciente"  
    )

    db.add(new_user)
    db.commit()
    db.refresh(new_user)

    return new_user
