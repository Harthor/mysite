import React, { useState } from 'react'
import { PiBookOpenTextBold, PiGameController, PiGameControllerFill } from 'react-icons/pi'
import { Link } from 'react-router-dom'

const HobbyNavbar: React.FC =  () => {

  return (
    <div className="top-0 z-40 w-screen flex-none transition-colors duration-500 lg:z-50 lg:border-b bg-red-900 supports-backdrop-blur:bg-black/95">
        <div className="max-w-8xl mx-auto">
            <div className="py-4 border-b border-slate-900/10 lg:px-8 lg:border-0 dark:border-slate-300/10 mx-4 lg:mx-0">
                        <div className="relative flex items-center">
                                <Link className="relative flex mr-5" to='/hobby'><PiGameControllerFill className="flex-none overflow:hidden md:w-auto" color='white' size='36' /></Link>
                                <div className="relative hidden lg:flex items-center ml-auto">
                                    <nav className="text-sm leading-6 font-semibold text-slate-700 dark:text-slate-200">
                                        <ul className="flex space-x-8">
                                            <li className='hover:text-sky-300'>
                                                <Link className="nav-link text-white" to='/hobby/game'>게임</Link>
                                            </li>
                                            <li className='hover:text-sky-300'>
                                                <Link className="nav-link text-white" to='/hobby/mda'>영화/드라마/애니메이션</Link>
                                            </li>
                                        </ul>
                                    </nav>
                                    <div className="flex color-gray items-center border-l border-slate-200 ml-6 pl-6">
                                        <Link to='/work'>
                                            <button className="flex">
                                                <PiBookOpenTextBold color="black" />
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

export default HobbyNavbar
