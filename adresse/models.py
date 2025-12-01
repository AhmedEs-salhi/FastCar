from django.db import models

class Adresse(models.Model):
    ville = models.CharField(max_length=50)
    quartier = models.CharField(max_length=50)
    code_postal = models.CharField(max_length=10)

    def __str__(self):
        return f"{self.quartier}, {self.ville}"
