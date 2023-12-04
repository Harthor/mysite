from django.shortcuts import render
from rest_framework import generics
from .models import Todo
from .serializers import TodoSerializer

# Todo 생성 담당
class TodoListCreateView(generics.ListCreateAPIView):
    queryset = Todo.objects.all()
    serializer_class = TodoSerializer

# 개별 Todo에 대한 조회, 수정, 삭제 담당
class TodoListDetailView(generics.RetrieveUpdateDestroyAPIView):
    queryset = Todo.objects.all()
    serializer_class = TodoSerializer

