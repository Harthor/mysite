import React, { useState, useEffect }  from 'react';
import { useParams,  } from 'react-router-dom';
import axios from 'axios';

type Post = {
    id: string;
    author: string;
    category: string;
    subcategory: string;
    title: string;
    slug: string;
    content: string;
    created_at: string;
}

const PostDetail: React.FC = () => {
    const { id } = useParams(); 
    const [post, setPost] = useState<Post[]>();

    useEffect(() => {
        fetchData();
    }, [id]);

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
        <div>
            <h2>PostDetail</h2>
            <p>Post: {post?.id}</p>
        </div>
    )
}

export default PostDetail