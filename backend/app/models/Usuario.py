from typing import List
from sqlalchemy import Column, Integer, String 
from app.db.session import engine
from sqlalchemy.ext.declarative import declarative_base



Base = declarative_base()

class Usuario(Base):
    __tablename__ = "items"

    id_usuario = Column(Integer, primary_key=True, index=True)
    nombre = Column(String(255), nullable=False)
    email = Column(String(255), unique=True, nullable=False)
    contraseña = Column(String(255), nullable=False)
    estado_cuenta = Column(String(50), nullable=False) #(activo, inactivo, etc)
    rol = Column(String(50), nullable=False) #(paciente, médico, administrador)
    

async def init_db():
    async with engine.begin() as conn:
        await conn.run_sync(Base.metadata.create_all)
