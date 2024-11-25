"""
# Question Model

Este archivo define el modelo `Question` utilizando SQLAlchemy. Representa la tabla `pregunta` en la base de datos y contiene la estructura necesaria para gestionar las preguntas realizadas por los usuarios, así como su categoría, estado y fecha de creación.

## Atributos principales:
- `id`: Identificador único de cada pregunta (clave primaria).
- `id_user`: Identificador del usuario asociado a la pregunta (clave foránea).
- `question`: Texto que contiene la pregunta.
- `date_createAt`: Fecha y hora de creación de la pregunta, generada automáticamente.
- `category`: Categoría a la que pertenece la pregunta.
- `state`: Estado de la pregunta (por ejemplo, activa, resuelta, pendiente).

## Relación con otros modelos:
- `user`: Relación muchos a uno con el modelo `User`. Permite asociar una pregunta a un usuario específico.
- `solutions`: Relación uno a muchos con el modelo `QuestionSolution`. Vincula esta pregunta con sus posibles soluciones.

### Consideraciones:
- La columna `question` es de tipo `Text`, lo que permite almacenar preguntas de cualquier longitud.
- La columna `date_createAt` utiliza una función SQL para registrar automáticamente la fecha y hora de creación de la pregunta.
- `category` y `state` deben ser validados para asegurarse de que contengan valores consistentes con las reglas del negocio.

## Cómo extender:
- Agregar nuevas columnas para almacenar información adicional sobre las preguntas, como prioridades o etiquetas.
- Ajustar las relaciones para incluir otros modelos, si es necesario.

"""
from typing import List
from sqlalchemy import Column, DateTime, ForeignKey, Integer, String, Text, func
from sqlalchemy.orm import relationship
from app.db.session import engine
from sqlalchemy.ext.declarative import declarative_base
from app.db.session import Base

class Question(Base):
    __tablename__ = "pregunta"  # Nombre de la tabla en la base de datos

    # Definición de columnas
    id = Column(Integer, primary_key=True, index=True)  # Clave primaria
    id_user = Column(Integer, ForeignKey('usuario.id'))  # Clave foránea asociada a la tabla `usuario`
    question = Column(Text, nullable=False)  # Pregunta en formato de texto
    date_createAt = Column(DateTime, server_default=func.now())  # Fecha de creación (por defecto, actual)
    category = Column(String(255), nullable=False)  # Categoría de la pregunta
    state = Column(String(255), nullable=False)  # Estado de la pregunta (activo, resuelto, etc.)

    # Relaciones con otros modelos
    user = relationship("User", back_populates="questions")
    """
    Relación con el modelo `User`.

    - `back_populates`: Vincula esta relación con el atributo `questions` en el modelo `User`.
    - Ejemplo de uso:
      ```python
      user = User(name="John Doe", ...)
      question = Question(user=user, question="¿Cómo funciona X?", ...)
      ```
    """
    solutions = relationship("QuestionSolution", back_populates="question")
    """
    Relación con el modelo `QuestionSolution`.

    - `back_populates`: Vincula esta relación con el atributo `question` en el modelo `QuestionSolution`.
    - Ejemplo de uso:
      ```python
      question = Question(question="¿Cómo funciona X?", ...)
      solution = QuestionSolution(question=question, solution="Así funciona", ...)
      ```
    """
