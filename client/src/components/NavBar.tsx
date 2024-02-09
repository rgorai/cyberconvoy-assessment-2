import { Link } from 'react-router-dom'
import logo from '../assets/logo.png'
import OAuthButton from './OAuthButton'

const NavBar = () => {
  return (
    <nav className="flex flex-row justify-between items-center bg-gray-800 px-[4vw] h-20">
      <Link className="flex flex-row items-center gap-5" to="/">
        <img className="w-12" src={logo} alt="logo" />
        <div className="text-2xl font-thin">Employee Management App</div>
      </Link>

      <OAuthButton />
    </nav>
  )
}

export default NavBar
