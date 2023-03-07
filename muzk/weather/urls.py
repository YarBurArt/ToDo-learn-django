from django.urls import path
from . import views

urlpatterns = [
    path('', views.index),
    path('<str:city>', views.get_weather),
]
