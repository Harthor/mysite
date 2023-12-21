import 'highlight.js/styles/monokai-sublime.min.css'
import ReactQuill from 'react-quill'
import React, { useRef, useState, useMemo, memo, useCallback } from 'react'
import axios from 'axios'
import 'react-quill/dist/quill.snow.css';


// content, onChange는 부모 컴포넌트에서 정의되어 전달됨
// memo : 
const QuillEditor: React.FC = memo(({ content, setContent, backend, quillRef }) => {
    

    const uploadImage = useCallback(async (formData: FormData): Promise<string | null> => {
        try {
            const uploadUrl = `${backend}/api/image/upload/`;
            const response = await axios.post(uploadUrl, formData);

            if (response.status == 201) {
                console.log('successful', response.data);
                return response

            } else {
                console.log('failed', response.statusText);

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
            console.log(response)
            const imageUrl = `${backend}` + response?.data.imageUrl;
            console.log(imageUrl)
             // ReactQuill 노드에 대한 메서드 호출을 위해 Ref가 필요하다
             // getEditor() : 편집기를 지원하는 Quill 인스턴스를 반환
             if (imageUrl) {
                setContent((prevContent) => `${prevContent}<p><img src="${imageUrl}" alt="image" /></p>`);
                }
             }

        },  [backend, quillRef]);



    // Quill에 추가하는 기능들
    const modules = useMemo(() => ({
        toolbar: {
            container : [
                [{ 'header': [1, 2, 3, false]}],
                ['bold', 'underline', 'blockquote', 'code-block'],
                [{'color' : []}, {'background' : []}, {'align' : []}],
                ['link', 'image', 'video'],
                ],
            handlers: {
                'image': imageHandler,
            }
        },
    }), [imageHandler]);
    
    // 에디터에서 허용하는 컨텐츠 형식
    const formats = [
        'header', 'font', 'size',
        'bold', 'underline', 'blockquote', 'code-block',
        'list', 'bullet', 'indent',
        'link', 'image'
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




    return (
        <ReactQuill
        ref = {quillRef}
        theme = 'snow'
        modules = {modules}
        formats = {formats}
        value={content}
        onChange={setContent}
        />
    )
}
)


export default QuillEditor;