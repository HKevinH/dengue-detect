"""
# User Model

Este archivo define el modelo `User` utilizando SQLAlchemy. Representa la tabla `usuario` en la base de datos y contiene la estructura necesaria para gestionar información de los usuarios del sistema.

## Atributos principales:
- `id`: Identificador único del usuario (clave primaria).
- `name`: Nombre del usuario.
- `email`: Dirección de correo electrónico única.
- `password`: Contraseña del usuario (almacenada en formato seguro).
- `state_account`: Estado de la cuenta del usuario (por ejemplo, activo o inactivo).
- `role`: Rol asignado al usuario (paciente, médico, administrador, etc.).
- `online`: Indica si el usuario está en línea o no (`true` o `false`).

## Relación con otros modelos:
- `evaluations`: Relación uno a muchos con el modelo `Evaluate`. Vincula al usuario con sus evaluaciones.
- `questions`: Relación uno a muchos con el modelo `Question`. Vincula al usuario con sus preguntas.

## Consideraciones:
- La columna `email` es única, lo que asegura que no haya duplicados.
- El campo `password` debe almacenarse de forma segura, utilizando técnicas de hash (por ejemplo, bcrypt).
- Los valores de `state_account`, `role` y `online` pueden ser restringidos mediante validaciones adicionales o enumeraciones.

## Cómo extender:
- Agregar nuevas columnas para almacenar información adicional del usuario.
- Implementar métodos dentro del modelo para manejar operaciones comunes, como verificar contraseñas.

"""
from typing import List
from sqlalchemy import Column, Integer, String 
from app.db.session import engine
from sqlalchemy.ext.declarative import declarative_base
from app.db.session import Base
from sqlalchemy.orm import relationship

class User(Base):
    __tablename__ = "usuario"  # Nombre de la tabla en la base de datos

    # Definición de columnas
    id = Column(Integer, primary_key=True, index=True, autoincrement=True)  # Clave primaria
    name = Column(String(255), nullable=False)  # Nombre del usuario
    email = Column(String(255), unique=True, nullable=False)  # Correo único del usuario
    password = Column(String(255), nullable=False)  # Contraseña (recomendado usar hash al almacenar)
    state_account = Column(String(50), nullable=False)  # Estado de la cuenta (activo, inactivo, etc.)
    role = Column(String(50), nullable=False)  # Rol del usuario (paciente, médico, administrador)
    online = Column(String(50), nullable=False)  # Estado en línea del usuario (true, false)

    # Relaciones con otros modelos
    evaluations = relationship("Evaluate", back_populates="user")
    """
    Relación uno a muchos con el modelo `Evaluate`.

    - `back_populates`: Vincula esta relación con el atributo `user` en el modelo `Evaluate`.
    - Ejemplo de uso:
      ```python
      user = User(name="John Doe", ...)
      evaluation = Evaluate(user=user, ...)
      ```
    """
    questions = relationship("Question", back_populates="user")
    """
    Relación uno a muchos con el modelo `Question`.

    - `back_populates`: Vincula esta relación con el atributo `user` en el modelo `Question`.
    - Ejemplo de uso:
      ```python
      user = User(name="John Doe", ...)
      question = Question(user=user, ...)
      ```
    """
