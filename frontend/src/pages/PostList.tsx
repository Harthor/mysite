import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom';
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
    category: string;
}

const PostList: React.FC<PostListProps> = ({ category }) => {
    const [posts, setPosts] = useState<Post[]>([]);

    useEffect(() => {
        fetchData();
    }, [category]);

    const fetchData = async () => {
        try { 
            console.log(`http://localhost:8000/api/blog/?category=${category}`)
            const response = await axios.get<Post[]>(`http://localhost:8000/api/blog?category=${category}`)
            setPosts(response.data)
        } catch (e) {
            alert(`현재 ${e} 에러 발생 중`)
        }
    };

  return (
    <div>
        <h1>{category} 게시판</h1>
        <ul>
            {posts.map((post: Post) => (
                <li key={post.id}>
                    <Link to ={`post/${post.id}`}>
                        {post.title}
                    </Link>
                </li>
            ))}
        </ul>
    </div>
  )
}

export default PostList;