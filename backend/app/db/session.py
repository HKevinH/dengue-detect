# app/db/session.py

from sqlalchemy.ext.asyncio import create_async_engine, AsyncSession
from sqlalchemy.orm import sessionmaker
from app.core.config import settings
from sqlalchemy.ext.declarative import declarative_base
 
from fastapi import FastAPI
app = FastAPI()
DATABASE_URL = settings.DATABASE_URL  

Base = declarative_base()

engine = create_async_engine(DATABASE_URL, echo=True)

SessionLocal = sessionmaker(
    bind=engine,
    class_=AsyncSession,
    expire_on_commit=False
)
    
async def get_db():
    async with SessionLocal() as session:
        yield session