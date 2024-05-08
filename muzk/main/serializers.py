""" data packaging module  """
from rest_framework.serializers import ModelSerializer
from .models import ToDo


class ToDoSerializer(ModelSerializer):
    """ soft serializes task data """
    class Meta:
        model = ToDo
        fields = ('id', 'title', 'is_complete', 'date_created')
