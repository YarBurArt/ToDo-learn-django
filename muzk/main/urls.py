from django.urls import path
from . import views

urlpatterns = [
    path('', views.index),
    path('api/todo/', views.ToDoListCreate.as_view()),

    path('index/', views.index, name='index'),
    path("about/", views.about, name='about'),
    path("contact/", views.contact, name='contact'),
    path('add_todo/', views.add, name='add'),
    path('update_todo/<int:todo_id>/', views.update, name='update'),
    path('delete_todo/<int:todo_id>/', views.delete, name='delete')
]
