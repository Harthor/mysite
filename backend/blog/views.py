from django.shortcuts import get_object_or_404
from django.utils.html import escape

from rest_framework.views import APIView
from rest_framework.parsers import MultiPartParser, FormParser
from rest_framework.response import Response
from rest_framework import status, generics
from rest_framework.permissions import IsAuthenticated
from rest_framework_simplejwt.authentication import JWTAuthentication


from .serializers import *
from blog.models import *
from .forms import *
from .utils import extract_preview_text, pagniate_queryset

import json
import re


class PostListView(APIView):

    def get(self, request):
        """
        각 페이지의 게시글 리스트를 가져옵니다.
        url은 api/blog/{section_name}으로 접근합니다.
        """
        section = request.GET.get('section')
        now_page = request.GET.get('page', 1)
        posts_per_page = request.GET.get('postperpage', 5)
        
        if section:
            section = get_object_or_404(Section, name__iexact=section)
            posts = Post.objects.filter(section=section)
        else:
            posts = Post.objects.all()

        # 미리보기를 위해 posts 가공
        preview_posts = []
        for post in posts:

            preview_text = extract_preview_text(post.content)

            preview_post = {
                'slug' : post.slug,
                'title' : post.title,
                'preview' : preview_text,
                'subsection' : post.subsection,
                'created_at' : post.created_at
            }
            preview_posts.append(preview_post)

        # 페이지네이터 구현
        # 얘는 pagniator에 의해 정해진 갯수의 데이터만을 다시 보내게 됨
        posts, total_pages = pagniate_queryset(preview_posts, now_page, posts_per_page)

        serializer = PostSerializer(posts, many = True, context={'request' : request})
        return Response({'posts' : serializer.data,
                         'total_pages' : total_pages,
                         }, status=status.HTTP_200_OK)

class PostCreateView(APIView):
    permission_classes = [IsAuthenticated] # 인증되지 않은 사용자는 401 에러 반환
    authentication_classes = [JWTAuthentication]

    def post(self, request, *args, **kwargs):

        jwt_user = request.user # "액세스 토큰"에 들어 있는 유저를 확인함

        if not jwt_user:
            return Response({"error" : "유효하지 않은 토큰입니다."}, status = status.HTTP_401_UNAUTHORIZED)

        nickname = request.data.get('author')
        if not nickname:
            return Response({'error' : '글쓴이 이름이 등록되지 않았습니다'}, 
                            status = status.HTTP_400_BAD_REQUEST)
        try:
            user = MyUser.objects.get(nickname = nickname)
        except MyUser.DoesNotExist:
            return Response({'error' : '해당하는 User 정보가 없습니다.'}, 
                            status = status.HTTP_404_NOT_FOUND)
        
        data = request.data.copy() # request.data는 불변 객체로, 수정 불가능

        # 객체로 넣어야 함
        data['author'] = user.id
        data['created_at'] = timezone.now()

        # 안전한 HTML 보장하기
        data['content'] = escape(data['content'])

        serializer = PostSerializer(data = data, context = {'request' : request})
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status = status.HTTP_201_CREATED)
        else:
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class PostDetailView(APIView):
    def get(self, request):
        print(request.GET)
        slug = request.GET.get('slug')

        post = get_object_or_404(Post, slug = slug)
        serializer = PostSerializer(post, context={'request' : request})

        print(serializer.data)
        return Response(serializer.data, status = status.HTTP_200_OK)


class SubsectionListView(APIView):

    """section이 들어오면 거기에 맞는 subsection을 반환함"""

    def get(self, request):
        section = request.GET.get('section')
        section = get_object_or_404(Section, name__iexact = section)
        subsections = Subsection.objects.filter(section = section) # 연결된 모든 객체 반환
        serializer = SubsectionListSerializer(subsections, many = True)

        return Response({'subsection' : serializer.data},
                        status = status.HTTP_200_OK)

class SubsectionCreateView(APIView):

    def post(self, request, *args, **kwargs):

        try:
            section = request.data.get('section')
            subsection = request.data.get('subsection')

            section = Section.objects.get(name = section)
            # 만드는 과정이 꼭 있어야 함
            subsection = Subsection.objects.create(name = subsection, 
                                                   section = section)
            
            serializer = SubsectionCreateSerializer(subsection)

            return Response(serializer.data, status = status.HTTP_201_CREATED)
        
        except Exception as e:
            print(e)
            return Response({'error' : str(e)}, status = status.HTTP_500_INTERNAL_SERVER_ERROR)


