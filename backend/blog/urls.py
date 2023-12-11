from django.urls import re_path
from blog.views import *

urlpatterns = [
    re_path(r'^$', PostListView.as_view(), name='post_list'),
    re_path(r'^(?P<pk>\d+)$', PostDV.as_view(), name='detail'),
]