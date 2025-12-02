from django.db import models
from contract.models import Contrat

class Paiement(models.Model):
    MODE_PAIEMENT_CHOICES = [
        ('Espèce', 'Espèce'),
        ('Carte', 'Carte'),
        ('Virement', 'Virement'),
    ]

    montant = models.DecimalField(max_digits=10, decimal_places=2)
    date_paiement = models.DateField(auto_now_add=True)
    mode_paiement = models.CharField(max_length=20, choices=MODE_PAIEMENT_CHOICES)
    contrat = models.ForeignKey(Contrat, on_delete=models.CASCADE)

    def __str__(self):
        return f"Paiement #{self.id} - {self.montant} MAD"
