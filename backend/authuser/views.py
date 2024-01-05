from rest_framework import generics, status
from rest_framework.views import APIView
from rest_framework.response import Response
from .serializers import UserSerializer
from django.core.mail import send_mail
from .models import MyUser

class CreateUserView(generics.CreateAPIView):
    serializer_class = UserSerializer

    def perform_create(self, serializer):
        user = serializer.save()

        # 이메일전송
        send_mail('사이트 가입 인증 메일입니다',
                  [user.email],
                  fail_silently = False
                  )

class FetchUserIdView(APIView):
    def post(self, request):
        username = request.data.get('id')
        if username:
            user_exists = MyUser.objects.filter(username=username).exists()
            return Response({'isAvailable' : not user_exists})
        return Response({"error" : "아이디가 없음"}, status = status.HTTP_400_BAD_REQUEST)
