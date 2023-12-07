import { Outlet } from 'react-router'
import HobbyNavbar from './HobbyNavbar'
import Body from './Body'

const HobbyLayout = () => {
  return (
    <div>
        <HobbyNavbar />
        <Outlet />
    </div>
  )
}

export default HobbyLayout