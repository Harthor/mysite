import React from 'react'
import { PiBookOpenTextBold, PiGameControllerFill } from 'react-icons/pi'
import { Link } from 'react-router-dom'

const WorkNavbar: React.FC =  () => {

  return (
    <div className="sticky top-0 z-40 w-screen transition-colors bg-sky-900 lg:z-50 lg:border-b lg:border-slate-900/10  supports-backdrop-blur:bg-white/95">
        <div className="max-w-8xl mx-auto">
            <div className="py-4 border-b border-slate-900/10 mx-4 lg:px-8 lg:border-0 lg:mx-0">
                {/* 메뉴 각 아이템 구성 바 */}
                <div className="relative flex items-center">
                        <Link className="relative mr-5" to='/work'><PiBookOpenTextBold className="overflow:hidden w-auto" color='white' size='36' /></Link>
                        <div className="relative flex items-center ml-auto">
                            <nav className="text-md leading-6 font-semibold text-slate-700 dark:text-slate-200">
                                <ul className="flex space-x-8">
                                    {[['Info', '/work/info'], ['Projects', '/work/projects'], ['Study', '/work/study/1']]
                                    .map(([title, url]) => (
                                        <li className="hover:text-sky-300">
                                        <Link className="nav-link text-white" to={url}>{title}</Link>
                                        </li>
                                    ))}
                                </ul>
                            </nav>
                            <div className="flex color-gray items-center border-l border-slate-200 ml-6 pl-6">
                                <Link to='/hobby'>
                                    <button className="flex bg-red-900 hover:bg-red-500">
                                        <PiGameControllerFill color="white" />
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
