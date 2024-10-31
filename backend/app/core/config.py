class Settings:
    PROJECT_NAME: str = "Dengue Detect FastAPI" 
    VERSION: str = "1.0.0"
    #DATABASE_URL: str = "mysql+aiomysql://root:dengue@db:3306/dengueDetectDb"  
    DATABASE_URL: str = "mysql+aiomysql://root:ascent@localhost:3306/dengueDetectDb"
    DATA_PATH: str = "data/"
settings = Settings()
