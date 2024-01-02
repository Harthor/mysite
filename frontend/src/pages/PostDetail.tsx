import React, { useState, useEffect }  from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import QuillRead from '../components/QuillRead';
import { CiBoxList, CiEdit } from "react-icons/ci";
import { RiDeleteBinLine } from "react-icons/ri";


const PostDetail: React.FC = () => {
    const { category, section, slug } = useParams(); 
    const [post, setPost] = useState<Post[]>();
    const navigate = useNavigate();

    useEffect(() => {
        fetchData();
    }, []);

    const navigateToList = () => {
        // '/'부터 시작하면 절대경로임
        navigate(`/${category}/${section}/1`) 
    }

    const navigateToEditPost = () => {
        navigate(`/${category}/${section}/edit/${slug}`)
    }

    const fetchData = async () => {
        try { 
            console.log(`http://localhost:8000/api/blog/post/?slug=${slug}`)
            const response = await axios.get<Post>(`http://localhost:8000/api/blog/post/?slug=${slug}`)
            console.log(response)
            setPost(response.data)
        } catch (e) {
            alert(`현재 ${e} 에러 발생 중`)
        }
    };

    return (
        <div className="max-w-2xl mx-auto mt-2 p-4">
            {post ? (
                <>
                <div className="flex flex-col items-center px-4 mb-4">
                    <h1 className="text-3xl font-semibold mb-2 py-1">{post.title}</h1>
                        <div className="flex w-full items-center">
                            <div className="flex-grow text-lg text-gray-700">{post.subsection}</div>
                            <div className="text-gray-500 text-sm">{post.created_at}</div>
                        </div>
                </div>
                
                <div className='px-3'> 
                    <QuillRead htmlContent = {post?.content}/>
                    <div className='mt-1'>
                    <button className='flex items-center justify-center float-left text-xs bg-gray-100 font-semibold mr-2 px-2' onClick={navigateToEditPost}>
                        <CiEdit class="inline mr-1" size="20"/> 수정
                    </button>
                    <button className='flex items-center justify-center float-left text-xs bg-red-300 font-semibold px-2' >
                        <RiDeleteBinLine class="inline mr-1" size="20"/> 삭제
                    </button>
                    <button className='flex items-center justify-center float-right text-xs bg-blue-200 font-semibold ml-2 px-2' onClick={navigateToList}>
                        <CiBoxList class="inline mr-1" size="20"/> 게시판
                    </button>
                    </div>
                </div>
                </>
            ) : (
                <p> Loading... </p>
            )
        }
            
            
        </div>
    )
}

export default PostDetail