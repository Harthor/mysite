import React from 'react'
import { Outlet } from 'react-router'
import Navbar from './Navbar'

const Layout: React.FC = () => {

  return (
    <div className="flex flex-col">
      {/* 현재 h = 15 차지 */}
      <Navbar className="absolute top-0 left-0 w-full" /> 
      <div className="flex flex-row h-screen mt-4">
        {/* 본문 */}
        <div className='flex-none w-1/8 lg:hidden'>
          ?
        </div>
        <div className='flex-grow w-6/8'>
          <Outlet />
        </div>
        <div className='flex-none w-1/8 md:hidden'>
          ?
        </div>
      </div>
    </div>
  );
};

export default Layout;
