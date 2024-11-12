from django.urls import path
from . import views

urlpatterns = [
    path('', views.recorder_view, name='recorder'),
]
