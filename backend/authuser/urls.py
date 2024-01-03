from django.urls import re_path
from .views import CreateUserView

urlpatterns = [
    re_path(r'^signup/$', CreateUserView.as_view(), name = 'signup'),
    
]