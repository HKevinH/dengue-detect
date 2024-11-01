from typing import List
from sqlalchemy import Column, Integer, String, DateTime, func
from app.db.session import engine
from sqlalchemy.ext.declarative import declarative_base
from app.db.session import Base
from sqlalchemy.orm import relationship

class Zone(Base):
    __tablename__ = "zona"

    id = Column(Integer, primary_key=True, index=True, autoincrement=True)
    name_zone = Column(String(255), nullable=False)
    risk_level = Column(String(50), unique=True, nullable=False)
    update_date = Column(DateTime, server_default=func.now())
    
    #Relacion con evaluacion
    evaluations = relationship("Evaluate", back_populates="user")
