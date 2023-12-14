import React, { useState, useEffect } from 'react'
import { Link, useParams, useNavigate } from 'react-router-dom';
import axios from 'axios'

type Post = {
    id: number;
    slug: string;
    category: string;
    subcategory: string;
    title: string;
    content: string;
    author: string;
    created_at: string;
}

type PostListProps = {
    subject: string;
    category: string;
}

type pagniatedResponse = {
    posts: Post[];
    total_pages: number;
}

const PostList: React.FC<PostListProps> = ({ subject, category }) => {
    const [posts, setPosts] = useState<Post[]>([]);
    const [loading, setLoading] = useState(true);
    const [totalPage, setTotalPage] = useState(1);
    const { page } = useParams(); 
    const currentPage = parseInt(page, 10) || 1; // 문자열 -> 숫자 변환, 실패 시 1이 기본값
    const navigate = useNavigate();

    const postsPerPage: number = 5;
    const paginationSize: number = 10;

    const startPage: number = Math.floor((currentPage - 1) / paginationSize) * paginationSize + 1;
    const endPage: number = Math.min(startPage + paginationSize - 1, totalPage);


    useEffect(() => {
        fetchData();
    
        return () => {
            // 컴포넌트 언마운트 시 이전 데이터 초기화
            // 카테고리가 달라지는데도 이전 카테고리 게시판이 남는 현상 수정
            setPosts([])
        }
    }, [category, currentPage]);

    const fetchData = async () => {
        try { 
            
            console.log(`http://localhost:8000/api/blog/?category=${category}&page=${currentPage}&postperpage=${postsPerPage}`)
            const response = await axios.get<pagniatedResponse>(`http://localhost:8000/api/blog?category=${category}&page=${currentPage}&postperpage=${postsPerPage}`)
            setPosts(response.data.posts);
            console.log(posts);
            setTotalPage(response.data.total_pages)

            // 리터럴을 그대로 넣으면 [object Object] 처럼 이상한 값이 나타난다고 함
            // console.log(`response : ${response.data.posts}, ${response.data.total_pages}`);
            // 얘처럼 수정함
            // console.log('response posts : ', response.data.posts);
            // console.log('total pages : ', response.data.total_pages);

            setLoading(false);
        } catch (e) {
            alert(`현재 ${e} 에러 발생 중`)
        }
    };

    // slice는 인덱스 기반으로 동작한다

  return (
    <div>
        { loading ? (
            <p> Loading... </p>
        ) :
        (
        <>
            <h1>{category} 게시판</h1>
            
            {/* 글 표시하기 */}
            <ul>
                {posts.map((post: Post) => (
                    <li key={post.id}>
                        <Link to ={`/${subject}/${category}/post/${post.id}`}>
                            {post.title}
                        </Link>
                    </li>
                ))}
            </ul>

            {/* 페이지네이션 */}
            {posts.length ? (
                <div>
                    {/* index는 0부터 시작한다. */}
                    {Array.from({ length : endPage - startPage + 1 }).map((_, index) => {
                            const page = startPage + index;
                            return (
                                <button key={page} 
                                onClick={() => navigate(`/${subject}/${category}/${page}`)}>
                                    {page}
                                </button>
                            );
                        }
                        )
                    }

                </div>
            ) 
            : ( <h1>아무런 글이 없지롱</h1>) 
        }

        </>
        )
            }
    </div>
  )
}

export default PostList;