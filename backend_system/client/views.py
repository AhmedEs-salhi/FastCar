from django.shortcuts import render
from rest_framework.response import Response
from rest_framework.decorators import action
from .serializer import ClientSerializer
from .models import Client
from rest_framework import viewsets

class ClientViewSet(viewsets.ModelViewSet):
    queryset = Client.objects.all()
    serializer_class = ClientSerializer
    
    @action(detail=True, methods=['get'])
    def contrats(self, request, pk=None):
        client = self.get_object()
        contracts = Contrat.objects.filter(cin_client=client.cin)
        serializer = ContratSerializer(contracts, many=True)
        return Response(serializer.data)