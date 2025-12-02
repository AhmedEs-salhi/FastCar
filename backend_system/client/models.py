from django.db import models
from adresse.models import Adresse

class Client(models.Model):
    cin = models.CharField(max_length=20, unique=True)
    nom = models.CharField(max_length=50)
    prenom = models.CharField(max_length=50)
    email = models.EmailField(unique=True)
    telephone = models.CharField(max_length=15)
    adresse = models.ForeignKey(Adresse, on_delete=models.CASCADE)

    def __str__(self):
        return f"{self.nom} {self.prenom} ({self.cin})"
