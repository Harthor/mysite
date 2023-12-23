from django.db import models
from django.contrib.auth.models import User
from django.utils.text import slugify

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
    title = models.CharField(max_length = 64, null = False)
    slug = models.SlugField(unique = True, blank = True, allow_unicode = True)
    category = models.ForeignKey(Category, null = False, on_delete = models.CASCADE)
    section = models.ForeignKey(Section, 
                                on_delete = models.CASCADE, 
    )
    subsection = models.ForeignKey(Subsection, on_delete = models.CASCADE)
    content = models.TextField()
    author = models.ForeignKey(User, default = None, on_delete = models.CASCADE)
    created_at = models.DateTimeField(auto_now_add = True)

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