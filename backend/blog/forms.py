from django import forms
from .models import Post, Subsection

class PostForm(forms.ModelForm):
    # Form은 생성, 수정이 동일해도 됨
    class Meta:
        model = Post
        fields = ['title', 'category', 'section', 'subsection', 'content']

class SubsectionForm(forms.ModelForm):
    class Meta:
        model = Subsection
        fields = ['name', 'section']