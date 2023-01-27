from django.db import models
from django.utils import timezone


class ToDo(models.Model):
    title = models.CharField('Name to do', max_length=500)
    is_complete = models.BooleanField('Complete', default=False)
    date_created = models.DateTimeField('Date created', default=timezone.now())

    def __str__(self):
        return self.title
