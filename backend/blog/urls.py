from django.urls import re_path
from blog.views import *

urlpatterns = [
    re_path(r'^$', PostListView.as_view(), name='PostList'),
    re_path(r'^post/', PostDetailView.as_view(), name='PostDetail'),
    re_path(r'^subsection/', SubSectionListView.as_view(), name='SubSection'),
]