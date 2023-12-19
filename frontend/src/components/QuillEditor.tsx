import 'highlight.js/styles/monokai-sublime.min.css'
import ReactQuill from 'react-quill'
import React, {useState, useEffect} from 'react'
import 'react-quill/dist/quill.snow.css';


const QuillEditor: React.FC = ({ content, setContent }) => {
    
    // Quill에 추가하는 기능들
    const modules = {
        toolbar: [
            [{ 'header': [1, 2, 3, false]}],
            ['bold', 'underline', 'blockquote', 'code-block'],
            [{'color' : []}, {'background' : []}, {'align' : []}],
            ['link', 'image', 'video'],
        ],
    }

    const handleChange = (value) => {
        setContent(value);
    }


    return (
        <ReactQuill
        theme = 'snow'
        modules = {modules}
        value={content}
        onChange={handleChange}
        />
    )
}


export default QuillEditor;