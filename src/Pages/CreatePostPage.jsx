import PostForm from "../components/Posts/PostForm"
import { useUser } from "../contexts/useUser";
import ProfilePage from "./ProfilePage";

function CreatePostPage() {
  const user = useUser();

  if(!user.current.emailVerification){
    return <ProfilePage/>
  }

  return (
    <div className="container my-6">
      <PostForm/>
    </div>
  )
}

export default CreatePostPage
