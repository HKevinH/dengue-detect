from typing import List
from sqlalchemy import Column, DateTime, ForeignKey, Integer, String, Text, func
from app.db.session import engine
from sqlalchemy.ext.declarative import declarative_base
from app.db.session import Base
from sqlalchemy.orm import relationship

# Creacion de tablas
# Definir Todos los modelos previamente
class QuestionSolution(Base):
    __tablename__ = "pregunta_respuesta"

    id = Column(Integer, primary_key=True, index=True)
    id_question = Column(Integer, ForeignKey('pregunta.id'))
    id_solution = Column(Integer, ForeignKey('respuestas.id'))
    solution = Column(Text, nullable=False)
    date_association = Column(DateTime, server_default = func.now())

    question = relationship("Question", back_populates="solutions")
    solution_obj = relationship("Solution", back_populates="questions")