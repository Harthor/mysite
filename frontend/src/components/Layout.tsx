import React from 'react'
import { Outlet } from 'react-router'
import Navbar from './Navbar'

const Layout: React.FC = () => {

  return (
    <div className="flex flex-col">
      <Navbar />
      <div className="flex flex-row h-screen">
        {/* 메뉴 바 */}
        {/* 본문 */}
        <div className='flex-none w-1/8 lg:hidden'>
        </div>
        <div className='flex-auto w-6/8'>
          <Outlet />
        </div>
        <div className='flex-none w-1/8 md:hidden'>

        </div>
      </div>
    </div>
  );
};

export default Layout;
