from django.shortcuts import get_object_or_404

from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from django.core.paginator import Paginator, EmptyPage, PageNotAnInteger


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
        page = request.GET.get('page', 1)
        postsPerPage = request.GET.get('postperpage', 5)
        

        # 같은 카테고리 이름임에도 다르게 설정한 경우 
        # DB에서의 검색은 다르게 진행함
        if category == 'ma':
            category = 'movieanimation'
 
        if category:
            category = get_object_or_404(Category, name__iexact=category)
            posts = Post.objects.filter(category=category)
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

