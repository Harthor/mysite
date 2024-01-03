from django.contrib.auth.models import AbstractBaseUser, BaseUserManager
from django.db import models

class MyUserManager(BaseUserManager):
    def create_user(self, email, nickname, password):
        if not email:
            raise ValueError("이메일 주소는 필수입니다.")
        if not nickname:
            raise ValueError("닉네임은 필수입니다.")

        # 비밀번호는 디폴트로 필수 필드 - create_user 메소드
        user = self.model(
            email = self.normalize_email(email),
            nickname = nickname,
        )

        user.set_password(password) # 비밀번호 암호화
        user.save(using = self._db)

        return user
    
    def create_superuser(self, email, nickname, password):
        user = self.create_user(
            email, password = password, nickname = nickname
        )

        # 설정을 바꿔서 저장. 총 2번 저장하지만 성능 상 큰 이슈는 없음.
        user.is_admin = True
        user.save(using = self._db)
        return user
    
class MyUser(AbstractBaseUser):
    email = models.EmailField(
        verbose_name = 'email address', # django admin, form, 모델 메타 데이터, 동적 UI 등..
        max_length = 255,
        unique = True
    )
    nickname = models.CharField(max_length = 50, unique = True)
    is_active = models.BooleanField(default = True)
    is_admin = models.BooleanField(default = False)

    objects = MyUserManager()

    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = ['nickname', ] 

    def __str__(self):
        return self.email
    
    # 권한 여부 확인(perm : 권한, obj : 권한과 관련된 객체)
    def has_perm(self, perm, obj = None):
        return True
    
    # 특정 Django 앱의 권한을 가지고 있는지 확인
    def has_module_perms(self, app_label):
        return True
    
    @property # 속성처럼 쓸 수 있게 함(.is_staff // 쓰지 않으면 .is_staff()로 사용)
    def is_staff(self):
        return self.is_admin
