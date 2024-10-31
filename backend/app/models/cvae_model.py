# cvae_model.py

import torch
import torch.nn as nn

class CVAE(nn.Module):
    def __init__(self, input_dim, latent_dim, num_classes):
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
        y_onehot = torch.zeros(x.size(0), self.num_classes)
        y_onehot.scatter_(1, y.view(-1, 1), 1)
        x = torch.cat([x, y_onehot], dim=1)
        h1 = torch.relu(self.fc1(x))
        return self.fc21(h1), self.fc22(h1)

    def reparameterize(self, mu, logvar):
        std = torch.exp(0.5 * logvar)
        eps = torch.randn_like(std)
        return mu + eps * std

    def decode(self, z, y):
        y_onehot = torch.zeros(z.size(0), self.num_classes)
        y_onehot.scatter_(1, y.view(-1, 1), 1)
        z = torch.cat([z, y_onehot], dim=1)
        h3 = torch.relu(self.fc3(z))
        return torch.sigmoid(self.fc4(h3))

    def forward(self, x, y):
        mu, logvar = self.encode(x.view(-1, self.input_dim), y)
        z = self.reparameterize(mu, logvar)
        return self.decode(z, y), mu, logvar

# Función de pérdida
def loss_function(recon_x, x, mu, logvar):
    BCE = nn.functional.binary_cross_entropy(recon_x, x.view(-1, x.shape[1]), reduction='sum')
    KLD = -0.5 * torch.sum(1 + logvar - mu.pow(2) - logvar.exp())
    return BCE + KLD
