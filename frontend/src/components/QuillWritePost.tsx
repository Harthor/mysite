import React, { useState } from 'react'
import QuillEditor from './QuillEditor'

type WritePostformProps = {
    onSave: (data: {title: string; subcategory: string; content: string;}) => void;
}

const QuillWritePost: React.FC<WritePostformProps> = ({ onSave })=> {
    const [title, setTitle] = useState('')
    const [subcategory, setSubcategory] = useState('')
    const [content, setContent] = useState('');

    const handleContentChange = ( value: string ) => {
        setContent(value);
    }

    const handleSave = () => {
        onSave({ title, subcategory, content })
    }

  return (
    <div>
        <div>
            <label >Title : </label>
            <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} />
        </div>
        <div>
            <label >Subcategory : </label>
            <input type="text" value={subcategory} onChange={(e) => setSubcategory(e.target.value)} />
        </div>
        <div>
            <label >Content : </label>
            <QuillEditor value={content} onChange={handleContentChange} />
        </div>
        <button onClick={() => handleSave}>Save</button>
    </div>
  )
}

export default QuillWritePost