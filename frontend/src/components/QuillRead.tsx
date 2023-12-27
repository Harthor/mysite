import ReactQuill from "react-quill"


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
    <div className='container p-4'>
        <ReactQuill modules = {modules} value = {textArea} readOnly = {true} />
    </div>
    )
}

export default QuillRead