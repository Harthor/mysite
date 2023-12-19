from django.shortcuts import get_object_or_404

from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from django.core.paginator import Paginator, EmptyPage, PageNotAnInteger

from .serializers import *
from blog.models import *

import json

# class PostLV(ListView):
#     model = Post
#     paginate_by = 3

class PostListView(APIView):

    def get(self, request):
        """
        각 페이지의 게시글 리스트를 가져옵니다.
        url은 api/blog/{section_name}으로 접근합니다.
        """
        section = request.GET.get('section')
        page = request.GET.get('page', 1)
        postsPerPage = request.GET.get('postperpage', 5)
        

        # 같은 카테고리 이름임에도 다르게 설정한 경우 
        # DB에서의 검색은 다르게 진행함
        if section == 'ma':
            section = 'movieanimation'
 
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

        serializer = PostSerializer(posts, many = True)
        print(page, serializer.data)
        return Response({'posts' : serializer.data,
                         'total_pages' : paginator.num_pages,
                         }, status=status.HTTP_200_OK)


class PostDetailView(APIView):
    def get(self, request):
        print(request.GET)
        id = request.GET.get('id')

        post = get_object_or_404(Post, id = id)
        serializer = PostDetailSerializer(post)
        print(serializer.data)
        return Response(serializer.data, status = status.HTTP_200_OK)


class SubSectionListView(APIView):

    """section이 들어오면 거기에 맞는 subsection을 반환함"""

    def get(self, request):
        section = request.GET.get('section')

        section = get_object_or_404(Section, name__iexact = section)
        subsections = SubSection.objects.filter(section = section) # 연결된 모든 객체 반환

        serializer = SubsectionSerializer(subsections, many = True)

        return Response({'subsection' : serializer.data},
                        status = status.HTTP_200_OK)
    
class CreatePostAPIView(APIView):
    # 프론트엔드에서 생성된 글을 DB에 저장함
    http_method_names = ['post']

    def post(self, request, *args, **kwargs):
        try:
            data = json.loads(request.body)
            title = data.get('title')
            content = data.get('content')
            category_name = data.get('category')
            section_name = data.get('section')
            subsection_name = data.get('subsection')

            # 이미지 처리
            image_file = request.FILES.get('image')
            category = Category.objects.get(name=category_name)
            section = Section.objects.get(name=section_name)
            subsection = SubSection.objects.get(name=subsection_name)

            post = Post.objects.create(
                title=title,
                content=content,
                image=image_file,
                category=category,
                section=section,
                subsection=subsection,
                author=request.user  # 현재 사용자로 설정
            )

            serializer = PostSerializer(post)
            return Response(serializer.data, status = status.HTTP_201_CREATED)
        except json.JSONDecodeError:
            return Response({'status' : 'error', 'message' : '잘못된 JSON 형식입니다.'}, status = status.HTTP_400_BAD_REQUEST)
        except Category.DoesNotExist:
            return Response({'status' : 'error', 'message' : '카테고리를 찾을 수 없습니다.'}, status = status.HTTP_404_NOT_FOUND)
        except Section.DoesNotExist:
            return Response({'status' : 'error', 'message' : '섹션을 찾을 수 없습니다.'}, status = status.HTTP_404_NOT_FOUND)
        except SubSection.DoesNotExist:
            return Response({'status' : 'error', 'message' : '서브섹션을 찾을 수 없습니다.'}, status = status.HTTP_404_NOT_FOUND)
