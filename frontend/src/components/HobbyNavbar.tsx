import React, { useState } from 'react'
import { PiBookOpenTextBold, PiGameController, PiGameControllerFill } from 'react-icons/pi'
import { Link } from 'react-router-dom'

const HobbyNavbar: React.FC =  () => {

  return (
    <div className="flex-none sticky top-0 z-40 w-screen transition-colors bg-red-900 lg:z-50 lg:border-b lg:border-slate-900/10  supports-backdrop-blur:bg-white/95">
        <div className="max-w-8xl mx-auto">
            <div className="py-4 border-b border-slate-900/10 lg:px-8 lg:border-0 dark:border-slate-300/10 mx-4 lg:mx-0">
                        <div className="relative flex items-center">
                                <Link className="relative flex mr-5" to='/hobby'><PiGameControllerFill className="flex-none overflow:hidden md:w-auto" color='white' size='36' /></Link>
                                <div className="relative flex items-center ml-auto">
                                    <nav className="text-sm leading-6 font-semibold text-slate-700 dark:text-slate-200">
                                        <ul className="flex space-x-8 ">
                                            {[['게임', '/hobby/game'],
                                              ['영화/드라마/애니메이션', '/hobby/mda']
                                                ].map(([title, url]) => (
                                                <li>
                                                <Link className='text-white hover:text-sky-300' to={url}>{title}</Link>
                                                </li>
                                            ))}
                                        </ul>
                                    </nav>
                                    <div className="flex items-center border-l border-slate-200 ml-6 pl-6">
                                        <Link to='/work'>
                                            <button className="flex bg-sky-900 hover:bg-sky-500">
                                                <PiBookOpenTextBold color="white" />
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
