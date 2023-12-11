from rest_framework import serializers
from .models import Post

class PostSerializer(serializers.ModelSerializer):
    author = serializers.CharField(source='get_author_as_string')
    category = serializers.CharField(source='get_category_as_string')
    subcategory = serializers.CharField(source='get_subcategory_as_string')

    class Meta:
        model = Post
        fields = '__all__'
    