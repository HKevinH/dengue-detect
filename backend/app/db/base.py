# app/db/base.py

# Esta puede ser una definición de base de datos falsa para pruebas
from app.models.solutions import Solution
from app.models.question import Question
from app.models.user import User
from app.models.question_solution import QuestionSolution

from app.db.session import Base
