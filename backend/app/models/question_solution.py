"""
# QuestionSolution Model

Este archivo define el modelo `QuestionSolution` utilizando SQLAlchemy. Representa la tabla `pregunta_respuesta` en la base de datos y modela la relación entre preguntas y respuestas, permitiendo asociar una pregunta con una respuesta específica.

## Atributos principales:
- `id`: Identificador único de cada relación (clave primaria).
- `id_question`: Identificador de la pregunta asociada (clave foránea).
- `id_solution`: Identificador de la respuesta asociada (clave foránea).
- `solution`: Texto que describe la asociación entre la pregunta y la respuesta.
- `date_association`: Fecha de creación de la relación, generada automáticamente.

## Relación con otros modelos:
- `question`: Relación uno a muchos con el modelo `Question`. Vincula esta relación con una pregunta específica.
- `solution_obj`: Relación uno a muchos con el modelo `Solution`. Vincula esta relación con una respuesta específica.

### Consideraciones:
- Este modelo sirve como tabla intermedia que vincula preguntas y respuestas mediante claves foráneas.
- La columna `date_association` utiliza una función SQL para registrar automáticamente la fecha y hora de creación de la relación.

## Cómo extender:
- Agregar nuevas columnas para almacenar información adicional sobre la relación (por ejemplo, comentarios o estados).
- Ajustar las relaciones si se requiere una vinculación diferente entre preguntas y respuestas.

"""
from typing import List
from sqlalchemy import Column, DateTime, ForeignKey, Integer, String, Text, func
from app.db.session import engine
from sqlalchemy.ext.declarative import declarative_base
from app.db.session import Base
from sqlalchemy.orm import relationship

class QuestionSolution(Base):
    __tablename__ = "pregunta_respuesta"  # Nombre de la tabla en la base de datos

    # Definición de columnas
    id = Column(Integer, primary_key=True, index=True)  # Clave primaria
    id_question = Column(Integer, ForeignKey('pregunta.id'))  # Clave foránea asociada a la tabla `pregunta`
    id_solution = Column(Integer, ForeignKey('respuestas.id'))  # Clave foránea asociada a la tabla `respuestas`
    solution = Column(Text, nullable=False)  # Descripción de la relación entre pregunta y respuesta
    date_association = Column(DateTime, server_default=func.now())  # Fecha de creación de la relación

    # Relaciones con otros modelos
    question = relationship("Question", back_populates="solutions")
    """
    Relación con el modelo `Question`.

    - `back_populates`: Vincula esta relación con el atributo `solutions` en el modelo `Question`.
    - Ejemplo de uso:
      ```python
      question = Question(title="¿Cuál es tu nombre?", ...)
      question_solution = QuestionSolution(question=question, ...)
      ```
    """
    solution_obj = relationship("Solution", back_populates="questions")
    """
    Relación con el modelo `Solution`.

    - `back_populates`: Vincula esta relación con el atributo `questions` en el modelo `Solution`.
    - Ejemplo de uso:
      ```python
      solution = Solution(solution="Mi nombre es John", ...)
      question_solution = QuestionSolution(solution_obj=solution, ...)
      ```
    """
