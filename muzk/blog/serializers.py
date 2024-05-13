""" data packaging module  """
from rest_framework.serializers import ModelSerializer
from .models import Post


class PostSerializer(ModelSerializer):
    """ soft serializes task data """
    class Meta:
        model = Post
        fields = ('id', 'title', 'text', 'date_created')