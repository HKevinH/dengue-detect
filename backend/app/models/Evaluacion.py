from typing import List
from sqlalchemy import Column, Integer, String, ForeignKey, DateTime, Text, func 
from app.db.session import engine
from sqlalchemy.ext.declarative import declarative_base



Base = declarative_base()

class Evaluacion(Base):
    __tablename__ = "Evaluacion"

    id_evaluacion= Column(Integer, primary_key=True, index=True)
    id_usuario = Column(Integer, ForeignKey('Usuario.id'))
    id_respuesta = Column(Integer, ForeignKey('Respuestas.id'))
    fecha_evaluacion = Column(DateTime, server_default=func.now())
    resultado = resultado = Column(Text, nullable=False)
    estado_evaluacion = Column(String(50), nullable=False)
    

async def init_db():
    async with engine.begin() as conn:
        await conn.run_sync(Base.metadata.create_all)   