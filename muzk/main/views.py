from django.shortcuts import render


# Create your views here.
def index(request):
    urls = ['', '']
    return render(request, "main/index.html", {'urls': urls})


def about(request):
    return render(request, "main/about.html")


def contact(request):
    return render(request, "main/cont.html")