from rest_framework import serializers
from .models import *
from django.utils import timezone


class PostSerializer(serializers.ModelSerializer):

    author = serializers.PrimaryKeyRelatedField(queryset=User.objects.all())
    category = serializers.CharField()
    section = serializers.CharField()
    subsection = serializers.CharField()
    created_at = serializers.DateTimeField(format='%Y/%m/%d %H:%M')

    class Meta:
        model = Post
        fields = '__all__' # 필수) 밑에서 동적으로 지정해줘도 여기서 지정해줘야 함

    def get_fields(self):
        
        fields = super().get_fields()

        # urls.py에 name으로 지정한 문자열 매칭을 확인한다.
        if 'PostList' in self.context['request'].resolver_match.url_name:
            # List 필드 선택
            fields = {
                'id' : serializers.IntegerField(read_only = True),
                'title' : serializers.CharField(),
                'preview': serializers.CharField(),
                'subsection': serializers.CharField(),
                'created_at': serializers.DateTimeField(format='%Y/%m/%d %H:%M'),
            }
        
        return fields
    
    def create(self, validated_data):
        print(validated_data)

        # 필요한 데이터를 추출해 Post 객체를 생성하고 저장함
        category_name = validated_data.pop('category')
        section_name = validated_data.pop('section')
        subsection_name = validated_data.pop('subsection')

        section = Section.objects.filter(name=section_name).first()
        category = Category.objects.filter(name=category_name).first()
        subsection = Subsection.objects.filter(name=subsection_name).first()

        print("Section:", section)
        print("Category:", category)
        print("Subsection:", subsection)

        post = Post.objects.create(category = category,
                                   section = section,
                                   subsection = subsection, 
                                   **validated_data)
        return post

class SubsectionSerializer(serializers.ModelSerializer):
    section = serializers.CharField(source='get_section_as_string')

    class Meta:
        model = Subsection
        fields = '__all__'
