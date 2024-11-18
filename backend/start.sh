#!/bin/bash

# Ruta del archivo principal de la aplicación
MAIN_FILE="app.main:app"

# Puerto y host de la aplicación
HOST="0.0.0.0"
PORT=8000

# Mensaje de inicio
echo "Iniciando el backend con Uvicorn en http://$HOST:$PORT"

# Ejecutar Uvicorn
uvicorn $MAIN_FILE --reload --host $HOST --port $PORT
