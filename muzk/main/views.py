""" module implements views for the tasks and notes page """
from typing import TypedDict
from django.db.models.query import QuerySet
from django.shortcuts import render, redirect
from django.views.decorators.csrf import csrf_exempt
from django.views.decorators.http import require_http_methods
from django.utils import timezone
from django.http import (
    HttpRequest, HttpResponse, HttpResponseRedirect, Http404)

from rest_framework import (mixins, status, generics)
from rest_framework.views import APIView
from rest_framework.response import Response

from .models import ToDo
from .strings import about_me_str, contacts
from .serializers import ToDoSerializer


# data type for validating task display
class TodoView(TypedDict):
    todo_list: QuerySet
    title: str


# crutch for invalid requests and headers from user
sample_request = HttpRequest()
sample_request.method = "GET"
sample_request.path = "/index/"
sample_request.META['HTTP_USER_AGENT'] = 'Mozilla/5.0'


class ToDoListCreate(generics.ListCreateAPIView): # return list
    """ view todolist templ for DRF API """
    queryset: QuerySet = ToDo.objects.all()
    serializer_class = ToDoSerializer # pack by format 


class ToDoUpdateView(generics.UpdateAPIView):
    """ view update status todo templ for DRF API """
    queryset = ToDo.objects.all()
    serializer_class = ToDoSerializer
    lookup_field = 'id'

    def update(self, request: HttpRequest, *args, **kwargs):
        """ Changes the completion of a task. """
        instance = self.get_object()
        instance.is_complete = not instance.is_complete
        instance.save()
        return Response(status=status.HTTP_302_FOUND)
    

class ToDoDeleteView(generics.DestroyAPIView):
    """ view delete status todo templ for DRF API """
    queryset = ToDo.objects.all()
    serializer_class = ToDoSerializer
    lookup_field = 'id'

    def destroy(self, request: HttpRequest, *args, **kwargs):
        """ Deletes a task by ID. """
        instance = self.get_object()
        self.perform_destroy(instance)
        return Response(status=status.HTTP_302_FOUND)


def index(request: HttpRequest = sample_request) -> HttpResponse:
    """ get all the tasks from DB and passes them to main/index.html """
    todos: QuerySet = ToDo.objects.all()
    context: TodoView = {'todo_list': todos,
                         'title': 'Главная страница'}
    return render(request, 'main/index.html',
                  context=context)


@require_http_methods(['POST'])
@csrf_exempt
def add(request: HttpRequest = sample_request) -> HttpResponseRedirect:
    """ save task/date to list, title - like task name """
    title: str = request.POST['title']
    todo = ToDo(title=title,
                date_created=timezone.now())
    todo.save()
    return redirect('http://127.0.0.1:8000/frnt/')  # TODO: react rewrite


def update(request: HttpRequest = sample_request,
           todo_id: int = 1) -> HttpResponseRedirect:
    """ changes the completion of a task """
    todo = ToDo.objects.get(id=todo_id)
    todo.is_complete = not todo.is_complete
    todo.save()
    return redirect('index')  


def delete(request: HttpRequest = sample_request,
           todo_id: int = 1) -> HttpResponseRedirect:
    """ del task by ID (ID from task list on index) """
    todo = ToDo.objects.get(id=todo_id)
    todo.delete()
    return redirect('index')  

def about(request: HttpRequest = sample_request) -> HttpResponse:
    """ short text why this site exists  """
    return render(request, "main/about.html", context={'text': about_me_str})


def contact(request: HttpRequest = sample_request) -> HttpResponse:
    """ my contacts, out of date """
    return render(request, "main/cont.html", context={'contacts': contacts})
