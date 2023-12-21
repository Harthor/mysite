import React, { useState, useEffect, useRef } from 'react'
import { useParams } from 'react-router-dom'
import axios from 'axios'
import QuillEditor from './QuillEditor'

// type PostData = {
//     title: string;
//     category: string;
//     section: string;
//     subsection: string;
//     content: string;
//     images: string[]; 
// }

const QuillWritePost: React.FC = ()=> {
    const [title, setTitle] = useState('')
    const [subsections, setSubsections] = useState([])
    const [subsection, setSubsection] = useState('');
    const [content, setContent] = useState('');
    const { category, section } = useParams()
    const [isAddingNewSubsection, setIsAddingNewSubsection] = useState(false);
    const quillRef = useRef(null);
    const backend = 'http://localhost:8000';

    // 자식 컴포넌트인 QuillEditor에 작성된 내용을 부모 컴포넌트에 가져옴
    const handleContentChange = ( newContent : string ) => {
        setContent(newContent);
    }

    // const handleImageUpload = (event) => {
    //     const file = event.target.files[0];

    //     const reader = new FileReader();
    //     reader.onloadend = () => {
    //         setImages([...images, reader.result]);
    //     };
    //     reader.readAsDataURL(file);
    // }

    const handleSubsectionChange = (e) => {
        setSubsection(e.target.value);
    }

    // section에 따라 subsection 불러오는 기능
    const fetchSubsections = async () => {
        try {
          const response = await axios.get(backend + `/api/blog/subsection?section=${section}`);
          setSubsections(response.data.subsection);
        } catch (e) {
          alert(`현재 ${e} 에러 발생 중`);
        }
      }

    // 작성된 글 저장하기
    const handleSubmit = async () => {
        try {
            console.log('title : ', title)
            console.log('subsection : ', subsection)
            console.log('content : ', content)
            // const formData = new FormData();
            // formData.append('title', title);
            // formData.append('subsection', selectedSubSection);
            // formData.append('content', content);
            
            // console.log('Images : ', images);
            // images.forEach((image, index) => {
            //     const blob = dataURItoBlob(image);
            //     formData.append(`image${index + 1}`, blob, `image${index + 1}.png`)
            // })

            // console.log(formData)

            // const response = await fetch(backend + 'api/blog/post/create', {
            //     method: "POST",
            //     body: formData,
            // })

            // console.log(response)

        //     if (response.ok) {
        //         console.log('글이 성공적으로 생성되었습니다.');
        //     } else {
        //         console.error('글 생성에 실패했습니다.');
        //     } 
        } catch (e) { 
            console.error('에러 발생 : ', e)
        }
    } 

    // QuillEditor에 삽입된 이미지를 base64 URI로 추출,
    // 추출된 이미지를 파일로 변환해 FormData를 사용해 다른 문자열들과 함께 백엔드로 전송한다.
    const dataURItoBlob = (dataURI) => {
        const byteString = atob(dataURI.split(',')[1]);
        const mimeString = dataURI.split(',')[0].split(':')[1].split(';')[0];

        const ab = new ArrayBuffer(byteString.length);
        const ia = new Uint8Array(ab);

        for (let i=0; i < byteString.length; i++) {
            ia[i] = byteString.charCodeAt(i);
        }

        return new Blob([ab], { type: mimeString });
    }

    useEffect(() => {
        fetchSubsections();
        // 가져온 1번째 subsection을 기본 subsection으로 지정함
    }, [])

    useEffect(() => {
        if (subsections.length > 0) {
            setSubsection(subsections[0].name);
        }
    }, [subsections])



  return (
    <div className='flex flex-col border border-black p-2'>

        <div className='flex flex-row flex-1'>
            <div className='w-1/6 text-xs'>
                <label>소분류</label>
                <br />
                { isAddingNewSubsection ? 
                    <input type="text" value={subsection} 
                    className="text-bold border border-gray w-5/6 p-1"
                    onChange={handleSubsectionChange} 
                    placeholder='새로운 소분류 등록'/> :
                    <select value= {subsection} 
                    onChange = {handleSubsectionChange}
                    className = 'border border-gray-300 rounded w-5/6 p-1'>
                        <option disabled>소분류를 고르시오</option>
                        {subsections.map((subsection) => (
                            <option key={subsection.id} value={subsection.name}>
                                {subsection.name}
                            </option>
                    ))}
                </select>
                }
                <button className="pl-1 float-r text-xs"
                onClick={() => setIsAddingNewSubsection(!isAddingNewSubsection)}>
                    {isAddingNewSubsection ? "선택하기" : "직접 입력"}
                </button>   
            </div>
            <div className='w-5/6 text-xs'>
                <label >제목</label>
                <br />
                <input type="text" value={title} className="border border-gray w-full p-1" 
                onChange={(e) => setTitle(e.target.value)} />
            </div>
        </div>

        {/* <div className='flex-1'>
            <label >소분류</label>
            <br />
            { isAddingNewSubsection ? 
            <input type="text" value={subsection} 
            className="mt-1 p-2 border border-gray w-5/6"
            onChange={handleSubsectionChange} 
            placeholder='새로운 소분류 등록'/> :
            <select value= {subsection} 
            onChange = {handleSubsectionChange}
            className = 'mt-1 p-2 border border-gray-300 rounded w-5/6'>
                <option disabled>소분류를 고르시오</option>
                {subsections.map((subsection) => (
                    <option key={subsection.id} value={subsection.name}>
                        {subsection.name}
                    </option>
                ))}
            </select>
            }
            <button className="pl-1 float-r text-xs w-1/6"
            onClick={() => setIsAddingNewSubsection(!isAddingNewSubsection)}>
                {isAddingNewSubsection ? "선택하기" : "직접 입력"}
            </button>   
        </div> */}

        <div className='flex-1 w-full mt-4'>
            <label>본문</label>
            <QuillEditor content={content} setContent = {setContent} backend={backend} quillRef={quillRef} />
        </div>

        <button onClick={handleSubmit}>Submit</button>
    </div>
  )
}

export default QuillWritePost