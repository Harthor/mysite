import ReactQuill from "react-quill"
import 'react-quill/dist/quill.snow.css';
import hljs from 'highlight.js'

const QuillRead = ( { htmlContent }) => {

    const decodeHtml = (html: string): string => {
        const area = document.createElement('textarea');
        area.innerHTML = html;
        return area.value;
    }

    const highlightWithLanguageDetection = (text) => {
        const result = hljs.highlightAuto(text);
        return {
          value: result.value, // 강조된 코드
          language: result.language // 감지된 언어
        };
      }
    
    const textArea = decodeHtml(htmlContent);

    const modules = {
        toolbar: false,
        syntax: {
            highlight: text => hljs.highlightAuto(text).value
          },
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