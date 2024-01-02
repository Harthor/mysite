import React, { useState, useEffect } from 'react'
import { Link, useParams, useNavigate } from 'react-router-dom';
import axios from 'axios'
import { HiOutlinePencil, HiOutlinePencilSquare } from 'react-icons/hi2'

type Post = {
    slug: string;
    subsection: string;
    title: string;
    preview: string;
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
    const { category, section, page } = useParams(); 
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
    }, [ section, currentPage ]);

    const fetchData = async () => {
        try { 
            const response = await axios.get<pagniatedResponse>(`http://localhost:8000/api/blog?section=${section}&page=${currentPage}&postperpage=${postsPerPage}`)
            console.log(response);
            setPosts(response.data.posts);
            setTotalPage(response.data.total_pages)
            setLoading(false);
        } catch (e) {
            alert(`현재 ${e.message} 에러 발생 중`)
        }
    };

    const handleWritePost = ( category:string, section:string ) => {
        navigate(`/${category}/${section}/post/create`);
    }

    // slice는 인덱스 기반으로 동작한다

  return (
    <div className="flex flex-col items-center justify-center container mx-auto mt-8 flex-shrink-0 w-full">
        <div className="flex-none">
            <h1>{section} 게시판</h1>
        </div>
        <section className='text-gray-600 body-font overflow-hidden '>
            <div className='container px-5 py-12 mx-auto'>
                <div className='-my-8 divide-y-2 divide-gray-100'>
                    {/* 게시판에 글 나열 */}
                    {posts.map((post: Post) => (
                        <div className='py-8 flex flex-wrap md:flex-nowrap'>
                            <div className="md:w-1/4 md:mb-0 mb-6 flex-shrink-0 flex flex-col" >
                                <span className='font-semibold title-font text-gray-700'>{post.subsection}</span>
                                <span className='mt-1 text-gray-500 text-sm'>{formatDateTime(post.created_at)}</span>
                            </div>
                            <Link to ={`/${category}/${section}/post/${post.slug}`}>
                                <div className='md:flex-grow'>
                                    <h2 className="text-2xl font-medium text-gray-700 title-font mb-2">{post.title}</h2>
                                    <p className="leading-relaxed text-gray-500">{post.preview}</p>
                                </div>
                            </Link>
                        </div>
                    ))}
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
                                            onClick={() => navigate(`/${category}/${section}/${page}`)}
                                            className = 'px-3 py-2'>
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
                        <button onClick={() => handleWritePost(category, section)}
                            className='float-right mt-0 px-3 py-2 font-bold outline-none focus:ring-4 shadow-lg transform active:scale-90 transition-transform'>
                            <HiOutlinePencilSquare class='inline' size='24'/>글쓰기
                        </button>
                    </div>
                </div>

        </section>
    </div>
  )
}

export default PostList;