# Dengue Detect FastAPI Backend

Este es un backend basado en **FastAPI** con **MySQL** como base de datos, estructurado utilizando la arquitectura en capas (VAPAS). El proyecto está diseñado para ser modular, escalable y fácil de mantener, dividiendo las responsabilidades en diferentes capas: API (vistas/controladores), servicios (lógica del negocio), modelos (representación de la base de datos), persistencia (interacción con la base de datos), y validación de esquemas (con Pydantic).

## Características

- **Framework:** FastAPI
- **Base de Datos:** MySQL (usando SQLAlchemy)
- **ORM:** SQLAlchemy
- **Validación:** Pydantic
- **Asíncrono:** Soporte total para consultas y operaciones asíncronas
- **Arquitectura en capas (VAPAS):** Separación de responsabilidades

## Requisitos

- **Python 3.9+**
- **MySQL** (o un contenedor Docker con MySQL)
- **Pip** para la gestión de paquetes

## Instalación

1. **Clona el repositorio:**

   ```bash
   git clone https://github.com/usuario/dengue-detect-backend.git
   cd dengue-detect-backend/backend
   ```

2. **Crea un entorno virtual e instálalo:**
   ```python -m venv env
      source env/bin/activate  # En Windows: env\Scripts\activate
      pip install -r requirements.txt
   ```
