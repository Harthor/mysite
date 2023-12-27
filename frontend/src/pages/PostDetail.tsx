import React, { useState, useEffect }  from 'react';
import { useParams,  } from 'react-router-dom';
import axios from 'axios';
import QuillRead from '../components/QuillRead';

// type Post = {
//     id: string;
//     author: string;
//     category: string;
//     subcategory: string;
//     title: string;
//     slug: string;
//     content: string;
//     created_at: Date;
// }

const PostDetail: React.FC = () => {
    const { id } = useParams(); 
    const [post, setPost] = useState<Post[]>();

    useEffect(() => {
        fetchData();
    }, []);

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
        <div className="max-w-2xl mx-auto mt-8 p-4">
            {post ? (
                <>
                <div>
                    <p className="text-gray-500 text-l float-left">{post.subsection}</p>
                    <p className="text-2xl font-bold mb-4">{post.title}</p>
                    <p className='text-gray-600 text-sm mb-4 float-right'>{post.created_at}</p>
                </div>
                 <br />
                <div>
                    <QuillRead htmlContent = {post?.content}/>
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