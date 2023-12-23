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

    const handleSubsectionChange = (e) => {
        setSubsection(e.target.value);
    }

    // section(게시판)에 따라 subsection 불러오기
    const fetchSubsections = async () => {
        try {
          const response = await axios.get(backend + `/api/blog/subsection?section=${section}`);
          setSubsections(response.data.subsection);
        } catch (e) {
          setIsAddingNewSubsection(true);
        }
      }

    // subsection이 없는 경우 등록
    const addSubsection = async () => {
        try {
        const formData = new FormData();
        formData.append('subsection', subsection)
        formData.append('section', section)

        const response = await axios.post(backend + `/api/blog/subsection/create`, formData);
        if (response.status === 201) {
            console.log('소분류가 성공적으로 생성되었습니다.');
            setSubsections((prevSubSections) => [...prevSubSections, subsection]);
        } else {
            console.log('소분류 생성 실패');
        }
        } catch (e) {
            console.log(`addSubsection 에러 발생 - ${e}`)
        }
    }

    const validateInputEmpty = (title, subsection, content) => {
        if (title === "" || subsection === "" || content === "") {
            throw new Error(alert("제목, 소분류, 내용 모든 값이 채워져야 합니다."))
        }
    }

    // 작성된 글 저장하기
    const handleSubmit = async () => {
        try {
            
            const formData = new FormData();
            validateInputEmpty(title, subsection, content)

            // subsection이 새로운 값이라면 백엔드에 추가
            if ( !subsections.some(item => item.name === subsection) ) {
                addSubsection();
            }

            formData.append('title', title);
            formData.append('subsection', subsection);
            formData.append('content', content);
            formData.append('category', category);
            formData.append('section', section);

            
            console.log("요청 위치 : ", backend + '/api/blog/post/create')

            const response = await axios.post(backend + '/api/blog/post/create', formData)

            console.log(response)

            if (response.status === 201) {
                console.log('글이 성공적으로 생성되었습니다.');
            } else {
                console.error('글 생성에 실패했습니다.');
            } 
        } catch (e) { 
            console.error('에러 발생 : ', e)
        }
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

        <div className='flex-1 w-full mt-4'>
            <label>본문</label>
            <QuillEditor content={content} setContent = {setContent} backend={backend} quillRef={quillRef} />
        </div>

        <button onClick={handleSubmit}>Submit</button>
    </div>
  )
}

export default QuillWritePost