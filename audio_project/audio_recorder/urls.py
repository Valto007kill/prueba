from django.urls import path
from . import views

urlpatterns = [
    path("", views.recorder, name="recorder"),  # Página principal con la grabadora
    path("guardar/", views.guardar_audio, name="guardar_audio"),  # Endpoint para guardar audios
]
