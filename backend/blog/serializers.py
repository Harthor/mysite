from rest_framework import serializers
from .models import Post

class PostSerializer(serializers.ModelSerializer):
    # 글 목록을 조회할 때 사용 

    # 없으면 각각 숫자로만 표시된다
    # slug = serializers.CharField(source='get_slug_as_string')
    author = serializers.CharField(source='get_author_as_string')
    category = serializers.CharField(source='get_category_as_string')
    subcategory = serializers.CharField(source='get_subcategory_as_string')

    class Meta:
        model = Post
        # fields = ('id', 'slug', 'subcategory', 'title', 'author', 'created_at')
        fields = '__all__'
    
class PostDetailSerializer(serializers.ModelSerializer):

    # slug = serializers.CharField(source='get_slug_as_string')
    author = serializers.CharField(source='get_author_as_string')
    category = serializers.CharField(source='get_category_as_string')
    subcategory = serializers.CharField(source='get_subcategory_as_string')

    class Meta:
        model = Post
        # fields = ('id', 'slug', 'subcategory', 'title', 'author', 'created_at')
        fields = '__all__'