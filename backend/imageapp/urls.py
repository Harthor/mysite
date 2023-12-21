from django.urls import re_path
from .views import ImageUploadView

urlpatterns = [
    re_path(r'^upload/$', ImageUploadView.as_view(), name = 'upload_image'),
    
]