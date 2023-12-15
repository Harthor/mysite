import ReactQuill from 'react-quill'
import 'react-quill/dist/quill.snow.css';

type QuillEditorProps = {
    value: string;
    onChange: (value: string) => void;
}

const QuillEditor: React.FC<QuillEditorProps> = ({ value, onChange }) => {

    return (
        <ReactQuill
        theme = 'snow'
        value={value}
        onChange={(content, delta, source, editor) => onChange(content)}
        />
    )
}


export default QuillEditor;