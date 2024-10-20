from sqlalchemy.orm import Session
from ..models.user import User
from app.schemas.user_schema import UserCreate
from passlib.context import CryptContext
from sqlalchemy.future import select

pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")

async def create_user(db: Session, user_create: UserCreate):
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
