from typing import List
from sqlalchemy import Column, Integer, String, ForeignKey, DateTime, Text, func 
from app.db.session import engine
from sqlalchemy.ext.declarative import declarative_base
from app.db.session import Base
from sqlalchemy.orm import relationship
class Evaluate(Base):
    __tablename__ = "evaluacion"

    id_evaluacion= Column(Integer, primary_key=True, index=True)
    id_usuario = Column(Integer, ForeignKey('usuario.id'))
    id_respuesta = Column(Integer, ForeignKey('respuestas.id'))
    id_zone =  Column(Integer, ForeignKey('zona.id'))
    fecha_evaluacion = Column(DateTime, server_default=func.now())
    resultado = resultado = Column(Text, nullable=False)
    estado_evaluacion = Column(String(50), nullable=False)


    # Relación con Usuario y Respuesta
    user = relationship("User", back_populates="evaluations")
    response = relationship("Solution")  # Relación con la tabla respuestas
    zone = relationship("Zones") # Relacion con la tabla Zonas
