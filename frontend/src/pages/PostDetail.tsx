import React, { useState, useEffect }  from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import QuillRead from '../components/QuillRead';
import { CiBoxList } from "react-icons/ci";

const PostDetail: React.FC = () => {
    const { category, section, id } = useParams(); 
    const [post, setPost] = useState<Post[]>();
    const navigate = useNavigate();

    useEffect(() => {
        fetchData();
    }, []);

    const handleNavigate = () => {
        // '/'부터 시작하면 절대경로임
        navigate(`/${category}/${section}/1`) 
    }

    const fetchData = async () => {
        try { 
            console.log(`http://localhost:8000/api/blog/post/?id=${id}`)
            const response = await axios.get<Post>(`http://localhost:8000/api/blog/post/?id=${id}`)
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
                    <button className='float-right text-xs bg-blue-200 font-semibold mx-2' onClick={handleNavigate}><CiBoxList class="inline"/>게시판</button>
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