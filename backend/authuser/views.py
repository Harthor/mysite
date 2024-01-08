from django.utils import timezone
from datetime import timedelta

from rest_framework import generics, status
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework_jwt.settings import api_settings
from .serializers import UserSerializer
from .models import MyUser, EmailVerification


# 로그인 관련
from django.contrib.auth import authenticate, login, logout

# 이메일 구현 로직
from django.conf import settings
from django.core.mail import send_mail
import logging

# 보안 강화
import random

logger = logging.getLogger(__name__)

class FetchUserIdView(APIView):
    def post(self, request):
        username = request.data.get('id')
        if username:
            user_exists = MyUser.objects.filter(username=username).exists()
            return Response({'isAvailable' : not user_exists})
        return Response({"error" : "아이디가 없음"}, status = status.HTTP_400_BAD_REQUEST)

class FetchNicknameView(APIView):
    def post(self, request):
        nickname = request.data.get('nickname')
        if nickname:
            nickname_exists = MyUser.objects.filter(nickname=nickname).exists()
            return Response({'isAvailable' : not nickname_exists})
        return Response({"error" : "아이디가 없음"}, status = status.HTTP_400_BAD_REQUEST)


# 인증 관련 뷰들
class EmailVerificationView(APIView):
    """
    이메일 중복 여부를 확인하고,
    없다면 인증 번호를 해당 메일에 보냄
    """
    def post(self, request, *args, **kwargs):

        try:
            email = request.data.get('email')
            print(email)

            verification_code = random.randint(100000, 999999) # 직접 입력하지 않는 경우에는 secrets 모듈의 token_urlsafe를 쓸 수 있음

            print(MyUser.objects.all())
            # 중복된 이메일
            if MyUser.objects.filter(email = email).exists():
                print("중복된 이메일이 있음")
                return Response({"error" : "중복된 이메일이 있음"}, status = status.HTTP_400_BAD_REQUEST)

            # 이메일 검증 로직
            # - 1. 테이블에 인증 코드 저장
            EmailVerification.objects.filter(email = email).delete() # 기존 레코드 삭제
            EmailVerification.objects.create(email = email,
                                            code = verification_code)
            
            email_content = f"""
            <html>
                <body>
                    <p>인증 번호는 아래와 같습니다.</p>
                    <p><b style="font-size: 16px;">{verification_code}</b></p>
                </body>
            </html>
            """

            # - 2. 메일 발송
            send_mail(
                    '이메일 인증 번호', # 제목
                    None, # 텍스트 본문
                    settings.DEFAULT_FROM_EMAIL, # 발신자 메일 
                    [email], # 수신자 메일
                    html_message = email_content, # HTML 본문
                    fail_silently = False) # 오류 발생 시 예외 발생
            print(email)

            return Response({"message" : "인증 번호가 발송되었습니다."}, 
                            status = status.HTTP_200_OK)

        except Exception as e:
            logger.error(f"이메일 전송 실패: {e}", exc_info=True)

            return Response({"error" : '이메일 전송 실패!'},
                             status = status.HTTP_500_INTERNAL_SERVER_ERROR)

class VerifyEmailView(APIView):
    def post(self, request, *args, **kwargs):
        email = request.data.get('email')
        code = request.data.get('code')

        try:
            # 청소 기능 - 원래는 tasks.py에서 주기적으로 작업하는 게 좋지만
            # 많이 쓸 기능이 아니니까 요청이 들어올 때 5분이 지난 건 DB 정리하게끔 하겠음
            expiration_time = timezone.now() - timezone.timedelta(minutes = 5)
            EmailVerification.objects.filter(created_at__lt = expiration_time).delete()


            verification = EmailVerification.objects.get(email = email,
                                                         code = code)
            
            if timezone.now() - verification.created_at <= timedelta(minutes=5):
                verification.delete()
                return Response({'message' : '인증 성공'}, status=status.HTTP_200_OK)
            else:
                verification.delete()
                return Response({"message" : "인증 시간 초과"}, status=status.HTTP_400_BAD_REQUEST)
        except EmailVerification.DoesNotExist:
            return Response({"message" : "유효하지 않은 인증 코드이거나, 없는 이메일입니다."}, status=status.HTTP_400_BAD_REQUEST)

class RegisterUserView(APIView):
    def post(self, request, *args, **kwargs):
        print(request.data)
        serializer = UserSerializer(data = request.data)
        if serializer.is_valid():
            serializer.save()
            return Response({'message' : '회원 가입이 성공적으로 완료되었습니다.'},
                            status = status.HTTP_201_CREATED)
        return Response({'error' : '에러가 발생했습니다.'},
                        status = status.HTTP_400_BAD_REQUEST)

class LoginView(APIView):
    def post(self, request):
        username = request.data.get('username')
        password = request.data.get('password')
        user = authenticate(request,
                            username = username,
                            password = password, )
        
        if user is not None:

            jwt_payload_handler = api_settings.JWT_PAYLOAD_HANDLER
            jwt_encode_handler = api_settings.JWT_ENCODE_HANDLER

            payload = jwt_payload_handler(user)
            token = jwt_encode_handler(payload)

            # username이 고유할 때만 사용 가능
            user = MyUser.objects.get(username = username)
            nickname = user.nickname
            
            return Response({'token' : token,
                             'nickname' : nickname},
                            status = status.HTTP_200_OK)
        
        return Response({'error' : '인증 오류가 발생했습니다.'},
                        status = status.HTTP_400_BAD_REQUEST)
    