import ReactQuill from "react-quill";
import 'react-quill/dist/quill.snow.css';

const Editor = ({ value, onChange }) => {
  return (
    <ReactQuill value={value} onChange={onChange} modules={{ toolbar: true}} formats={['bold', 'italic', 'underline', 'list']} />
  )
}

export default Editor 