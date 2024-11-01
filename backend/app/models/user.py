from typing import List
from sqlalchemy import Column, Integer, String 
from app.db.session import engine
from sqlalchemy.ext.declarative import declarative_base
from app.db.session import Base
from sqlalchemy.orm import relationship
class User(Base):
    __tablename__ = "usuario"

    id = Column(Integer, primary_key=True, index=True, autoincrement=True)
    name = Column(String(255), nullable=False)
    email = Column(String(255), unique=True, nullable=False)
    password = Column(String(255), nullable=False)
    state_account = Column(String(50), nullable=False) #(activo, inactivo, etc)
    role = Column(String(50), nullable=False) #(paciente, médico, administrador)
    online = Column(String(50), nullable=False) #(true, false)
     
    evaluations = relationship("Evaluate", back_populates="user")
    questions = relationship("Question", back_populates="user")