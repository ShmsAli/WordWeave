import { useUser } from "../contexts/useUser"
import Button from "./Button"
import downArrow from "../assets/downArrow.svg"
import DropDown from "./DropDown";
import { Link } from "react-router-dom";
import editButton from '../assets/editButton.svg'
import appConfig from "../config/app";

function Navbar() {
  const user = useUser();

  return (
    <div className="border-b border-gray-200">
      <nav className="container h-16 flex justify-center sm:justify-between items-center">

        {/* App Name and Logo */}
        <div className="flex gap-2 items-center">

          <h3 className="hidden sm:block">
            <Link to='/'>{appConfig.appName}</Link>
          </h3>

          {/*View in Mobiles Drop Down Menu */}
          <div className="sm:hidden flex gap-2 items-center">
            <h3><Link to='/'>{appConfig.appName}</Link></h3>
            <DropDown
              trigger={
                <div className="sm:hidden cursor-pointer">
                  <img className="w-5 h-5" src={downArrow} />
                </div>
              }
              content={
                <div className="flex flex-col">
                  {user.current ?

                  // When User is logged In
                    <>
                      {/* User Profile Link */}
                      <Link className="dropdown-link" to='/profile'>Profile</Link>
                      <div className="divider"></div>

                      {/* User's Posts Link */}
                      <Link className="dropdown-link" to='/user/posts'>My Posts</Link>
                      <div className="divider"></div>

                      {/* Create Post Link */}
                      <Link className="dropdown-link" to='/post/create'>Create Post</Link>
                      <div className="divider"></div>

                      {/* Logout Button */}
                      <button onClick={() => { user.logout() }} className="dropdown-link">Logout</button>
                    </>

                    :

                    // When User is logged Out
                    <>
                      {/* Login Button */}
                      <Link className="dropdown-link" to='/login'>Login</Link>
                      <div className="divider"></div>

                      {/* Sign In Button */}
                      <Link className="dropdown-link" to='/signin'>Sign up</Link>

                    </>

                  }
                </div>
              }
            />
          </div>
        </div>

        {/*View in Large Devices Drop Down Menu */}

        <div className="hidden sm:flex gap-4 items-center">
          {user.current ?
          // When User is Logged In
            <>
              <Button className='flex items-center gap-2' type="link" to='/post/create'>
                <img className="w-6 h-6 " src={editButton} />
                Write
              </Button>
              {/* sm:DropDown */}
              <DropDown
                trigger={
                  <div className="cursor-pointer flex gap-1 items-center">
                    <span className="author-text">{user.current?.name}</span>
                    <img className="w-5 h-5 mt-1" src={downArrow} />
                  </div>
                }
                content={
                  <div className="flex flex-col">

                    {/* User Profile Link */}
                    <Link className="dropdown-link" to='/profile'>Profile</Link>
                    <div className="divider"></div>

                    {/* User's Posts Link */}
                    <Link className="dropdown-link" to='/user/posts'>My Posts</Link>
                    <div className="divider"></div>

                    {/* Logout Button */}
                    <button onClick={() => { user.logout() }} className="dropdown-link">Logout</button>
                  </div>
                }
              />

            </>
            :
            
            // When User is Logged out
            <>

              {/* Login Button */}
              <Button type="link" to='/login'>
                Login
              </Button>

              {/* Sign in Button */}
              <Button type="link" to='/signin'>
                Sign in
              </Button>
              
            </>
          }

        </div>

      </nav>
    </div>
  )
}

export default Navbar
