from django.urls import re_path
from .views import *
from rest_framework_simplejwt.views import TokenRefreshView

urlpatterns = [
    re_path(r'^check-send-email/$', EmailVerificationView.as_view(), name = 'check_and_send_mail'),
    re_path(r'^verify-email$', VerifyEmailView.as_view(), name='verify_mail'),
    re_path(r'^register$', RegisterUserView.as_view(), name='user_register'),
    re_path(r'^login$', LoginView.as_view(), name='login'),
    re_path(r'^check-userid$', FetchUserIdView.as_view(), name = 'fetch_id'),
    re_path(r'^check-nickname$', FetchNicknameView.as_view(), name = 'fetch_nickname'),
    re_path(r'^token-refresh/$', TokenRefreshView.as_view(), name = 'token_refresh'),
    
]