from django.db import models
from client.models import Client
from agent.models import Agent
from vehicule.models import Vehicule

class Contract(models.Model):
    MODE_PAIEMENT_CHOICES = [
        ('Espèce', 'Espèce'),
        ('Carte', 'Carte'),
        ('Virement', 'Virement'),
    ]

    date_debut = models.DateField()
    date_fin = models.DateField()
    montant_total = models.DecimalField(max_digits=10, decimal_places=2, null=True)
    mode_paiement = models.CharField(max_length=20, choices=MODE_PAIEMENT_CHOICES)
    client = models.ForeignKey(Client, on_delete=models.CASCADE)
    agent = models.ForeignKey(Agent, on_delete=models.SET_NULL, null=True)
    vehicule = models.ForeignKey(Vehicule, on_delete=models.PROTECT, null=True)

    def __str__(self):
        return f"Contrat #{self.id} - {self.client.nom} - {self.vehicule.matricule}"
