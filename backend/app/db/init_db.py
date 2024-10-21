# app/db/init_db.py (o donde prefieras definirla)
# app/db/init_db.py

from app.db.session import engine
from app.models.user import User
from app.models.question import Question
from app.models.solutions import Solution
from app.models.question_solution import QuestionSolution
from app.models.evaluate import Evaluate
from app.db.base import Base

async def init_db():
    async with engine.begin() as conn:
        # Crea primero las tablas sin dependencias
        await conn.run_sync(Base.metadata.drop_all)
        await conn.run_sync(User.metadata.create_all)
        await conn.run_sync(Question.metadata.create_all)
        # Luego crea las tablas con dependencias
        await conn.run_sync(Solution.metadata.create_all)
        await conn.run_sync(Evaluate.metadata.create_all)
        await conn.run_sync(QuestionSolution.metadata.create_all)
        print("Tablas creadas en el orden correcto (si no existían)")
