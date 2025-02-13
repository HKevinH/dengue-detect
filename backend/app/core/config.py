# Definición de la clase `Settings` para almacenar configuraciones de la aplicación
class Settings:
    """
    Clase para definir configuraciones globales de la aplicación.
    Contiene información relevante como el nombre del proyecto, su versión,
    la URL de la base de datos y la ruta de los datos utilizados en la aplicación.
    """

    # Nombre del proyecto
    PROJECT_NAME: str = "Dengue Detect FastAPI"  
    """
    Atributo que define el nombre del proyecto. Este se utiliza para identificar
    la aplicación y puede mostrarse en documentación o configuraciones generales.
    """

    # Versión del proyecto
    VERSION: str = "1.0.0"  
    """
    Atributo que define la versión actual del proyecto. Es útil para
    llevar control de versiones en despliegues y documentación.
    """

    # URL de conexión a la base de datos
    DATABASE_URL: str = "mysql+aiomysql://root:ascent@localhost:3306/dengueDetectDb"
    """
    Atributo que especifica la URL de la base de datos.
    - `mysql+aiomysql`: Indica que se utiliza MySQL como base de datos con el driver aiomysql.
    - `root`: Usuario de la base de datos.
    - `ascent`: Contraseña del usuario.
    - `localhost`: Indica que la base de datos está alojada localmente.
    - `3306`: Puerto estándar de MySQL.
    - `dengueDetectDb`: Nombre de la base de datos a la que se conecta.
    """

    # Ruta a los datos necesarios para la aplicación
    DATA_PATH: str = "data/"
    """
    Atributo que define la ruta donde se almacenan los archivos de datos
    utilizados por la aplicación, como modelos, archivos de configuración, etc.
    """

# Instancia de la clase `Settings`
settings = Settings()
"""
Se crea una instancia de la clase `Settings`, permitiendo que sus atributos
sean utilizados en otras partes de la aplicación. Esto facilita el acceso
centralizado a las configuraciones globales del proyecto.
"""
