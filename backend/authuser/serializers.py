from rest_framework import serializers
from django.core.validators import RegexValidator
from django.core.exceptions import ValidationError
from .models import MyUser
import regex

def unicode_regex_validator(value):

    # \w : wordCharacter지만, 밑줄과 점을 포함
    # \p{L} : 모든 언어의 문자
    # \p{N} : 모든 숫자
    if not regex.match(r'[\p{L}\p{N}]{2,6}', value):
        raise ValidationError("2~6글자의 유니코드 문자나 숫자가 아닙니다.")

class UserSerializer(serializers.ModelSerializer):

    email = serializers.EmailField() # Django에서는 이메일 형식을 자동으로 검증해줌


    nickname = serializers.CharField(
        validators = [unicode_regex_validator]
    )

    class Meta:
        model = MyUser
        fields = ('username', 'email', 'nickname', 'password') # 'id'는 조회할 때 포함하면 좋다
        extra_kwargs = {'password' : {'write_only' : True}}

    def create(self, validated_data):
        user = MyUser.objects.create_user(
            username = validated_data['username'],
            email = validated_data['email'],
            nickname = validated_data['nickname'],
            password = validated_data['password']
        )
        return user
    
