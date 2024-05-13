""" module for describing hands and their views """
from django.urls import path
from . import views

urlpatterns = [
    path('', views.posts),
    path('api/get_posts/', views.PostListCreateView.as_view()),
    path('create_post/',  views.create_post),
    path('add_post/', views.add_new_post, name='add_new_post'),
]
