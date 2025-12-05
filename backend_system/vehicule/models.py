from django.db import models

class Vehicule(models.Model):
    ETAT_CHOICES = [
        ('Disponible', 'Disponible'),
        ('Louée', 'Louée'),
        ('Maintenance', 'Maintenance'),
    ]

    matricule = models.CharField(max_length=20, unique=True, primary_key=True)
    marque = models.CharField(max_length=50)
    modele = models.CharField(max_length=50)
    prix_journalier = models.DecimalField(max_digits=8, decimal_places=2)
    etat = models.CharField(max_length=20, choices=ETAT_CHOICES)
    kilometrage = models.IntegerField()

    def __str__(self):
        return f"{self.marque} {self.modele} ({self.matricule})"
