from django.urls import re_path
from blog.views import *

# 정규표현식이 겹치지 않게 정확히 작성할 것
# 겹치는 케이스가 있다면 앞에 있는 게 실행된다.

urlpatterns = [
    re_path(r'^$', PostListView.as_view(), name='PostList'),
    re_path(r'^post/$', PostDetailView.as_view(), name='PostDetail'),
    re_path(r'^post/create$', PostCreateView.as_view(), name='PostCreate'),
    re_path(r'^subsection/$', SubsectionListView.as_view(), name='Subsection'),
    re_path(r'^subsection/create$', SubsectionCreateView.as_view(), name='SubsectionCreate'),
]