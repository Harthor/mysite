from rest_framework import generics
from .serializers import UserSerializer
from django.core.mail import send_mail

class CreateUserView(generics.CreateAPIView):
    serializer_class = UserSerializer

    def perform_create(self, serializer):
        user = serializer.save()

        # 이메일전송
        send_mail('사이트 가입 인증 메일입니다',
                  [user.email],
                  fail_silently = False
                  )
