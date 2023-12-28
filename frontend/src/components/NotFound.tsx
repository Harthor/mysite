import React from 'react'
import { useLocation } from 'react-router'
import { useNavigate } from 'react-router-dom'

const NotFound = () => {
    const location = useLocation();
    const navigate = useNavigate();
  
    const handleNavigate = () => {
        navigate(-1);
    }
  return (
    <div>
        <h1>존재하지 않는 경로입니다.</h1>
        <p>요청 경로 : {location.pathname}</p>
        <button onClick={handleNavigate}>돌아가기</button>
    </div>
  )
}

export default NotFound