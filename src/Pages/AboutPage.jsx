import Footer from "../components/Footer"
import Navbar from "../components/Navbar"
import { Link } from "react-router-dom"
import { usePost } from "../contexts/UsePost"

function AboutPage() {
    const { links , profilePicUrl} = usePost();
    return (
        <div className="h-screen flex flex-col justify-between">
            <Navbar />
            <div className="w-fit max-w-sm bg-white border border-gray-200 rounded-lg shadow mx-auto">

                <div className="flex flex-col items-center py-10 px-20">

                    <img className="max-w-24 max-h-24 mb-3 rounded-full shadow-lg" src={profilePicUrl} alt="Shamas Ali" />

                    <h5 className="mb-1 text-center text-xl font-medium text-gray-900">Shamas Ali</h5>

                    <span className="text-sm text-center text-gray-500 dark:text-gray-400">Web Developer</span>

                    <div className="text-2xl text-gray-800 flex flex-wrap justify-center gap-4 items-center mt-4">

                        {links && links.map((link) => {
                            return <Link key={link.$id} to={link.link}>
                                        <i className={`${link.class}`} ></i>
                                    </Link>
                        })}

                    </div>
                </div>
            </div>
            <Footer />
        </div>

    )
}

export default AboutPage
