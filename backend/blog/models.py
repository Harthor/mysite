from django.db import models
from django.contrib.auth.models import User
from django.utils.text import slugify

class Category(models.Model):
    name = models.CharField(max_length = 255, null = False)

    def __str__(self):
        return self.name


class SubCategory(models.Model):
    name = models.CharField(max_length = 255, null = False)
    main_category = models.ForeignKey(Category, on_delete = models.CASCADE)

    def __str__(self):
        return self.name


class Post(models.Model):
    title = models.CharField(max_length = 255, null = False)
    slug = models.SlugField(unique = True, blank = True, allow_unicode = True)
    category = models.ForeignKey(Category, null = False, on_delete = models.CASCADE)
    subcategory = models.ForeignKey(SubCategory, 
                                    on_delete = models.CASCADE, 
    )
    content = models.TextField()
    author = models.ForeignKey(User, on_delete = models.CASCADE)
    created_at = models.DateTimeField(auto_now_add = True)

    class Meta:
        db_table = 'post'
        ordering = ('-created_at', )

    def __str__(self):
        return self.title
    
    def save(self, *args, **kwargs):
        # 슬러그 지정 안할 시 자동 생성
        if not self.slug:
            self.slug = slugify(self.title, allow_unicode=True)
        super().save(*args, **kwargs)
    
    def get_slug_as_string(self):
        return str(self.slug)

    def get_author_as_string(self):
        return str(self.author)
    
    def get_category_as_string(self):
        return str(self.category)
    
    def get_subcategory_as_string(self):
        return str(self.subcategory)

class Comment(models.Model):
    post = models.ForeignKey(Post, on_delete = models.CASCADE)
    author = models.ForeignKey(User, on_delete = models.CASCADE)
    content = models.TextField()
    created_at = models.DateTimeField(auto_now_add = True)