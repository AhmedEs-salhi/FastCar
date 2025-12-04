from django.shortcuts import render
from rest_framework.decorators import action
from rest_framework.response import Response
from .serializer import AdresseSerializer
from .models import Adresse
from rest_framework import viewsets

class AdresseViewSet(viewsets.ModelViewSet):
    queryset = Adresse.objects.all()
    serializer_class = AdresseSerializer
    
    #@action(detail=False, methods=['get'])
    
    
"""
@api_view(['GET'])
def list_adresses(request):
    adresse = Adresse.objects.all()
    serialized_data = AdresseSerializer(adresse, many=True)
    return Response(serialized_data.data)

@api_view(['GET'])
def adresse_details(request, pk):
    adresse = Adresse.objects.get(id=pk)
    serialized_data = AdresseSerializer(adresse)
    return Response(serialized_data.data)

@api_view(['POST'])
def add_adresse(request):
    serializer = AdresseSerializer(data=request.data)
    if serializer.is_valid():
        serializer.save()
        return Response(serializer.data)
    else:
        return Response({"error": 402, "message": "Data is not valid"})
    
@api_view(['POST'])
def update_adresse(request, pk):
    adresse = Adresse.objects.get(id=pk)
    serializer = AdresseSerializer(instance=adresse, data=request.data)
    if serializer.is_valid():
        serializer.save()
        return Response(serializer.data)
    else:
        return Response({"error": 402, "message": "Data is not valid"})

@api_view(['DELETE'])
def delete_adresse(request, pk):
    adresse = Adresse.objects.get(id=pk)
    adresse.delete()
    return Response({"Success": 200, "Message":"Adresse deleted successfully"})
    """