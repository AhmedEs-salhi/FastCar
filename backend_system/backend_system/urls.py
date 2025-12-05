"""
URL configuration for backend_system project.

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/5.2/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.contrib import admin
from django.urls import path, include

urlpatterns = [
    path(r'admin/', admin.site.urls),
    path(r'client/', include('client.urls')),
    path(r'adresse/', include('adresse.urls')),
    path(r'agent/', include('agent.urls')),
    path(r'vehicules/', include('vehicule.urls')),
    path(r'contracts/', include('contract.urls')),
    path(r'payment/', include('payment.urls'))
]
