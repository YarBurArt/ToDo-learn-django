from django.urls import path
from . import views

urlpatterns = [
    path('', views.posts),
    path('new_post/',  views.new_post),
    path('add_post/', views.add),
]
