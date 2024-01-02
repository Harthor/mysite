from django.db import models
from django.contrib.auth.models import User
from django.utils.text import slugify
from django.db.models import Max # obj['컬럼명']으로 최대값을 가져옴

class Category(models.Model):
    name = models.CharField(max_length = 64, null = False)

    def __str__(self):
        return self.name

class Section(models.Model):
    name = models.CharField(max_length = 64, null = False)
    category = models.ForeignKey(Category, on_delete = models.CASCADE)

    def __str__(self):
        return self.name
    
    def get_category_as_string(self):
        return str(self.subsection)

class Subsection(models.Model):
    name = models.CharField(max_length = 64, null = False, unique = True)
    section = models.ForeignKey(Section, on_delete = models.CASCADE)


    def __str__(self):
        return self.name
    
    def get_section_as_string(self):
        return str(self.section)



class Post(models.Model):
    """
    null 옵션 : 백엔드에 null 상태로 저장되어도 되는가?
    blank 옵션 : form 데이터를 통해 POST 요청이 올 떄, 해당 필드가 비어 있는 채 와도 되는가?
    """
    title = models.CharField(max_length = 64, blank = False, unique = True)
    slug = models.SlugField(unique = True, blank = True, null = False, allow_unicode = True)
    category = models.ForeignKey(Category, null = False, on_delete = models.CASCADE)
    section = models.ForeignKey(Section, 
                                on_delete = models.CASCADE, 
    )
    subsection = models.ForeignKey(Subsection, on_delete = models.CASCADE)
    content = models.TextField(blank = False, null = False) 
    author = models.ForeignKey(User, default = None, on_delete = models.CASCADE)
    # auto_now 시리즈는 save 메서드에 별도로 구현하지 않게 해준다.
    created_at = models.DateTimeField(auto_now_add = True, blank = True, null = False)
    edited_at = models.DateTimeField(auto_now = False, blank = True, null = True)

    class Meta:
        db_table = 'post'
        ordering = ('-created_at', )

    def __str__(self):
        return self.title
    
    def save(self, *args, **kwargs):
        # 이미 생성된 객체의 필드 값을 변경하고 저장할 때 사용한다.

        # 슬러그 지정 안할 시 자동 생성
        if not self.slug:
            self.slug = slugify(self.title, allow_unicode=True)

            # 슬러그 중복 방지
            max_slug = Post.objects.filter(slug__startswith=self.slug).count()
            
            if max_slug > 0:
                self.slug = f"{self.slug}-{max_slug}" 

        if not self.author_id:
            self.author = User.objects.get(username='dowrave')
        
        super().save(*args, **kwargs)
    
    def get_slug_as_string(self):
        return str(self.slug)

    def get_author_as_string(self):
        return str(self.author)
    
    def get_category_as_string(self):
        return str(self.category)
    
    def get_section_as_string(self):
        return str(self.section)
    
    def get_subsection_as_string(self):
        return str(self.subsection)

class Comment(models.Model):
    post = models.ForeignKey(Post, on_delete = models.CASCADE)
    author = models.ForeignKey(User, on_delete = models.CASCADE)
    content = models.TextField()
    created_at = models.DateTimeField(auto_now_add = True)