import React, { useState } from 'react'


const Navbar: React.FC =  () => {
    const [menuWork, setMenuWork] = useState<boolean>(false);

  return (
    <nav className='bg-gray-800'>
        <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
            <div className="relative flex h-16 items-center justify-between">
                <div className="flex flex-1 items-center justify-center sm:items-stretch sm:justify-start">
                    {/* 로고 블럭 */}
                    <div className="flex flex-shrink-0 items-center">
                        <img src="" alt="image" />
                    </div>
                    {/* 링크 블럭 */}
                    <div className="hidden sm:ml-6 sm:block">
                        <div className="flex space-x-4">
                            <a href="#" className="bg-gray-900 text-white rounded-md px-3 py-2 text-sm font-medium" aria-current="page">About Me</a>
                            <a href="#" className="text-gray-300 hover:bg-gray-700 hover:text-white rounded-md px-3 py-2 text-sm font-medium">Projects</a>
                            <a href="#" className="text-gray-300 hover:bg-gray-700 hover:text-white rounded-md px-3 py-2 text-sm font-medium">Study</a>
                        </div>
                    </div>
                    {/* 토글 버튼 블럭 */}
                    <div>
                        <button className="p-1 focus:outline-none"
                        onClick = {() => setMenuWork(!menuWork)}>{menuWork ? "Work" : "Hobby"}</button>
                    </div>
                </div>

            </div>
        </div>

    </nav>
  )
}

export default Navbar