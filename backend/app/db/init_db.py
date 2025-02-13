# Importación del motor de base de datos y los modelos necesarios
from app.db.session import engine
"""
Importa `engine`, que es el motor de base de datos configurado para conectar y realizar operaciones con la base de datos.
"""

from app.models.user import User
"""
Importa el modelo `User`, que representa la estructura de la tabla de usuarios.
"""

from app.models.question import Question
"""
Importa el modelo `Question`, que representa la estructura de la tabla de preguntas.
"""

from app.models.solutions import Solution
"""
Importa el modelo `Solution`, que representa la estructura de la tabla de soluciones.
"""

from app.models.question_solution import QuestionSolution
"""
Importa el modelo `QuestionSolution`, que define las relaciones entre preguntas y soluciones en la base de datos.
"""

from app.models.evaluate import Evaluate
"""
Importa el modelo `Evaluate`, que representa evaluaciones asociadas a las entidades del sistema.
"""

from app.models.zone import Zone
"""
Importa el modelo `Zone`, que representa una estructura geográfica o categórica utilizada en el sistema.
"""

from app.db.base import Base
"""
Importa `Base`, que es la clase base de SQLAlchemy que agrupa todas las definiciones de modelos en el proyecto.
"""

# Definición de la función para inicializar la base de datos
async def init_db():
    """
    Función asíncrona para inicializar la base de datos.
    - Crea y organiza las tablas en el orden correcto, respetando las dependencias entre ellas.
    - Borra las tablas existentes antes de recrearlas (para pruebas o desarrollo inicial).
    """
    async with engine.begin() as conn:  # Abre una conexión asíncrona con la base de datos
        # Elimina todas las tablas existentes
        await conn.run_sync(Base.metadata.drop_all)
        
        # Crea tablas sin dependencias primero
        await conn.run_sync(User.metadata.create_all)
        await conn.run_sync(Question.metadata.create_all)
        await conn.run_sync(Zone.metadata.create_all)
        
        # Crea las tablas con dependencias después
        await conn.run_sync(Solution.metadata.create_all)
        await conn.run_sync(Evaluate.metadata.create_all)
        await conn.run_sync(QuestionSolution.metadata.create_all)
        
        # Mensaje de confirmación
        print("Tablas creadas en el orden correcto (si no existían)")
