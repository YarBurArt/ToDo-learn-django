""" DB tables descriptions module """
from django.db import models
from django.utils import timezone


class ToDo(models.Model):
    """ task list table with minimum number of fields """
    title = models.CharField('Name to do', max_length=500)
    is_complete = models.BooleanField('Complete', default=False)
    date_created = models.DateTimeField(default=timezone.now)

    def __str__(self):
        return self.title
