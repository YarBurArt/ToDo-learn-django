from django.shortcuts import render, redirect
from django.utils import timezone
from .models import Post
from django.views.decorators.csrf import csrf_exempt
from django.views.decorators.http import require_http_methods


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
def add(request):
    title = request.POST['title']
    text = request.POST['text']
    post = Post(title=title, text=text,
                date_created=timezone.now())
    post.save()
    return redirect('post')
