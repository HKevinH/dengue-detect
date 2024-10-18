from typing import List
from sqlalchemy import Column, Integer, String
from app.db.session import engine
from sqlalchemy.ext.declarative import declarative_base

# Creacion de tablas
# Definir Todos los modelos previamente

Base = declarative_base()

class Item(Base):
    __tablename__ = "Respuestas"

    id_respuesta = Column(Integer, primary_key=True, index=True)
    id_pregunta = Column(Integer, primary_key=False, index=True)
    respuesta = Column(String(255), nullable=False)
    fecha_respuesta = Column(String(255), nullable=True)

async def init_db():
    async with engine.begin() as conn:
        await conn.run_sync(Base.metadata.create_all)