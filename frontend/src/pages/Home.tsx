import React from 'react'
import { useParams } from 'react-router-dom'

const Home = () => {
    const { subject } = useParams()
  return (
    <div> 
    <h1> {subject} Home</h1>
    </div>
  )
}

export default Home