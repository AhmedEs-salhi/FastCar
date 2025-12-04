from rest_framework import serializers
from .models import Contract
from agent.serializer import AgentSerializer
from client.serializer import ClientSerializer
from vehicule.serializer import VehiculeSerializer

class ContractSerializer(serializers.ModelSerializer):
    client = ClientSerializer()
    agent = AgentSerializer()
    vehicule = VehiculeSerializer()
    class Meta:
        model = Contract
        fields = '__all__'