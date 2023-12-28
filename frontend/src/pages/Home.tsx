import React from 'react'
import { useParams } from 'react-router-dom'

const Home = () => {
    const { category } = useParams()
  return (
    <div> 
      <h1> {category} Home</h1>
    </div>
  )
}

export default Home