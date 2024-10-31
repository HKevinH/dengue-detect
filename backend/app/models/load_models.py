# Reemplaza 'data/' con la ruta correcta si es necesario
label_encoder = joblib.load('data/label_encoder.pkl')
encoder = joblib.load('data/onehot_encoder.pkl')
cvae.load_state_dict(torch.load('data/cvae_model.pth', map_location=torch.device('cpu')))
gb_model = joblib.load('data/gb_model.pkl')
