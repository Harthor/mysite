from django.shortcuts import render
from django.views.generic import ListView, DetailView
from django.http import JsonResponse
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status

from .serializers import *
from blog.models import Post

# class PostLV(ListView):
#     model = Post
#     paginate_by = 3

class PostListView(APIView):

    def get(self, request, *args, **kwargs):
        
        # posts = Post.objects.all()
        posts = Post.objects.filter(category__name = 'Study')
        serializer = PostSerializer(posts, many = True)

        return Response(serializer.data,
                         status = status.HTTP_200_OK
                         )

class PostDV(DetailView):
    model = Post
