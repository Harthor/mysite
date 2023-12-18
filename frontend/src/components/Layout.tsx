import React from 'react'
import { useParams } from 'react-router-dom'
import { Outlet } from 'react-router'
import WorkNavbar from './WorkNavbar'
import HobbyNavbar from './HobbyNavbar'

const Layout = () => {
    const { category } = useParams();

    return (
        <div className='flex flex-col h-screen'>
            {/* Navbar 부분 */}
            <div className='flex-none'>
                { category === 'work' ? <WorkNavbar /> : <HobbyNavbar />}
            </div>
            {/* 본문 부분 */}
            <div className='flex flex-1 mx-3 my-3'>
                <div className='w-1/4'></div>
                <div className='w-1/2'><Outlet /></div>
                <div className='w-1/4'></div>
            </div>
        </div>
    )
}

export default Layout