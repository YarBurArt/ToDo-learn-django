from django.shortcuts import render, redirect
from django.views.decorators.csrf import csrf_exempt
from django.views.decorators.http import require_http_methods
from django.utils import timezone

from .models import ToDo

from .strings import about_me_str, contacts

from .serializers import ToDoSerializer
from rest_framework import generics


class ToDoListCreate(generics.ListCreateAPIView):
    queryset = ToDo.objects.all()
    serializer_class = ToDoSerializer


def index(request):
    todos = ToDo.objects.all()
    context = {'todo_list': todos, 'title': 'Главная страница'}
    return render(request, 'main/index.html', context=context)


@require_http_methods(['POST'])
@csrf_exempt
def add(request):
    title = request.POST['title']
    todo = ToDo(title=title, date_created=timezone.now())
    todo.save()
    return redirect('index')


def update(request, todo_id):
    todo = ToDo.objects.get(id=todo_id)
    if todo.is_complete - 1 == 0:
        todo.is_complete = False
    else:
        todo.is_complete = True
    todo.save()
    return redirect('index')


def delete(request, todo_id):
    todo = ToDo.objects.get(id=todo_id)
    todo.delete()
    return redirect('index')


def about(request):
    return render(request, "main/about.html", context={'text': about_me_str})


def contact(request):
    return render(request, "main/cont.html", context={'contacts': contacts})
