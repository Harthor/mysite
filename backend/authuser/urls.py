from django.urls import re_path
from .views import *

urlpatterns = [
    re_path(r'^signup/$', CreateUserView.as_view(), name = 'signup'),
    re_path(r'^check-userid/$', FetchUserIdView.as_view(), name = 'fetch_id'),
]