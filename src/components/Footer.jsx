import { Link } from "react-router-dom"
import appConfig from "../config/app"

function Footer() {
    return (


        <footer className="w-full border-t border-gray-200 bg-gray-100">
            <div className="w-full p-2 md:py-4">
                <div className="flex flex-col items-center justify-between">
                    <Link to="/" className="flex items-center sm:mb-0 space-x-3 rtl:space-x-reverse">
                        {/* <img src="https://flowbite.com/docs/images/logo.svg" className="h-8" alt="Flowbite Logo" /> */}
                        <h3 className="font-medium">{appConfig.appName}</h3>
                    </Link>
                    <Link to="/about" className="hover:underline">Shamas Ali</Link>
                     
                </div>
                <hr className="my-2 border-gray-200 sm:mx-auto lg:my-4" />
                <span className="block text-sm text-gray-500 text-center">© 2024 <Link to="/" className="hover:underline">{appConfig.appName}™</Link>. All Rights Reserved.</span>
            </div>
        </footer>


    )
}

export default Footer
