import React, { useState, useEffect } from 'react'
import { PiBookOpenTextBold, PiGameControllerFill } from 'react-icons/pi'
import { Link, useNavigate, useParams } from 'react-router-dom'


interface NavbarProps {
  category: string
}

const Navbar: React.FC<NavbarProps> = (props) => {
  const [category, setCategory] = useState<string>(useParams().category);
  const navigate = useNavigate();

  const handleCategoryClick = (newCategory) => {
    setCategory(newCategory);
  };

  const links = {
    work: [
      ['Info', '/work/info'],
      ['Projects', '/work/projects'],
      ['Study', '/work/study/1'],
    ],
    hobby: [
      ['게임', '/hobby/game/1'],
      ['영화/애니메이션', '/hobby/ma/1'],
    ],
  };

  useEffect(() => {
    // 페이지가 로드될 때 현재 카테고리를 설정합니다.
    setCategory(props.category || 'work'); // 타입을 지정해도 || 'work'는 넣어야 작동한다. 아니면 undefined 이슈.
  }, [props.category]);

  return (
    <div className={`sticky top-0 z-40 w-screen transition-colors bg-${
      category === 'work' ? 'sky-900' : 'red-900'
    } lg:z-50 lg:border-b lg:border-slate-900/10  supports-backdrop-blur:bg-white/95`}>
      <div className="max-w-8xl mx-auto">
        <div className="py-4 border-b border-slate-900/10 mx-4 lg:px-8 lg:border-0 lg:mx-0">
          <div className="relative flex items-center">
            <Link className="relative mr-5" to='/'>
              {category === 'work' ? (
                <PiBookOpenTextBold className="overflow:hidden w-auto" color='white' size='36' />
              ) : (
                <PiGameControllerFill className="flex-none overflow:hidden md:w-auto" color='white' size='36' />
              )}
            </Link>
            <div className="relative flex items-center ml-auto">
              <nav className="text-md leading-6 font-semibold text-slate-700 dark:text-slate-200">
                <ul className="flex space-x-8">
                  {links[category].map(([title, url]) => (
                    <li className="hover:text-sky-300">
                      <Link className="nav-link text-white" to={url}>{title}</Link>
                    </li>
                  ))}
                </ul>
              </nav>
              <div className="flex color-gray items-center border-l border-slate-200 ml-6 pl-6">
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
