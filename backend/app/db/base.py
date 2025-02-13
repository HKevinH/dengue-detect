# Importaciones de los modelos que componen las entidades de la base de datos
from app.models.solutions import Solution
"""
Importa el modelo `Solution`, que representa la entidad de soluciones en la base de datos.
Este modelo define cómo se almacenan las soluciones y su estructura en la base de datos.
"""

from app.models.question import Question
"""
Importa el modelo `Question`, que representa la entidad de preguntas en la base de datos.
Define los atributos y relaciones asociados con las preguntas almacenadas.
"""

from app.models.user import User
"""
Importa el modelo `User`, que representa la entidad de usuarios en la base de datos.
Define la estructura de almacenamiento de los usuarios y sus atributos.
"""

from app.models.question_solution import QuestionSolution
"""
Importa el modelo `QuestionSolution`, que representa una relación o tabla intermedia
entre preguntas y soluciones en la base de datos. Este modelo es útil para implementar
relaciones como muchos a muchos (many-to-many).
"""

# Importación de la base utilizada por SQLAlchemy
from app.db.session import Base
"""
Importa la clase `Base` de `session`, que es el punto de partida para definir los modelos
de la base de datos utilizando SQLAlchemy. Esta base sirve como un contenedor para todos
los modelos definidos en el proyecto.
"""
