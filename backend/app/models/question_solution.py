from typing import List
from sqlalchemy import Column, DateTime, ForeignKey, Integer, String, Text, func
from app.db.session import engine
from sqlalchemy.ext.declarative import declarative_base

# Creacion de tablas
# Definir Todos los modelos previamente

Base = declarative_base()

class QuestionSolution(Base):
    __tablename__ = "pregunta_respuesta"

    id_question_solution = Column(Integer, primary_key=True, index=True)
    id_question = Column(Integer, ForeignKey('Pregunta.id'))
    id_solution = Column(Integer, ForeignKey('Respuesta.id'))
    solution = Column(Text, nullable=False)
    date_association = Column(DateTime, server_default = func.now())
    

async def init_db():
    async with engine.begin() as conn:
        await conn.run_sync(Base.metadata.create_all)
