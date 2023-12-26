from django.shortcuts import get_object_or_404
from django.utils.html import escape

from rest_framework.views import APIView
from rest_framework.parsers import MultiPartParser, FormParser
from rest_framework.response import Response
from rest_framework import status, generics
from django.core.paginator import Paginator, EmptyPage, PageNotAnInteger

from .serializers import *
from blog.models import *
from .forms import *

import json

class PostListView(APIView):

    def get(self, request):
        """
        각 페이지의 게시글 리스트를 가져옵니다.
        url은 api/blog/{section_name}으로 접근합니다.
        """
        section = request.GET.get('section')
        page = request.GET.get('page', 1)
        postsPerPage = request.GET.get('postperpage', 5)
        
        if section:
            section = get_object_or_404(Section, name__iexact=section)
            posts = Post.objects.filter(section=section)
        else:
            posts = Post.objects.all()

        # 페이지네이터 구현
        # 얘는 pagniator에 의해 정해진 갯수의 데이터만을 다시 보내게 됨
        paginator = Paginator(posts, postsPerPage)
        
        try:
            posts = paginator.page(page)
        except PageNotAnInteger:
            posts = paginator.page(1)
        except EmptyPage:
            posts = paginator.page(paginator.num_pages)

        serializer = PostSerializer(posts, many = True, context={'request' : request})
        print(page, serializer.data)
        return Response({'posts' : serializer.data,
                         'total_pages' : paginator.num_pages,
                         }, status=status.HTTP_200_OK)

class PostCreateView(APIView):
    def post(self, request, *args, **kwargs):
        data = request.data.copy()

        # 객체로 넣어야 함
        data['author'] = User.objects.get(username='dowrave').id
        data['created_at'] = timezone.now()

        # 안전한 HTML 보장하기
        data['content'] = escape(data['content'])

        print(data)

        serializer = PostSerializer(data = data, context = {'request' : request})
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status = status.HTTP_201_CREATED)
        else:
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class PostDetailView(APIView):
    def get(self, request):
        print(request.GET)
        id = request.GET.get('id')

        post = get_object_or_404(Post, id = id)
        serializer = PostSerializer(post, context={'request' : request})

        print(serializer.data)
        return Response(serializer.data, status = status.HTTP_200_OK)


class SubsectionListView(APIView):

    """section이 들어오면 거기에 맞는 subsection을 반환함"""

    def get(self, request):
        section = request.GET.get('section')
        section = get_object_or_404(Section, name__iexact = section)
        subsections = Subsection.objects.filter(section = section) # 연결된 모든 객체 반환
        serializer = SubsectionSerializer(subsections, many = True)

        return Response({'subsection' : serializer.data},
                        status = status.HTTP_200_OK)

class SubsectionCreateView(APIView):

    def post(self, request, *args, **kwargs):

        try:
            section = request.data.get('section')
            subsection = request.data.get('subsection')

            section = Section.objects.get(name = section)

            subsection = Subsection.objects.create(name = subsection, 
                                                   section = section)
            
            serializer = SubsectionSerializer(subsection)
            return Response(serializer.data, status = status.HTTP_201_CREATED)
        
        except Exception as e:
            return Response({'error' : str(e)}, status = status.HTTP_500_INTERNAL_SERVER_ERROR)

        
