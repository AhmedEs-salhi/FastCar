from rest_framework import serializers
from .models import Payment
from contract.serializer import ContractSerializer

class PaymentSerializer(serializers.ModelSerializer):
    contrat = ContractSerializer()
    class Meta:
        model = Payment
        fields = '__all__'