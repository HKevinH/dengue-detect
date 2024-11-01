import os
import torch
import joblib
from app.models.cvae_model import CVAE  # Importa la clase CVAE

# Define la ruta base dinámica
base_path = os.path.abspath(os.path.join(os.path.dirname(__file__), "../../app/data"))

input_dim = 116
latent_dim = 50
num_classes = 2

cvae = CVAE(input_dim=input_dim, latent_dim=latent_dim, num_classes=num_classes)
cvae.load_state_dict(torch.load(os.path.join(base_path, 'cvae_model.pth'), map_location=torch.device('cpu')))
cvae.eval()  

label_encoder = joblib.load(os.path.join(base_path, 'label_encoder.pkl'))
encoder = joblib.load(os.path.join(base_path, 'onehot_encoder.pkl'))
gb_model = joblib.load(os.path.join(base_path, 'gb_model.pkl'))
