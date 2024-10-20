from typing import List
from sqlalchemy import Column, DateTime, ForeignKey, Integer, String, Text, func
from app.db.session import engine
from sqlalchemy.ext.declarative import declarative_base

# Creacion de tablas
# Definir Todos los modelos previamente

Base = declarative_base()

class Question(Base):
    __tablename__ = "pregunta"

    id_question = Column(Integer, primary_key=True, index=True)
    id_user = Column(Integer, ForeignKey('Usuario.id'))
    question = Column(Text, nullable=False)
    date_createAt = Column(DateTime, server_default = func.now())
    category = Column(String(255), nullable=False)
    state = Column(String(255), nullable=False)
    

async def init_db():
    async with engine.begin() as conn:
        await conn.run_sync(Base.metadata.create_all)
