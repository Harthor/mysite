from rest_framework import serializers
from .models import *

class PostSerializer(serializers.ModelSerializer):
    # 글 목록을 조회할 때 사용 

    # 없으면 각각 숫자로만 표시된다
    # slug = serializers.CharField(source='get_slug_as_string')
    author = serializers.CharField(source='get_author_as_string')
    category = serializers.CharField(source='get_category_as_string')
    section = serializers.CharField(source='get_section_as_string')
    subsection = serializers.CharField(source='get_subsection_as_string')

    # 시간 가공
    created_at = serializers.DateTimeField(format = '%Y/%m/%d %H:%M')
    class Meta:
        model = Post
        fields = '__all__'
    
class PostDetailSerializer(serializers.ModelSerializer):

    # slug = serializers.CharField(source='get_slug_as_string')
    author = serializers.CharField(source='get_author_as_string')
    category = serializers.CharField(source='get_category_as_string')
    section = serializers.CharField(source='get_section_as_string')
    subsection = serializers.CharField(source='get_subsection_as_string')

    # 시간 가공
    created_at = serializers.DateTimeField(format = '%Y/%m/%d %H:%M')

    class Meta:
        model = Post
        fields = '__all__'

class SubsectionSerializer(serializers.ModelSerializer):
    section = serializers.CharField(source='get_section_as_string')

    class Meta:
        model = SubSection
        # fields = ['name',]
        fields = '__all__'
