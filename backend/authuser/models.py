from django.contrib.auth.models import AbstractUser, BaseUserManager
from django.db import models
from django.core.validators import RegexValidator
from django.core.exceptions import ValidationError
from django.contrib.auth.models import Group, Permission

class MyUserManager(BaseUserManager):
    def create_user(self, username, email, password):
        if not username:
            raise ValueError("Username(유저입력아이디)은 필수입니다.")
        if not email:
            raise ValueError("이메일 주소는 필수입니다.")

        # 비밀번호는 디폴트로 필수 필드 - create_user 메소드
        user = self.model(
            username = username,
            email = self.normalize_email(email),
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
                            # min_length = 2,
                            max_length = 8, 
                            null = True, 
                            blank = True, 
                            unique = True,
                            validators = [RegexValidator(regex='^[a-zA-Z0-9가-힣]+$',
                                            message="닉네임은 한글, 영어 대소문자, 숫자로 2~8글자가 가능합니다.")])

    # 사용자 그룹화 - 그룹에 권한 할당 & 특정 작업을 수행하도록 하게 함
    groups = models.ManyToManyField(
        Group,
        verbose_name=('groups'),
        blank=True,
        related_name="myuser_set",  # 커스텀 related_name
        help_text=(
            'The groups this user belongs to. A user will get all permissions '
            'granted to each of their groups.'
        ),
    )
    # 권한 - 권한 자체
    user_permissions = models.ManyToManyField(
        Permission,
        verbose_name=('user permissions'),
        blank=True,
        related_name="myuser_set",  # 커스텀 related_name
        help_text=('Specific permissions for this user.'),
    )

    objects = MyUserManager()

    USERNAME_FIELD = 'username'
    REQUIRED_FIELDS = ['email',] 

    def __str__(self):
        return self.nickname if self.nickname else self.username
    
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
