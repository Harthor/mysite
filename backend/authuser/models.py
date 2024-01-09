from django.contrib.auth.models import AbstractUser, BaseUserManager
from django.db import models
from django.core.validators import RegexValidator
from django.core.exceptions import ValidationError
from django.contrib.auth.models import Group, Permission

class MyUserManager(BaseUserManager):
    """
    커스텀 모델을 쓸 경우 사용자 관리 메서드를 제공하는 매니저 클래스 2개를 구현해야 한다.
    """
    def create_user(self, username, email, password, nickname):
        if not username:
            raise ValueError("Username(유저입력아이디)은 필수입니다.")
        if not email:
            raise ValueError("이메일 주소는 필수입니다.")

        # 비밀번호는 디폴트로 필수 필드 - create_user 메소드
        user = self.model(
            username = username,
            email = self.normalize_email(email),
            nickname = nickname
        )

        user.set_password(password) # 비밀번호 암호화
        user.save(using = self._db)

        return user
    
    def create_superuser(self, username, email, password):
        user = self.create_user(
            username = username, email = email, password = password,
        )

        # 설정을 바꿔서 저장. 총 2번 저장하지만 성능 상 큰 이슈는 없음.
        user.is_superuser = True
        user.is_staff = True
        user.save(using = self._db)
        return user
    
class MyUser(AbstractUser):

    username = models.CharField(
        max_length = 14,
        unique = True,
        validators = [RegexValidator(regex='^[a-z0-9]+$', 
                                     message="UserName은 영소문자와 숫자만 가능합니다.")],
    )
    email = models.EmailField(
        verbose_name = 'email address', # django admin, form, 모델 메타 데이터, 동적 UI 등..
        max_length = 320,
        unique = True
    )
    nickname = models.CharField(
                            max_length = 6, 
                            unique = True,
                            validators = [RegexValidator(regex='^\p{L}\p{N}]{2,6}$',
                                            message="닉네임은 한글, 숫자, 영어 2~6글자입니다.")])


    objects = MyUserManager()

    USERNAME_FIELD = 'username'
    REQUIRED_FIELDS = ['email', 'nickname'] 

    def __str__(self):
        return self.nickname
    
    # 권한 여부 확인(perm : 권한, obj : 권한과 관련된 객체)
    def has_perm(self, perm, obj = None):
        return True
    
    # 특정 Django 앱의 권한을 가지고 있는지 확인
    def has_module_perms(self, app_label):
        return True
    
    def save(self, *args, **kwargs):
        if len(self.username) < 6:
            raise ValidationError("id의 최소 길이는 6글자입니다.")
        if self.nickname: 
            if len(self.nickname) < 2:
                raise ValidationError("닉네임의 최소 길이는 2글자입니다.")
        super(MyUser, self).save(*args, **kwargs)


class EmailVerification(models.Model):
    """
    이메일 인증을 위한 모델
    """
    email = models.EmailField(unique=True) # 가입도 있기 때문에 외래키 쓰면 X
    code = models.CharField(max_length = 6)
    created_at = models.DateTimeField(auto_now_add = True)

    def __str__(self):
        return f'{self.user.email} - {self.code}'
    
    def verify(self):
        """
        인증 완료시 코드 제거
        """
        self.delete()