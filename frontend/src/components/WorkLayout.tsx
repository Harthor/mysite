import { Outlet } from 'react-router'
import WorkNavbar from './WorkNavbar'
import Body from './Body'

const WorkLayout = () => {
  return (
    <div>
        <WorkNavbar />
        <Outlet />
    </div>
  )
}

export default WorkLayout