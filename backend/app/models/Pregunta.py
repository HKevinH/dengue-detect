from typing import List
from sqlalchemy import Column, Integer, String
from app.db.session import engine
from sqlalchemy.ext.declarative import declarative_base

# Creacion de tablas
# Definir Todos los modelos previamente

Base = declarative_base()

class Item(Base):
    __tablename__ = "Pregunta"

    id_pregunta = Column(Integer, primary_key=True, index=True)
    id_usuario = Column(Integer, ForeignKey('Usuario.id'))
    pregunta = Column(Text, nullable=False)
    fecha_creacion = Column(DateTime, server_default = func.now())
    categoria = Column(String(255), nullable=False)
    estado = Column(String(255), nullable=False)
    

async def init_db():
    async with engine.begin() as conn:
        await conn.run_sync(Base.metadata.create_all)
