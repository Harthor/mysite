import React, { useEffect, memo, useCallback, useState } from 'react'
import ReactQuill, { Quill }from 'react-quill';
import axios from 'axios'

import hljs from 'highlight.js';
import 'highlight.js/styles/github.css'; 

import debounce from 'lodash/debounce';

import 'react-quill/dist/quill.snow.css';

hljs.configure({
    languages: ['jsx', 'tsx', 'python', 'sql', 'csharp', 'cpp', 'html', 'css']
})

const QuillEditor: React.FC = memo(({ content, setContent, backend, quillRef, isReadOnly }) => {
    const [selectedLanguage, setSelectedLanguage] = useState('');
    const languageMap = {
        javascript: ['js', 'jsx', 'javascript'],
        typescript: ['ts', 'tsx', 'typescript'],
    }
    const [backtickCount, setBacktickCount] = useState(0);
    const [cursorPosition, setCursorPosition] = useState(0);

    // languageMap 배열에서 모든 값(배열) 추출 -> 1개의 배열로 변환(flat) -> |으로 하나의 문자열로 만듦
    // 즉 languageMap의 모든 값을 추출해 | 형태로 이은 거임 : js|jsx|javascript|...
    const languageRegex = new RegExp(`\`\`\`(${Object.values(languageMap).flat().join('|')})`, 'i');



    // 인풋 내용 : 전체 HTML, 마지막 편집에 의한 변화를 나타내는 객체, 이벤트의 원인, Quill 에디터의 인스턴스
    const handleChange = (content, delta, source, editor) => {

        
  
        // ` 입력 체크(코드 블럭 생성에 사용)
        if ( delta.ops.length === 1 && delta.ops[0].insert === '`') {
            setBacktickCount(backtickCount + 1);
        } else if ( delta.ops.length > 1 && delta.ops[1].insert === '`') {
            setBacktickCount(backtickCount + 1);
        } else {
            setBacktickCount(0);
        }

        if (editor.getSelection()) {
            setCursorPosition(editor.getSelection().index);
        }

        setContent(content);
      };


    useEffect(() => {
        console.log('cursorposition : ', cursorPosition)

    if (backtickCount === 3) {

        setContent(content + '\n```')
        setBacktickCount(0);
    }
    }, [backtickCount, content]);

    useEffect(() => {

        const textBeforeCursor = content.substring(0, cursorPosition);
        const match = textBeforeCursor.match(languageRegex);
        console.log("content : ", content)
        console.log("match : ", match)
        
    }, [content, cursorPosition])

    const uploadImage = useCallback(async (formData: FormData): Promise<string | null> => {
        try {
            const uploadUrl = `${backend}/api/image/upload/`;
            const response = await axios.post(uploadUrl, formData);

            if (response.status == 201) {

                return response

            } else {

                return null;
            }

        } catch (e) { 
            console.error('Error', e.message)

            return null;
        }
    }, [backend]) // backend가 바뀌지 않는 이상 새로 생성될 필요 x

    // 툴바 image 아이콘에서 작동하는 핸들러
    const imageHandler = useCallback(() => {
        const formData = new FormData();

        // 이미지 선택 상자
        const input = document.createElement('input');
        input.setAttribute('type', 'file');
        input.setAttribute('accept', 'image/*');
        input.setAttribute('name', 'image');
        input.click()

        // 이미지 선택 시 실행되는 콜백 함수
        input.onchange = async () => {
            const file = input.files[0];
            formData.append('image', file); // formData에 이미지 추가
            
            const response = await uploadImage(formData); // 비동기 호출
            const imageUrl = `${backend}` + response?.data.imageUrl;

             // ReactQuill 노드에 대한 메서드 호출을 위해 Ref가 필요하다
             // getEditor() : 편집기를 지원하는 Quill 인스턴스를 반환
             if (imageUrl) {
                setContent((prevContent) => `${prevContent}<p><img src="${imageUrl}" alt="image" /></p>`);
                }
             }

        },  [backend, quillRef]);


    // Quill에 추가하는 기능들
    // useMemo는 의존성 배열이 바뀌지 않는 한, 이전에 계산된 값을 사용함
    const modules = {
            toolbar: {
                container : [
                    [{ 'header': [1, 2, 3, false]}],
                    ['bold', 'underline', 'blockquote'],
                    [{'color' : []}, {'background' : []}],
                    ['link', 'image', 'video'],
                    ],
                handlers: {
                    'image': imageHandler,
                    // 'code-block' : handleCodeBlock
                }
            },
        }

    // 에디터에서 허용하는 컨텐츠 형식
    const formats = [
        'header', 'font', 'size',
        'bold', 'underline', 'blockquote', 'code-block',
        'list', 'bullet', 'indent',
        'color', 'background',
        'link', 'image', 'video',
    ]

    const compressImage = async (file) => {
        return new Promise((resolve, reject) => {
            const reader = new FileReader();

            reader.onload = (event) => {
                const img = new Image();

                img.onload = () => {
                    const canvas = document.createElement('canvas');
                    const ctx =  canvas.getContext('2d');

                    canvas.width = img.width;
                    canvas.height = img.height;
                    ctx.drawImage(img, 0, 0, img.width, img.height);

                    canvas.toBlob(
                        (blob) => {
                            resolve(blob);
                        },
                        file.type,
                        0.7 // 품질 (70%)
                    )
                };

                img.src = event?.target.result;
            }
            
            reader.readAsDataURL(file);
        })
    }

    // useEffect(() => {
    //     if (quillRef.current) {
    //         const editor = quillRef.current.getEditor();
            
    //         // 타이핑 완료 후에만 하이라이팅을 적용하는 debounce를 이용한다.
    //         // innerHTML은 렌더링을 다시 하게 하고, 커서 위치가 초기화되는 문제가 있음
    //         const debouncedHighlight = debounce(() => {
    //             const htmlContent = editor.root.innerHTML;
    //             document.querySelectorAll('pre.ql-syntax').forEach((block) => {
    //                 const code = block.textContent;
    //                 const result = hljs.highlightAuto(code)

    //                 block.innerHTML = `<span className="langauge-label float-right">${result.language}</span>
    //                 ${result.value}`;
                    
    //             })
    //             setContent(htmlContent);
    //         }, 2000);
            
    //         editor.on('text-change', debouncedHighlight);
    //     }
    // }, [quillRef, setContent])

    return (
        <div className='full-height-container'>
            <ReactQuill
            ref = {quillRef}
            theme = 'snow'
            modules = {modules}
            formats = {formats}
            value={content}
            onChange={handleChange}
            />
        </div>
    )
}
)


export default QuillEditor;