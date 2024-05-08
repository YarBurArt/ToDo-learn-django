""" for hand editing in the admin panel """
from django.contrib import admin
from .models import ToDo

# registry of the task table
admin.site.register(ToDo)
