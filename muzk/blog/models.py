""" DB tables descriptions module """
from django.db import models
from django.utils import timezone


class Post(models.Model):
    """ post list table with minimum number of fields """
    title = models.CharField('Name post', max_length=500)
    text = models.CharField('Body post', max_length=1500)
    date_created = models.DateTimeField('Date created', default=timezone.now())

    def __str__(self):
        return self.title
