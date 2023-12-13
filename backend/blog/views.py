from django.shortcuts import get_object_or_404
from django.views.generic import DetailView
from django.http import JsonResponse
from django.utils.decorators import method_decorator
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from rest_framework.decorators import api_view

from .serializers import *
from blog.models import Post, Category

# class PostLV(ListView):
#     model = Post
#     paginate_by = 3

class PostListView(APIView):

    def get(self, request):
        """
        각 페이지의 게시글 리스트를 가져옵니다.
        url은 api/blog/{게시판 이름(=카테고리 이름)}으로 접근합니다.
        """
        print(request.GET)
        category = request.GET.get('category')
        

        # 같은 카테고리 이름임에도 다르게 설정한 경우 
        # DB에서의 검색은 다르게 진행함
        if category == 'ma':
            category = 'movieanimation'
 
        if category:
            category = get_object_or_404(Category, name__iexact=category)
            posts = Post.objects.filter(category=category)
            serializer = PostSerializer(posts, many=True)
            
            return Response(serializer.data, status=status.HTTP_200_OK)
        else:
            print("없는 카테고리입니둥")

class PostDetailView(APIView):
    def get(self, request):
        print(request.GET)
        id = request.GET.get('id')

        post = get_object_or_404(Post, id = id)
        serializer = PostDetailSerializer(post)
        print(serializer.data)
        return Response(serializer.data, status = status.HTTP_200_OK)

