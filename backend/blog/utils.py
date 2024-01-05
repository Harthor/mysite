from bs4 import BeautifulSoup, NavigableString # 태그가 아닌 문자열
import html
from django.core.validators import RegexValidator

from django.core.paginator import Paginator, PageNotAnInteger, EmptyPage

subsection_validator = RegexValidator(
    regex=r'^[\uAC00-\uD7AF\u3040-\u30FF\u31F0-\u31FFa-zA-Z0-9]{2,16}$',
    message="이름은 2~16글자의 한국어, 일본어, 알파벳, 숫자만 포함할 수 있습니다."
)

def extract_preview_text(html_content):
    """
    글 내용에서 미리 보기용 텍스트만 뽑아낸다.
    """
    soup = BeautifulSoup(html_content, 'lxml')

    p_tags = soup.find_all('p')
    p_text = ''

    for p in p_tags:
        # 각 p 태그의 내용을 다시 파싱
        inner_soup = BeautifulSoup(html.unescape(str(p)), 'lxml')

        # 원하지 않는 태그 제거
        for tag in inner_soup.find_all(['a', 'img', 'iframe', 'pre']):
            tag.extract()

        # 남은 텍스트 추출
        p_text += ' ' + inner_soup.get_text(separator=" ", strip=True)

    return p_text[:150]

def pagniate_queryset(queryset: dict, now_page: int, posts_per_page: int):

    paginator = Paginator(queryset, posts_per_page)

    try:
        return paginator.page(now_page), paginator.num_pages
    except PageNotAnInteger:
        return paginator.page(1), paginator.num_pages
    except EmptyPage:
        return paginator.page(paginator.num_pages), paginator.num_pages