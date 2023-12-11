import React, { useState, useEffect } from 'react';
import axios from 'axios';

type Post = {
  id: number;
  title: string;
  category: string;
  subcategory: string;
  content: string;
  author: string;
  created_at: string;
}

const WorkStudy: React.FC = () => {

  const [posts, setPosts] = useState<Post[]>([]);

  useEffect(() => {
    fetchData();
  }, [])

  const fetchData = async () => {
    try {
      const response = await axios.get<[Post[]]>('http://localhost:8000/api/blog/')
      console.log(response.data)
      setPosts(response.data);
    } catch (e) {
      alert(`현재 ${e} 에러 발생 중`)
      
    }
  }

  return (
    <div className="flex my-3">
      <div className="md:w-1/4 md:flex-none">
        <h1>영역 1</h1>
      </div>
      <div className='flex-1 px-4'>
        <ul>
          {posts.map((post: Post) => (
            <li className = "my-2 border-b"
            key={post.id}>
              {post.title}
            </li>
            
          )
          )}
        </ul>
      </div>
      <div className="md:w-1/4 md:flex-none">
        <h1>영역 3</h1>
      </div>
    </div>
  )
}

export default WorkStudy