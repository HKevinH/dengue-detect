from typing import List
from sqlalchemy import Column, Integer, String, ForeignKey, DateTime, Text, func
from app.db.session import engine
from sqlalchemy.ext.declarative import declarative_base

# Creacion de tablas
# Definir Todos los modelos previamente

Base = declarative_base()

class Solution(Base):
    __tablename__ = "Respuestas"

    id_solution = Column(Integer, primary_key=True, index=True)
    id_question = Column(Integer, ForeignKey('Pregunta.id'))
    solution = Column(Text, nullable=False)
    date_solution = Column(DateTime, server_default = func.now())

async def init_db():
    async with engine.begin() as conn:
        await conn.run_sync(Base.metadata.create_all)
