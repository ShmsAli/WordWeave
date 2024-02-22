import { Outlet } from "react-router-dom"
import Navbar from "../Navbar"
import Footer from "../Footer"

function AppLayout() {


  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <div className="flex-1">
        <Outlet />
      </div>
      <Footer />
    </div>
  )
}

export default AppLayout
