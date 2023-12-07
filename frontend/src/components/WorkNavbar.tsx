import React, { useState } from 'react'
import { PiBookOpenTextBold, PiGameControllerFill } from 'react-icons/pi'
import { Link } from 'react-router-dom'

const WorkNavbar: React.FC =  () => {
    const [menuWork, setMenuWork] = useState<boolean>(true);

  return (
    <div className="top-0 z-40 w-screen flex-none transition-colors lg:z-50 lg:border-b lg:border-slate-900/10 bg-sky-900 supports-backdrop-blur:bg-white/95">
        <div className="max-w-8xl mx-auto">
            <div className="py-4 border-b border-slate-900/10 lg:px-8 lg:border-0 dark:border-slate-300/10 mx-4 lg:mx-0">
                <div className="relative flex items-center">
                        <Link className="relative flex mr-5" to='/work'><PiBookOpenTextBold className="flex-none overflow:hidden md:w-auto" color='white' size='36' /></Link>
                        <div className="relative hidden lg:flex items-center ml-auto">
                            <nav className="text-md leading-6 font-semibold text-slate-700 dark:text-slate-200">
                                <ul className="flex space-x-8">
                                    <li className='hover:text-sky-300'>
                                        <Link className="nav-link text-white" to='/work/info'>Info</Link>
                                    </li>
                                    <li className='hover:text-sky-300'>
                                        <Link className="nav-link text-white" to='/work/projects'>Projects</Link>
                                    </li>
                                    <li className='hover:text-sky-300'>
                                        <Link className="nav-link text-white" to='/work/study'>Study</Link>
                                    </li>
                                </ul>
                            </nav>
                            <div className="flex color-gray items-center border-l border-slate-200 ml-6 pl-6">
                                <Link to='/hobby'>
                                    <button className="flex">
                                        <PiGameControllerFill color="black" />
                                    </button>
                                </Link>
                            </div>
                    </div>
                </div>
            </div>
        </div> 
    </div>
  )
}

export default WorkNavbar
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
