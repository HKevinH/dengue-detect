from sqlalchemy.orm import Session
from ..models.user import User
from app.schemas.user_schema import UserCreate
from passlib.context import CryptContext
from sqlalchemy.future import select
from sqlalchemy import update

import jwt
from sqlalchemy.ext.asyncio import AsyncSession
from fastapi import HTTPException, status

SECRET_KEY = "R2VzaXRpb24gZGUgcHJveWVjdG9zIFRJIC0gVVNDIC0gQml0QnVpbGRlcnMgLSBEZXRlbmNpb24gZGVsIGRlbmd1ZQ=="
ALGORITHM = "HS256"

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

async def authenticate_user(db: AsyncSession, email: str, password: str):
    result = await db.execute(select(User).where(User.email == email))
    user = result.scalars().first()

    if not user or not pwd_context.verify(password, user.password):
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail='El correo o contreseña son incorrectos'
        )
    stmt = update(User).where(User.email == email).values(online=True);
    await db.execute(stmt)
    await db.commit()
    return user


def create_access_token(data: dict):
    to_encode = data.copy()
    return jwt.encode(to_encode, SECRET_KEY, algorithm=ALGORITHM)


async def logout_user(db: AsyncSession, id: str):
    stmt = update(User).where(User.id == id).values(online=False);
    result = await db.execute(stmt)
    await db.commit()
    return True

async def updateUser(db: AsyncSession, user):
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


async def getResultsByUser(db: AsyncSession, id: str):
    result = await db.execute(select(User).where(User.id == id))
    user = result.scalars().first()
    return user
