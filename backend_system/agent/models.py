from django.db import models

class Agent(models.Model):
    nom = models.CharField(max_length=50)
    prenom = models.CharField(max_length=50)

    def __str__(self):
        return f"{self.nom} {self.prenom}"
