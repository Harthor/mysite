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

type pagniatedResponse = {
    posts: Post[];
    total_pages: number;
}

const formatDateTime = (dateTimeString: string): string => {
    const dateTime = new Date(dateTimeString);
    const today = new Date();

    if (dateTime.toDateString() === today.toDateString()) {
        return dateTime.toLocaleTimeString('ko-KR', {hour: 'numeric', minute:'numeric'});
    } else {
        return dateTime.toLocaleDateString('ko-KR', {year: 'numeric', month: "numeric", day: 'numeric'})
    };
}


const PostList: React.FC = () => {
    const [posts, setPosts] = useState<Post[]>([]);
    const [loading, setLoading] = useState(true);
    const [totalPage, setTotalPage] = useState(1);
    const { subject, category, page } = useParams(); 
    const currentPage = parseInt(page, 10) || 1; // 문자열 -> 숫자 변환, 실패 시 1이 기본값
    const navigate = useNavigate();

    const postsPerPage: number = 5;
    const paginationSize: number = 10;

    const startPage: number = Math.floor((currentPage - 1) / paginationSize) * paginationSize + 1;
    const endPage: number = Math.min(startPage + paginationSize - 1, totalPage);


    useEffect(() => {
        fetchData();
    
        
            // 컴포넌트 언마운트 시 이전 데이터 초기화
            // 카테고리가 달라지는데도 이전 카테고리 게시판이 남는 현상 수정
        return () => {
            setPosts([])
        }
    }, [ category, currentPage ]);

    const fetchData = async () => {
        try { 
            
            console.log(`http://localhost:8000/api/blog/?category=${category}&page=${currentPage}&postperpage=${postsPerPage}`)
            const response = await axios.get<pagniatedResponse>(`http://localhost:8000/api/blog?category=${category}&page=${currentPage}&postperpage=${postsPerPage}`)
            setPosts(response.data.posts);
            console.log(posts);
            setTotalPage(response.data.total_pages)
            setLoading(false);
        } catch (e) {
            alert(`현재 ${e} 에러 발생 중`)
        }
    };

    const handleWritePost = ( subject:string, category:string ) => {
        navigate(`/${subject}/${category}/post/create`);
    }

    // slice는 인덱스 기반으로 동작한다

  return (
    <div className="flex flex-col items-center justify-center container mx-auto mt-8">
        <div className="flex-none mb-4">
            <h1>{category} 게시판</h1>
        </div>

        <div className="flex-1">
        {/* 게시판에 글 나열 */}
        {posts.map((post: Post) => (
                        <Link to ={`/${subject}/${category}/post/${post.id}`} className='text-black hover:text-gray'>
                            <div key={post.id} className = "border p-3 m-2">
                                
                                <p className="text-gray-500 text-sm float-right">{formatDateTime(post.created_at)}</p>
                                <p className="text-xl font-bold"></p>{post.title}
                                
                            <p className="text-gray-500 text-sm">{post.subcategory}</p>
                            <p className="mt-2 text-sm">{post.content.length > 100 ? `${post.content.substring(0, 100)}...` : post.content}</p>

                            </div>
                        </Link>
        ))}

        <button onClick={() => handleWritePost(subject, category)}
        className='float-right mt-0'>글 작성하기</button>
        </div>

        {/* 페이지네이션 */}
        <div className="flex-none b-0">
        {posts.length ? (
                <>
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

                </>
            ) 
            : <></>
        }
        </div>
    </div>
  )
}

export default PostList;