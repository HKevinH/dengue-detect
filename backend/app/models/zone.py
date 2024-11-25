"""
# Zone Model

Este archivo define el modelo `Zone` utilizando SQLAlchemy. Representa la tabla `zona` en la base de datos y contiene la estructura necesaria para gestionar información sobre zonas, incluyendo su nombre, nivel de riesgo y fecha de última actualización.

## Atributos principales:
- `id`: Identificador único de cada zona (clave primaria).
- `name_zone`: Nombre de la zona.
- `risk_level`: Nivel de riesgo asociado a la zona.
- `update_date`: Fecha de la última actualización, generada automáticamente al insertar un registro.

## Relación con otros modelos:
- `evaluations`: Relación uno a muchos con el modelo `Evaluate`. Permite vincular evaluaciones a una zona específica.

### Consideraciones:
- La columna `risk_level` es única, lo que asegura que no haya duplicados en los niveles de riesgo.
- `update_date` utiliza una función SQL para establecer automáticamente la fecha/hora actual.

## Cómo extender:
- Agregar nuevas columnas si se requiere más información sobre las zonas.
- Ajustar las relaciones para incluir otros modelos relacionados.

"""
from typing import List
from sqlalchemy import Column, Integer, String, DateTime, func
from app.db.session import engine
from sqlalchemy.ext.declarative import declarative_base
from app.db.session import Base
from sqlalchemy.orm import relationship

class Zone(Base):
    __tablename__ = "zona"  # Nombre de la tabla en la base de datos

    # Definición de columnas
    id = Column(Integer, primary_key=True, index=True, autoincrement=True)  # Clave primaria
    name_zone = Column(String(255), nullable=False)  # Nombre de la zona
    risk_level = Column(String(50), unique=True, nullable=False)  # Nivel de riesgo (único)
    update_date = Column(DateTime, server_default=func.now())  # Fecha de última actualización (por defecto, actual)

    # Relación con el modelo Evaluate
    evaluations = relationship("Evaluate", back_populates="zone")
    """
    Relación uno a muchos con el modelo `Evaluate`.

    - `back_populates`: Vincula esta relación con el atributo `zone` en el modelo `Evaluate`.
    - Ejemplo de uso:
      ```python
      zone = Zone(name_zone="Zona Norte", risk_level="Alto")
      evaluate = Evaluate(zone=zone, ...)
      ```
    """
