import React, { useState, useEffect }  from 'react';
import { useParams,  } from 'react-router-dom';
import axios from 'axios';
import RichTextDisplay from '../components/RichTextDisplay';

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
        <div>
            <h1>제목 : {post?.title}</h1>
            <h2>대분류 : {post?.category}</h2>
            <h2>소분류 : {post?.subcategory}</h2>
            <h3>저자 : {post?.author.username}</h3>
            
            <RichTextDisplay htmlContent = {post?.content}/>
        </div>
    )
}

export default PostDetail