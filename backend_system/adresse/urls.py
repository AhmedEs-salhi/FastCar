from django.urls import path
from . import views
from rest_framework.routers import DefaultRouter

router = DefaultRouter()
router.register(r'adresses', views.AdresseViewSet, basename='adresses')

urlpatterns = router.urls

"""
urlpatterns = [
    path('list_adresses/', views.list_adresses),
    path('adresse_details/<int:pk>/', views.adresse_details),
    path('add_adresse/', views.add_adresse),
    path('update_adresse/<int:pk>/', views.update_adresse),
    path('delete_adresse/<int:pk>/', views.delete_adresse),
]
"""