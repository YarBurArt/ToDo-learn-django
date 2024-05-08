from django.shortcuts import render, redirect


def index(request):
    return render(request, 'frontend/index.html')


def frnt(request):  # TODO: clean front
    return redirect('http://127.0.0.1:8000/api/todo')