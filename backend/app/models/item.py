from typing import List
from sqlalchemy import Column, Integer, String
from app.db.session import engine
from sqlalchemy.ext.declarative import declarative_base

# Ejemplo Creacion de tablas
# Definir Todos los modelos previamente

Base = declarative_base()

class Item(Base):
    __tablename__ = "items"

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String(255), nullable=False)
    description = Column(String(255), nullable=True)
    

async def init_db():
    async with engine.begin() as conn:
        await conn.run_sync(Base.metadata.create_all)