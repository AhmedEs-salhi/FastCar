from django.shortcuts import render
from rest_framework import viewsets
from rest_framework.response import Response
from rest_framework.decorators import action
from .models import Vehicule
from .serializer import VehiculeSerializer

class VehiculeViewSet(viewsets.ModelViewSet):
    queryset = Vehicule.objects.all()
    serializer_class = VehiculeSerializer
    
    @action(detail=False, methods=['get'])
    def available(self, request):
        available_vehicules = Vehicule.objects.filter(etat='Disponible')
        serializer = self.get_serializer(available_vehicules, many=True)
        return Response(serializer.data)
    
    """@action(detail=True, method=['get'])
    def history(self, request):
        vehicule = self.get_object()
        contracts = Contract.objects.filter(vehicule=vehicule.id)
        serializer= self.get_serializer(contracts, many=True)
        return Response(serializer.data)"""
    
    