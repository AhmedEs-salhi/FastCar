from django.shortcuts import render
from rest_framework import viewsets
from .models import Agent
from .serializer import AgentSerializer
from rest_framework.decorators import action

class AgentViewSet(viewsets.ModelViewSet):
    queryset = Agent.objects.all()
    serializer_class = AgentSerializer
    
    @action(detail=True, methods=['get'])
    def contrats(self, request, pk=None):
        agent = self.get_object()
        contracts = Contrat.objects.filter(id_agent=agent.id)
        serializer = ContratSerializer(contracts, many=True)
        return Response(serializer.data)

