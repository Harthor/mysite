import React, { useState, useEffect } from 'react'
import { Outlet } from 'react-router'
import { Link, useNavigate } from 'react-router-dom'
import Navbar from './Navbar'

interface LayoutProps {
  category: string
}

const Layout: React.FC<LayoutProps> = (props) => {
  const [category, setCategory] = useState('work');
  const navigate = useNavigate();

  useEffect(() => {
    // 페이지가 로드될 때 현재 카테고리를 설정합니다.
    setCategory(props.category);
  }, [props.category]);

  return (
    <div className="flex flex-col h-screen">
      {/* 메뉴 바 */}
      <Navbar category={category} />
      {/* 본문 */}
      <div className="flex flex-1 mx-3 my-3">
        <Outlet />
      </div>
    </div>
  );
};

export default Layout;

// import { useParams } from 'react-router-dom'
// import { Outlet } from 'react-router'
// import WorkNavbar from './WorkNavbar'
// import HobbyNavbar from './HobbyNavbar'
// import Navbar from './Navbar'

// const Layout = () => {
//     const { category } = useParams();

//     return (
//         <div className='flex flex-col h-screen'>
//             {/* Navbar 부분 */}
//             <div className='flex-none'>
//                 { category === 'work' ? <WorkNavbar /> : <HobbyNavbar />}
//                 {/* <Navbar category = category/> */}
//             </div>
//             {/* 본문 부분 */}
//             <div className='flex flex-1 mx-3 my-3'>
//                 <div className='w-1/4'></div>
//                 <div className='w-1/2'><Outlet /></div>
//                 <div className='w-1/4'></div>
//             </div>
//         </div>
//     )
// }

// export default Layout