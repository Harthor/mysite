import React, { useState } from 'react'
import { PiBookOpenTextBold, PiGameControllerFill } from 'react-icons/pi'
// import { Link } from 'react-router-dom'

const Navbar: React.FC =  () => {
    const [menuWork, setMenuWork] = useState<boolean>(false);

  return (
    <div className="sticky top-0 z-40 w-full flex-none transition-colors duration-500 lg:z-50 lg:border-b lg:border-slate-900/10 dark:border-slate-50/[0.06] bg-sky-900 supports-backdrop-blur:bg-white/95 dark:bg-slate-900/7">
        <div className="max-w-8xl mx-auto">
            <div className="py-4 border-b border-slate-900/10 lg:px-8 lg:border-0 dark:border-slate-300/10 mx-4 lg:mx-0">
                <div className="relative flex items-center">
                    { menuWork === false ? 
                    <PiBookOpenTextBold className="flex-none overflow:hidden md:w-auto" color='white' size='24' /> : 
                    <PiGameControllerFill className="flex-none overflow:hidden md:w-auto" color='white' size='24'/>}
                    <div className="realative hidden lg:flex items-center ml-auto">
                        <nav className="text-sm leading-6 font-semibold text-slate-700 dark:text-slate-200">
                            <ul className="flex text-white space-x-8">
                                <li className='hover:text-sky-300'>Info</li>
                                <li className='hover:text-sky-300'>Projects</li>
                                <li className='hover:text-sky-300'>Posts</li>
                            </ul>
                        </nav>
                        <div className="flex color-gray items-center border-l border-slate-200 ml-6 pl-6">
                            <button className="flex"
                                    onClick={() => { setMenuWork(!menuWork) }}>
                                            { menuWork === false ? <PiBookOpenTextBold />: <PiGameControllerFill />}
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div> 
    </div>
  )
}

export default Navbar
// {/* <div className="relative">

// </div>
// <nav className="text-sm leading-6 font-semi-bold text-slate-700">
// <div className="relative">
//     <ul className="flex space-x-8">

//     </ul>
// </div>
// </nav> */}

                    //     <div className="flex-none">
                    //     </div>
                    // <div className='flex justify-between gap-2'>


                    // </div>
