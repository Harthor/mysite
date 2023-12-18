import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import axios from 'axios'
import QuillEditor from './QuillEditor'

type WritePostformProps = {
    onSave: (data: {title: string; subsection: string; content: string;}) => void;
}

type SubSection = {
    id: number;
    section: string;
    subsection : string;
}

const QuillWritePost: React.FC<WritePostformProps> = ({ onSave })=> {
    const [title, setTitle] = useState('')
    const [subsections, setSubsections] = useState<SubSection[]>([])
    const [content, setContent] = useState('');
    const { category, section } = useParams()
    const [isAddingNewSubsection, setIsAddingNewSubsection] = useState(false);
    const [selectedSubSection, setSelectedSubSection] = useState('');

    const handleContentChange = ( value: string ) => {
        setContent(value);
    }

    const handleSave = () => {
        onSave({ title, subsections, content })
    }

    const handleSubSectionsChange = (e) => {
        setSelectedSubSection(e.target.value);
    }

    const fetchSubSections = async () => {
        try {
        // console.log(`http://localhost:8000/api/blog/subsection?section=${section}`)
        const response = await axios.get<SubSection[]>(`http://localhost:8000/api/blog/subsection?section=${section}`)
        setSubsections(response.data.subsection)
        } catch (e) {
            alert(`현재 ${e} 에러 발생 중`)
        }
    }

    useEffect(() => {
        fetchSubSections();
    }, [])

  return (
    <div className='flex flex-col'>
        <div className='flex-1'>
            <label >제목</label>
            <br />
            <input type="text" value={title} className="border border-gray text-xs w-full" 
            onChange={(e) => setTitle(e.target.value)} />
        </div>
        <div className='flex-1'>
            <label >소분류</label>

            <br />
            { isAddingNewSubsection ? 
            <input type="text" value={selectedSubSection} 
            className="mt-1 p-2 border border-gray text-xs w-5/6"
            onChange={handleSubSectionsChange} 
            placeholder='새로운 소분류 등록'/> :
            <select value= {selectedSubSection} 
            onChange = {handleSubSectionsChange}
            className = 'w-full p-2 border border-gray-300 rounded w-5/6'>
                <option value="" disabled>소분류를 고르시오</option>
                {subsections.map(subsection => (
                    <option key={subsection.id} value={subsection.name}>
                        {subsection.name}
                    </option>
                ))}
            </select>
            }
            <button className="float-r text-xs w-1/6"
            onClick={() => setIsAddingNewSubsection(!isAddingNewSubsection)}>
                {isAddingNewSubsection ? "고르기" : "새로 입력"}
            </button>   


            {/* <select value= {selectedSubSection} 
            onChange = {handleSubSectionsChange}
            className = 'w-full p-2 border border-gray-300 rounded'>
                <option value="" disabled>소분류를 고르시오</option>
                {subsections.map(subsection => (
                    <option key={subsection.id} value={subsection.name}>
                        {subsection.name}
                    </option>
                ))}
            </select>
            <input type="text" value={selectedSubSection} 
            className="mt-1 p-2 border border-gray text-xs w-full"
            onChange={handleSubSectionsChange} 
            placeholder='새로운 소분류 등록'/> */}
        </div>
        <div className='flex-1 w-full mt-4'>
            <label>본문</label>
            <QuillEditor value={content} onChange={handleContentChange} />
        </div>
        <button onClick={() => handleSave}>Save</button>
    </div>
  )
}

export default QuillWritePost