from typing import Any
from django.contrib import admin
from django.db.models.fields.related import ForeignKey
from django.forms.models import ModelChoiceField
from django.http.request import HttpRequest
from blog.models import *

# Register your models here.


class PostAdmin(admin.ModelAdmin):
    list_display = ('title', 'created_at')
    search_fields = ('title', 'content')
    
    def save_model(self, request, obj, form, change):
        # 현재 로그인한 사용자를 작성자로 설정
        obj.author = request.user
        super().save_model(request, obj, form, change)

admin.site.register(Post, PostAdmin) # 이게 있어야 등록이 됨

# 이 모델들을 등록만 해도 Post를 작성할 때 원하는 카테고리가 없다면 새로 추가하는 란이 생긴다.
# 반대로 얘네를 등록하지 않는다면, 이미 있는 카테고리만 지정할 수 있다.
admin.site.register(Category)
admin.site.register(Section)
admin.site.register(SubSection)
