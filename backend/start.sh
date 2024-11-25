#!/bin/bash

# 1. Ruta del archivo principal de la aplicación
# Define el módulo y la instancia principal de la aplicación FastAPI.
# Aquí, "app.main:app" se refiere a:
# - `app`: Carpeta que contiene el archivo principal.
# - `main`: Archivo principal del backend (main.py).
# - `app`: Instancia de FastAPI definida en el archivo.
MAIN_FILE="app.main:app"

# 2. Puerto y host de la aplicación
# Configura el host y puerto donde se ejecutará la aplicación.
# - HOST: "0.0.0.0" permite que el servicio sea accesible desde cualquier red.
# - PORT: 8000 es el puerto expuesto para acceder al backend.
HOST="0.0.0.0"
PORT=8000

# 3. Mensaje de inicio
# Muestra un mensaje en la consola indicando que el servidor está iniciando.
echo "Iniciando el backend con Uvicorn en http://$HOST:$PORT"

# 4. Ejecutar Uvicorn
# Este comando inicia el servidor ASGI utilizando Uvicorn.
# - `--reload`: Habilita la recarga automática durante el desarrollo.
# - `--host`: Define la dirección IP para el servidor.
# - `--port`: Especifica el puerto en el que se ejecutará la aplicación.
uvicorn $MAIN_FILE --reload --host $HOST --port $PORT
