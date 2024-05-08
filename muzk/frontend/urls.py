from django.urls import path
from . import views


urlpatterns = [
    path('frnt/', views.index),
    path('frnt/api/todo', views.frnt),
]