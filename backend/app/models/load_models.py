"""
# Modelo y Configuración de Componentes para CVAE

Este archivo se encarga de inicializar y cargar un modelo preentrenado `CVAE` (Variational Autoencoder Condicional) junto con otros componentes necesarios, como codificadores y un modelo adicional de predicción. Está diseñado para utilizarse en tareas que involucran aprendizaje automático y generación de datos.

## Componentes principales:
### Variables definidas:
- **`input_dim`**: Dimensión de entrada para el modelo CVAE (número de características).
- **`latent_dim`**: Dimensión del espacio latente, utilizada para la representación comprimida de los datos.
- **`num_classes`**: Número de clases objetivo (por ejemplo, clasificación binaria).

### Ruta base dinámica:
- **`base_path`**: Ruta absoluta dinámica que apunta al directorio donde se almacenan los modelos y codificadores (`app/data`). Esto asegura flexibilidad en diferentes entornos de ejecución.

### Modelos y componentes cargados:
1. **`CVAE`**:
   - Modelo preentrenado de tipo Variational Autoencoder Condicional.
   - Se inicializa con dimensiones de entrada, espacio latente y número de clases.
   - Los pesos del modelo se cargan desde el archivo `cvae_model.pth`.
   - Se configura en modo evaluación (`eval()`).

2. **`label_encoder`**:
   - Codificador de etiquetas, cargado desde `label_encoder.pkl`.
   - Utilizado para transformar etiquetas categóricas a su representación numérica.

3. **`encoder`**:
   - Codificador one-hot, cargado desde `onehot_encoder.pkl`.
   - Convierte datos categóricos en representaciones one-hot.

4. **`gb_model`**:
   - Modelo adicional (por ejemplo, un modelo basado en árboles), cargado desde `gb_model.pkl`.
   - Posiblemente utilizado para tareas de predicción o clasificación.

## Cómo extender:
- Actualizar las rutas si se cambian las ubicaciones de los modelos o codificadores.
- Ajustar los parámetros del modelo `CVAE` según el conjunto de datos o la tarea.

"""
import os
import torch
import joblib
from app.models.cvae_model import CVAE  # Importa la clase CVAE

# Define la ruta base dinámica
base_path = os.path.abspath(os.path.join(os.path.dirname(__file__), "../../app/data"))

# Parámetros del modelo
input_dim = 116  # Número de características de entrada
latent_dim = 50  # Dimensión del espacio latente
num_classes = 2  # Número de clases objetivo (ejemplo: binario)

# Inicialización del modelo CVAE
cvae = CVAE(input_dim=input_dim, latent_dim=latent_dim, num_classes=num_classes)

# Carga de los pesos del modelo CVAE
cvae.load_state_dict(
    torch.load(
        os.path.join(base_path, 'cvae_model.pth'),  # Ruta al archivo del modelo
        map_location=torch.device('cpu')  # Mapea a CPU para compatibilidad
    )
)
cvae.eval()  # Configura el modelo en modo de evaluación

# Carga de componentes adicionales
label_encoder = joblib.load(os.path.join(base_path, 'label_encoder.pkl'))  # Codificador de etiquetas
encoder = joblib.load(os.path.join(base_path, 'onehot_encoder.pkl'))  # Codificador one-hot
gb_model = joblib.load(os.path.join(base_path, 'gb_model.pkl'))  # Modelo adicional (por ejemplo, Gradient Boosting)
