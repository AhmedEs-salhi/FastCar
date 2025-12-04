from rest_framework import serializers
from .models import Client
from adresse.serializer import AdresseSerializer

class ClientSerializer(serializers.ModelSerializer):
    adresse = AdresseSerializer()
    class Meta:
        model = Client
        fields = '__all__'