import React, { useState, useEffect, useRef } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import ReactQuill from 'react-quill'
import axios from 'axios'
import hljs from 'highlight.js'
import QuillEditor from '../components/QuillEditor'

const CreatePost: React.FC = ()=> {
    const [title, setTitle] = useState('')
    const [subsections, setSubsections] = useState([])
    const [subsection, setSubsection] = useState('');
    const [content, setContent] = useState('');
    const { category, section } = useParams()
    const [isAddingNewSubsection, setIsAddingNewSubsection] = useState(true);
    const quillRef = useRef<ReactQuill>(null);
    const backend = 'http://localhost:8000';
    const navigate = useNavigate();

    const handleSubsectionChange = (e) => {
        setSubsection(e.target.value);
    }

    // section(게시판)에 따라 subsection 불러오기
    const fetchSubsections = async () => {
        const response = await axios.get(backend + `/api/blog/subsection?section=${section}`);
        setSubsections(response.data.subsection);
      }

    const validateSubsection = (subsection: string) => {
        // 한국어, 일본어(유니코드) & 영어, 숫자만 2~16글자 입력 가능
        return /^[\uAC00-\uD7AF\u3040-\u30FF\u31F0-\u31FFa-zA-Z0-9]{2,16}$/.test(subsection)
    }

    // subsection이 없는 경우 등록
    const addSubsection = async () => {
        try {
          const formData = new FormData();

          if (isAddingNewSubsection && !validateSubsection(subsection)) {
            throw Error("소분류는 2글자 ~ 16글자의 한,일,영,숫자 입력 가능합니다.")
          }

          formData.append('subsection', subsection)
          formData.append('section', section)

          const response = await axios.post(backend + `/api/blog/subsection/create`, formData);
        if (response.status === 201) {
            setSubsections((prevSubSections) => [...prevSubSections, subsection]);
        } else {
           alert('소분류 생성 실패');
        }
        } catch (e) {
            alert(`addSubsection 에러 발생 - ${e.message}`)
        }
    }

    const validateTitle = (title) => {
        // 슬러그를 생성할 수 있는 제목인지 검사한다.
        const isValidSlug = title.match(/^[a-zA-Z가-힣0-9\s]*$/);
        return isValidSlug;
    }

    const validateInput = (title, subsection, content) => {
        console.log(title, subsection, content)

        validateTitle(title);

        if (title === "" || subsection === "" || content === "") {
            throw new Error("제목, 소분류, 내용이 모두 채워져야 함")
        }
    }

    // 작성된 글 저장하기
    const handleSubmit = async () => {
        try {

            const currentContent = quillRef.current?.getEditor().root.innerHTML;
            const parsedContent = currentContent.replace(/<[^>]*>/g, '').replace(/\s+/g, '');

            const formData = new FormData();
            
            validateInput(title, subsection, parsedContent)

            // subsection이 새로운 값이라면 백엔드에 추가
            // subsections가 빈 배열이라면 subsections.some은 false이다
            if ( !subsections.some(item => item.name === subsection) ) {
                addSubsection();
            }

            formData.append('title', title);
            formData.append('subsection', subsection);
            formData.append('content', currentContent);
            formData.append('category', category);
            formData.append('section', section);

            const response = await axios.post(backend + '/api/blog/post/create', formData)
          
            if (response.status === 201) {
                alert('글이 성공적으로 생성되었습니다.');
                navigate(`../${section}/1`)
            } else {
               alert('글 생성에 실패했습니다.');
            } 
        } catch (e) { 
            alert('handleSubmit 에러 발생 : ' + e.message)
        }
    } 


    useEffect(() => {
        fetchSubsections();
        // 가져온 1번째 subsection을 기본 subsection으로 지정함
    }, [])

    useEffect(() => {
        if (subsections && subsections.length > 0) {
            setSubsection(subsections[0].name);
            setIsAddingNewSubsection(false)
        }
    }, [subsections])

    useEffect(() => {
        setContent(content);
    }, [content]);



  return (
    <section className='text-gray-600 body-font'>
      <div className='container px-5 w-1/2 mx-auto'>
        <div className='flex flex-row flex-1/6'>
            <div className='w-1/6 text-xs'>
                <label>소분류</label>
                <br />
                { isAddingNewSubsection ? 
                    <input type="text" value={subsection} 
                    className="border border-gray rounded w-5/6 p-1"
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
                <button className="px-1 float-r text-xs"
                onClick={() => setIsAddingNewSubsection(!isAddingNewSubsection)}>
                    {isAddingNewSubsection ? "선택하기" : "직접입력"}
                </button>   
            </div>
            <div className='w-5/6 text-xs flex-5/6'>
                <label >제목</label>
                <br />
                <input type="text" value={title} className="border border-gray w-full p-1" 
                onChange={(e) => setTitle(e.target.value)} />
            </div>
        </div>

        <div className='flex-1 mt-4'>
            <label>본문</label>
            <QuillEditor content={content} setContent={setContent} backend={backend} quillRef={quillRef} />
        </div>
            
        <div className='flex-1 float-right mt-2'>
          <button className="bg-blue-600 text-white" onClick={handleSubmit}>Submit</button>
        </div>
      </div>
    </section>
  )
}

export default CreatePost