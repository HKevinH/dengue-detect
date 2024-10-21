from typing import List
from sqlalchemy import Column, Integer, String, ForeignKey, DateTime, Text, func
from app.db.session import engine
from app.db.session import Base
from sqlalchemy.orm import relationship
# Creacion de tablas
# Definir Todos los modelos previamente
class Solution(Base):
    __tablename__ = "respuestas"

    id = Column(Integer, primary_key=True, index=True)
    id_question = Column(Integer, ForeignKey('pregunta.id'))
    solution = Column(Text, nullable=False)
    date_solution = Column(DateTime, server_default=func.now())

    questions = relationship("QuestionSolution", back_populates="solution_obj")