from typing import List
from sqlalchemy import Column, DateTime, ForeignKey, Integer, String, Text, func
from sqlalchemy.orm import relationship
from app.db.session import engine
from sqlalchemy.ext.declarative import declarative_base
from app.db.session import Base
# Creacion de tablas
# Definir Todos los modelos previamente
class Question(Base):
    __tablename__ = "pregunta"
    id = Column(Integer, primary_key=True, index=True)
    id_user = Column(Integer, ForeignKey('usuario.id'))
    question = Column(Text, nullable=False)
    date_createAt = Column(DateTime, server_default = func.now())
    category = Column(String(255), nullable=False)
    state = Column(String(255), nullable=False)

    user = relationship("User", back_populates="questions")
    solutions = relationship("QuestionSolution", back_populates="question")
