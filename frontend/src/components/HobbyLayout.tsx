import { Outlet } from 'react-router'
import HobbyNavbar from './HobbyNavbar'
import Body from './Body'

const HobbyLayout = () => {
  return (
    <div className='flex-col h-screen'>
        <div className='flex-none'>
          <HobbyNavbar />
        </div>
        <div className='flex-1 mx-3 my-3'>
          <Outlet />
        </div>
    </div>
  )
}

export default HobbyLayout