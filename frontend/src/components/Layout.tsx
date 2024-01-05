import React from 'react'
import { Outlet } from 'react-router'
import Navbar from './Navbar'

const Layout: React.FC = () => {

  return (
    <div className="flex flex-col bg-gray-50">
      {/* 현재 h = 15 차지 */}
      <Navbar className="absolute top-0 left-0 w-full" /> 
      <div className="flex flex-row h-screen mt-4">
        {/* 본문 */}
        <div className="lg:w-1/8"></div>
        <div className='flex-grow md:w-3/4'>
          <Outlet />
        </div>
        <div className="md:w-1/8"></div>
      </div>
    </div>
  );
};

export default Layout;
