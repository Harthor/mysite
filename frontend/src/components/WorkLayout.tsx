import { Outlet } from 'react-router'
import WorkNavbar from './WorkNavbar'
import Body from './Body'
import Test from './Test'


const WorkLayout = () => {
  return (
    <div className='flex-col h-screen'>
        <div className='flex-none'>
          <WorkNavbar />
        </div>
        <div className='flex-1 mx-3 my-3'>
          <Outlet />
        </div>
    </div>
  )
}

export default WorkLayout