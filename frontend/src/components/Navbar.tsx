import React, { useState, useEffect } from 'react'
import { PiBookOpenTextBold, PiGameControllerFill } from 'react-icons/pi'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux';
import { logoutUser } from '../actions/authActions';


const Navbar: React.FC<NavbarProps> = () => {
  const [category, setCategory] = useState<string>(useParams().category || 'work');
  const navigate = useNavigate();
  const isAuthenticated = useSelector(state => state.auth.isAuthenticated);
  const userName = useSelector(state => state.auth.user);
  const dispatch = useDispatch();

  const handleCategoryClick = (newCategory) => {
    setCategory(newCategory);
  }; 

  const handleLogout = () => {
    localStorage.removeItem('userToken');
    dispatch(logoutUser());
  }
 
  const links = {
    work: [
      ['Info', '/work/info'],
      ['Projects', '/work/projects'],
      ['Study', '/work/study/1'],
    ],
    hobby: [
      ['Game', '/hobby/game/1'],
      ['Manga/Anime', '/hobby/ma/1'],
    ],
  };

  useEffect(() => {
  }, [category]);

  return (

      <div className={`sticky flex-none top-0 z-40 w-screen transition-colors bg-${
        category === 'work' ? 'sky-900' : 'red-900'
      } lg:z-50 lg:border-b lg:border-slate-900/10  supports-backdrop-blur:bg-white/95`}>
        <div className="max-w-8xl mx-auto">
          <div className="py-4 border-b border-slate-900/10 mx-4 lg:px-8 lg:border-0 lg:mx-0">
            <div className="relative flex items-center">
              <Link className="relative mr-5" to={`/${category}`}>
                {category === 'work' ? (
                  <PiBookOpenTextBold className="overflow:hidden w-auto" color='white' size='36' />
                ) : (
                  <PiGameControllerFill className="flex-none overflow:hidden md:w-auto" color='white' size='36' />
                )}
              </Link>
              <div className="relative flex items-center ml-10">
                <nav className="text-lg leading-6 font-semibold text-slate-700 dark:text-slate-200">
                  <ul className="flex space-x-8">
                    {links[category].map(([title, url]) => (
                      <li className="hover:text-sky-300">
                        <Link className="nav-link text-white" to={url}>{title}</Link>
                      </li>
                    ))}
                  </ul>
                </nav>
              </div>
              <div className='ml-auto flex flex-row items-center justify-center space-x-4'>
                <div>
                  {!isAuthenticated ?
                  <Link className="text-md text-white" to='/signin'>
                    Login 
                  </Link> :
                  <div className='inline text-white'>
                    <span className='text-xs'>{`${userName}님, 어서오세요.`}</span>
                    <button className='appearance-none' onClick={handleLogout}>LogOut</button>
                  </div>
                  }
                  
                </div>
                <div className="items-center border-l border-slate-200 pl-4">
                  
                  <button
                    className={`flex bg-${
                      category === 'work' ? 'red-900' : 'sky-900'
                    } hover:bg-${
                      category === 'work' ? 'red-500' : 'sky-500'
                    }`}
                    onClick={() => handleCategoryClick(category === 'work' ? 'hobby' : 'work')}
                  >
                    <PiBookOpenTextBold color="white" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

  );
};

export default Navbar;
