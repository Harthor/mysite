import React, { useState } from 'react'
import { useParams } from 'react-router-dom'
import QuillWritePost from '../components/QuillWritePost'

type Props = {}

const WritePost = () => {
    const [title, setTitle] = useState('');
    const [subcategory, setSubcategory] = useState('');
    const [content, setContent] = useState('')
    const handleEditorChange = (value: string) => {
        setContent(value);
    }

  return (
    <div>
        <h2>Write Post</h2>
        <QuillWritePost />
    </div>
  )
}

export default WritePost