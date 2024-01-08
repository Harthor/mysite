import React from 'react'
import { Outlet } from 'react-router'
import Navbar from './Navbar'

const Layout: React.FC = () => {

  return (
    <div className="flex flex-col">
      {/* 현재 h = 15 차지 */}
      <Navbar className="absolute top-0 left-0 w-full" /> 
      <div className="flex flex-row space-x-5 w-full mt-4 h-full bg-gray-50">
        {/* 본문 */}
        <div className="lg:w-1/8">
          <h1>카테고리 진열장</h1>
        </div>
        <div className='flex-grow md:w-3/4'>
          <Outlet />
        </div>
        <div className="md:w-1/8"><h1>아카이브 진열장?</h1></div>
      </div>
    </div>
  );
};

export default Layout;
