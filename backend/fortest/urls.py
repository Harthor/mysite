from django.urls import path
from .views import TodoListCreateView, TodoListDetailView

urlpatterns = [
    path('api/todos/', TodoListCreateView.as_view(), name='todo-list-create'),
    path('api/todos/<int:pk>/',TodoListDetailView.as_view(), name='todo-list-create'),

    
]