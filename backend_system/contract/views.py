from django.shortcuts import render
from rest_framework import viewsets
from rest_framework.decorators import action
from rest_framework.response import Response
from .models import Contract
from .serializer import ContractSerializer

class ContractViewSet(viewsets.ModelViewSet):
    queryset = Contract.objects.all()
    serializer_class = ContractSerializer
        
    @action(detail=True, methods=['post'])
    def confirm(self, request, pk):
        contract = self.get_object()
        vehicule = contract.vehicule
        if contract.vehicule.etat != 'Disponible':
            return Response(
                {
                    "message": "Car not available",
                    "status": "error"
                })
        
        contract.agent.id = pk
        vehicule.etat = "Louée"
        contract.save()
        vehicule.save()
        return Response(
            {
                "message": "Contract Confirmed",
                "status": "Success"
            })
        
    @action(detail=True, methods=['get'])
    def calculate(self, request, pk=None):
        contract = self.get_object()
        vehicle = contract.vehicule
        days = (contract.date_fin - contract.date_debut).days
        total = days * vehicle.price_journalier
        return Response({"total": total})        