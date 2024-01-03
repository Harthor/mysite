from rest_framework import serializers
from django.core.validators import RegexValidator
from .models import MyUser

class UserSerializer(serializers.ModelSerializer):

    email = serializers.EmailField() # Django에서는 이메일 형식을 자동으로 검증해줌

    # \w : wordCharacter지만, 밑줄과 점을 포함
    # \p{L} : 모든 언어의 문자
    # \p{N} : 모든 숫자
    nickname = serializers.CharField(
        validators = [RegexValidator(regex=r'^[\p{L}\p{N}]+$', 
                                     message = "유효하지 않은 닉네임입니다.")]
    )

    class Meta:
        model = MyUser
        fields = ('id', 'email', 'nickname', 'password')
        extra_kwargs = {'password' : {'write_only' : True}}

    def create(self, validated_data):
        user = MyUser.objects.create_user(
            email = validated_data['email'],
            nickname = validated_data['nickname'],
            password = validated_data['password']
        )
        return user
    
