"""
# Solution Model

Este archivo define el modelo `Solution` utilizando SQLAlchemy. Representa la tabla `respuestas` en la base de datos y contiene la estructura necesaria para gestionar las respuestas asociadas a preguntas específicas.

## Atributos principales:
- `id`: Identificador único de cada respuesta (clave primaria).
- `id_question`: Identificador de la pregunta asociada (clave foránea).
- `solution`: Texto que contiene la respuesta.
- `date_solution`: Fecha y hora de creación de la respuesta, generada automáticamente.

## Relación con otros modelos:
- `questions`: Relación uno a muchos con el modelo `QuestionSolution`. Permite vincular respuestas a una pregunta específica.

### Consideraciones:
- La columna `solution` está configurada como `Text`, lo que permite almacenar grandes cantidades de texto.
- La columna `date_solution` utiliza una función SQL para establecer automáticamente la fecha y hora de creación de la respuesta.
- El campo `id_question` establece una relación con la tabla `pregunta`, por lo que es importante asegurarse de que dicha tabla exista y esté correctamente configurada.

## Cómo extender:
- Agregar nuevas columnas si se requiere más información sobre las respuestas.
- Ajustar las relaciones para incluir otros modelos relacionados.

"""
from typing import List
from sqlalchemy import Column, Integer, String, ForeignKey, DateTime, Text, func
from app.db.session import engine
from app.db.session import Base
from sqlalchemy.orm import relationship

class Solution(Base):
    __tablename__ = "respuestas"  # Nombre de la tabla en la base de datos

    # Definición de columnas
    id = Column(Integer, primary_key=True, index=True)  # Clave primaria
    id_question = Column(Integer, ForeignKey('pregunta.id'))  # Clave foránea asociada a la tabla `pregunta`
    solution = Column(Text, nullable=False)  # Respuesta en formato de texto
    date_solution = Column(DateTime, server_default=func.now())  # Fecha de creación, valor por defecto es la fecha actual

    # Relación con el modelo `QuestionSolution`
    questions = relationship("QuestionSolution", back_populates="solution_obj")
    """
    Relación uno a muchos con el modelo `QuestionSolution`.

    - `back_populates`: Vincula esta relación con el atributo `solution_obj` en el modelo `QuestionSolution`.
    - Ejemplo de uso:
      ```python
      solution = Solution(solution="Esta es una respuesta.", ...)
      question_solution = QuestionSolution(solution_obj=solution, ...)
      ```
    """
