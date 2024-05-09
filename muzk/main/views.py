""" module implements views for the tasks and notes page """
from typing import TypedDict
from django.db.models.query import QuerySet
from django.shortcuts import render, redirect
from django.views.decorators.csrf import csrf_exempt
from django.views.decorators.http import require_http_methods
from django.utils import timezone
from django.http import HttpRequest, HttpResponse, HttpResponseRedirect
from rest_framework import generics

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


class ToDoListCreate(generics.ListCreateAPIView):
    """ view templ for DRF API """
    queryset: QuerySet = ToDo.objects.all()
    serializer_class = ToDoSerializer


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
    return redirect('http://127.0.0.1:8000/frnt/')  # new index


def update(request: HttpRequest = sample_request,
           todo_id: int = 1) -> HttpResponseRedirect:
    """ changes the completion of a task """
    todo = ToDo.objects.get(id=todo_id)
    tmp_i = todo.is_complete
    # one-liner inverts value (True => False, False => True)
    todo.is_complete = not tmp_i if tmp_i else True
    todo.save()
    return redirect('http://127.0.0.1:8000/frnt/')  # new index


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
