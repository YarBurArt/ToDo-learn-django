""" for hand editing in the admin panel """
from django.contrib import admin
from .models import Post

# registry of the task table
admin.site.register(Post)
