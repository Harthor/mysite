import React from 'react'
import { useLocation } from 'react-router'

const NotFound = () => {
    const location = useLocation();
  return (
    <div>
        <h1>존재하지 않는 경로입니다.</h1>
        <p>요청 경로 : {location.pathname}</p>
    </div>
  )
}

export default NotFound