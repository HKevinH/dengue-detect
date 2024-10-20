class Settings:
    PROJECT_NAME: str = "Dengue Detect FastAPI" 
    VERSION: str = "1.0.0"
    DATABASE_URL: str = "mysql+aiomysql://root:yourpassword@db:3306/dengueDetectDb"  
settings = Settings()
