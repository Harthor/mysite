import ReactQuill from "react-quill"
import 'react-quill/dist/quill.snow.css';

const QuillRead = ( { htmlContent }) => {

    const decodeHtml = (html: string): string => {
        const area = document.createElement('textarea');
        area.innerHTML = html;
        return area.value;
    }

    const textArea = decodeHtml(htmlContent);

    const modules = {
        toolbar: false
    }

    return (
    <div>
        <ReactQuill 
        modules={modules} 
        value={textArea} 
        readOnly={true} 
        theme='snow'
        />
    </div>
    )
}

export default QuillRead