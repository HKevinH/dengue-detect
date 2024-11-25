"""
# CVAE (Conditional Variational Autoencoder)

Este archivo define la clase `CVAE` utilizando PyTorch, un modelo de Autoencoder Variacional Condicional. El modelo combina un codificador y un decodificador para trabajar con entradas condicionales, lo que permite generar datos condicionados por clases específicas.

## Componentes principales:
### Clase `CVAE`:
- **`__init__`**:
  - Inicializa el modelo definiendo las dimensiones de entrada, espacio latente y número de clases.
  - Construye las capas del codificador y el decodificador.
- **`encode`**:
  - Codifica los datos de entrada y la clase condicional en el espacio latente.
  - Genera la media (`mu`) y log-varianza (`logvar`) para cada entrada.
- **`reparameterize`**:
  - Aplica el truco de reparametrización para muestrear valores del espacio latente utilizando la media y la varianza.
- **`decode`**:
  - Decodifica un vector del espacio latente, condicionado por una clase específica, para reconstruir la entrada original.
- **`forward`**:
  - Define el flujo completo del modelo (codificación, reparametrización y decodificación).
  - Retorna la reconstrucción, media y log-varianza.

### Función de pérdida:
- Combina dos términos:
  1. **BCE (Binary Cross-Entropy)**: Calcula la pérdida de reconstrucción entre los datos originales y los generados.
  2. **KLD (Kullback-Leibler Divergence)**: Penaliza las desviaciones entre la distribución latente y una distribución normal estándar.

### Cómo extender:
- Ajustar las dimensiones de entrada, salida o espacio latente según los datos.
- Modificar las capas internas para adaptarse a tareas específicas.

## Ventajas del CVAE:
- Permite generar datos condicionados por clases específicas.
- Utiliza un espacio latente regularizado para facilitar la generación de muestras nuevas.

"""
import torch
import torch.nn as nn

class CVAE(nn.Module):
    def __init__(self, input_dim, latent_dim, num_classes):
        """
        Inicializa el modelo CVAE.

        ### Parámetros:
        - **`input_dim`**: Dimensión de entrada (número de características).
        - **`latent_dim`**: Dimensión del espacio latente.
        - **`num_classes`**: Número de clases condicionales.
        """
        super(CVAE, self).__init__()
        self.input_dim = input_dim
        self.latent_dim = latent_dim
        self.num_classes = num_classes

        # Capas del codificador
        self.fc1 = nn.Linear(input_dim + num_classes, 512)
        self.fc21 = nn.Linear(512, latent_dim)  # Media
        self.fc22 = nn.Linear(512, latent_dim)  # Log-varianza

        # Capas del decodificador
        self.fc3 = nn.Linear(latent_dim + num_classes, 512)
        self.fc4 = nn.Linear(512, input_dim)

    def encode(self, x, y):
        """
        Codifica las entradas en el espacio latente.
        
        ### Parámetros:
        - **`x`**: Datos de entrada.
        - **`y`**: Etiquetas de clase asociadas.

        ### Salida:
        - **`mu`**: Media latente.
        - **`logvar`**: Logaritmo de la varianza latente.
        """
        y_onehot = torch.zeros(x.size(0), self.num_classes)
        y_onehot.scatter_(1, y.view(-1, 1), 1)
        x = torch.cat([x, y_onehot], dim=1)
        h1 = torch.relu(self.fc1(x))
        return self.fc21(h1), self.fc22(h1)

    def reparameterize(self, mu, logvar):
        """
        Aplica el truco de reparametrización para muestrear del espacio latente.
        
        ### Parámetros:
        - **`mu`**: Media latente.
        - **`logvar`**: Logaritmo de la varianza latente.

        ### Salida:
        - Vector muestreado del espacio latente.
        """
        std = torch.exp(0.5 * logvar)
        eps = torch.randn_like(std)
        return mu + eps * std

    def decode(self, z, y):
        """
        Decodifica un vector del espacio latente en datos originales.

        ### Parámetros:
        - **`z`**: Vector del espacio latente.
        - **`y`**: Etiquetas de clase asociadas.

        ### Salida:
        - Reconstrucción de los datos originales.
        """
        y_onehot = torch.zeros(z.size(0), self.num_classes)
        y_onehot.scatter_(1, y.view(-1, 1), 1)
        z = torch.cat([z, y_onehot], dim=1)
        h3 = torch.relu(self.fc3(z))
        return torch.sigmoid(self.fc4(h3))

    def forward(self, x, y):
        """
        Define el flujo completo del modelo: codificación, reparametrización y decodificación.

        ### Parámetros:
        - **`x`**: Datos de entrada.
        - **`y`**: Etiquetas de clase asociadas.

        ### Salida:
        - **`recon_x`**: Datos reconstruidos.
        - **`mu`**: Media latente.
        - **`logvar`**: Logaritmo de la varianza latente.
        """
        mu, logvar = self.encode(x.view(-1, self.input_dim), y)
        z = self.reparameterize(mu, logvar)
        return self.decode(z, y), mu, logvar

# Función de pérdida
def loss_function(recon_x, x, mu, logvar):
    """
    Calcula la pérdida combinada de reconstrucción y regularización.

    ### Parámetros:
    - **`recon_x`**: Datos reconstruidos por el decodificador.
    - **`x`**: Datos originales.
    - **`mu`**: Media latente.
    - **`logvar`**: Logaritmo de la varianza latente.

    ### Salida:
    - Pérdida total.
    """
    BCE = nn.functional.binary_cross_entropy(recon_x, x.view(-1, x.shape[1]), reduction='sum')
    KLD = -0.5 * torch.sum(1 + logvar - mu.pow(2) - logvar.exp())
    return BCE + KLD

