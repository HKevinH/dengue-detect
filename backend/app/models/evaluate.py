"""
# Evaluate Model

Este archivo define el modelo `Evaluate` utilizando SQLAlchemy. Representa la tabla `evaluacion` en la base de datos y almacena información relacionada con evaluaciones realizadas por los usuarios, asociadas a respuestas y zonas específicas.

## Atributos principales:
- **`id_evaluacion`**: Identificador único de la evaluación (clave primaria).
- **`id_usuario`**: Identificador del usuario que realizó la evaluación (clave foránea).
- **`id_respuesta`**: Identificador de la respuesta asociada a la evaluación (clave foránea).
- **`id_zone`**: Identificador de la zona asociada a la evaluación (clave foránea).
- **`fecha_evaluacion`**: Fecha y hora en la que se realizó la evaluación, generada automáticamente.
- **`resultado`**: Texto que describe el resultado de la evaluación.
- **`estado_evaluacion`**: Estado actual de la evaluación (por ejemplo, "pendiente", "completada").

## Relación con otros modelos:
- **`user`**: Relación muchos a uno con el modelo `User`. Permite asociar una evaluación a un usuario específico.
- **`response`**: Relación muchos a uno con el modelo `Solution`. Asocia una evaluación con una respuesta.
- **`zone`**: Relación muchos a uno con el modelo `Zone`. Vincula una evaluación a una zona específica.

### Consideraciones:
- Las claves foráneas (`id_usuario`, `id_respuesta`, `id_zone`) garantizan que las evaluaciones estén vinculadas a registros válidos en las tablas correspondientes.
- El campo `resultado` es de tipo `Text`, lo que permite almacenar descripciones detalladas del resultado de la evaluación.
- El campo `estado_evaluacion` puede configurarse con valores restringidos mediante validaciones o enumeraciones adicionales.

## Cómo extender:
- Agregar nuevas columnas para almacenar información adicional sobre las evaluaciones.
- Ajustar las relaciones si se requiere asociar evaluaciones con otros modelos.

"""
from typing import List
from sqlalchemy import Column, Integer, String, ForeignKey, DateTime, Text, func 
from app.db.session import engine
from sqlalchemy.ext.declarative import declarative_base
from app.db.session import Base
from sqlalchemy.orm import relationship

class Evaluate(Base):
    __tablename__ = "evaluacion"  # Nombre de la tabla en la base de datos

    # Definición de columnas
    id_evaluacion = Column(Integer, primary_key=True, index=True)  # Clave primaria
    id_usuario = Column(Integer, ForeignKey('usuario.id'))  # Clave foránea asociada a la tabla `usuario`
    id_respuesta = Column(Integer, ForeignKey('respuestas.id'))  # Clave foránea asociada a la tabla `respuestas`
    id_zone = Column(Integer, ForeignKey('zona.id'))  # Clave foránea asociada a la tabla `zona`
    fecha_evaluacion = Column(DateTime, server_default=func.now())  # Fecha y hora de la evaluación
    resultado = Column(Text, nullable=False)  # Resultado de la evaluación
    estado_evaluacion = Column(String(50), nullable=False)  # Estado de la evaluación (por ejemplo, "pendiente")

    # Relaciones con otros modelos
    user = relationship("User", back_populates="evaluations")
    """
    Relación con el modelo `User`.

    - `back_populates`: Vincula esta relación con el atributo `evaluations` en el modelo `User`.
    - Ejemplo de uso:
      ```python
      user = User(name="John Doe", ...)
      evaluation = Evaluate(user=user, resultado="Evaluación completada", ...)
      ```
    """
    response = relationship("Solution")
    """
    Relación con el modelo `Solution`.

    - Esta relación asocia una evaluación con una respuesta específica.
    - Ejemplo de uso:
      ```python
      solution = Solution(solution="Respuesta", ...)
      evaluation = Evaluate(response=solution, ...)
      ```
    """
    zone = relationship("Zone", back_populates="evaluations")
    """
    Relación con el modelo `Zone`.

    - `back_populates`: Vincula esta relación con el atributo `evaluations` en el modelo `Zone`.
    - Ejemplo de uso:
      ```python
      zone = Zone(name_zone="Zona Norte", ...)
      evaluation = Evaluate(zone=zone, ...)
      ```
    """
