from django.http import HttpResponseRedirect
from django.shortcuts import render

from django.utils import timezone
from .models import Post

from django.views.decorators.csrf import csrf_exempt
from django.views.decorators.http import require_http_methods

from typing import TypedDict
from django.db.models.query import QuerySet
from django.http import HttpRequest, HttpResponse


class PostView(TypedDict):
    post_list: QuerySet
    title: str


sample_request = HttpRequest()
sample_request.method = "GET"
sample_request.path = "/index/"
sample_request.META['HTTP_USER_AGENT'] = 'Mozilla/5.0'


def posts(request: HttpRequest = sample_request) -> HttpResponse:
    post_data: QuerySet = Post.objects.all()
    context: PostView = {'post_list': post_data,
                         'title': 'Blog'}
    return render(request, 'blog/posts.html',
                  context=context)


def create_post(request: HttpRequest = sample_request) -> HttpResponse:
    return render(request, 'blog/create_post.html')


@require_http_methods(['POST'])
@csrf_exempt
def add_new_post(request: HttpRequest = sample_request) -> HttpResponseRedirect:
    title: str = request.POST['title']
    text: str = request.POST['text']
    post = Post(title=title, text=text,
                date_created=timezone.now())
    post.save()
    return HttpResponseRedirect("/post")

