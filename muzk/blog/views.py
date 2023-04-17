from django.http import HttpResponseRedirect
from django.shortcuts import render, redirect
from django.utils import timezone
from .models import Post
from django.views.decorators.csrf import csrf_exempt
from django.views.decorators.http import require_http_methods

"""
TODO:
debug post view, other all worked good
"""


# Create your views here.
def posts(request):
    posts = Post.objects.all()
    context = {'post_list': posts,
               'title': 'Blog'}
    return render(request, 'blog/posts.html',
                  context=context)


def new_post(request):
    return render(request, 'blog/create_post.html')


@require_http_methods(['POST'])
@csrf_exempt
def addt(request):
    title = request.POST['title']
    text = request.POST['text']
    post = Post(title=title, text=text,
                date_created=timezone.now())
    post.save()
    return HttpResponseRedirect("/about")

