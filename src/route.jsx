import { createBrowserRouter } from "react-router-dom"
import ErrorPage from "./Pages/ErrorPage";
import AppLayout from "./components/Layouts/AppLayout";
import LoginPage from "./Pages/LoginPage";
import SigninPage from "./Pages/SigninPage";
import HomePage from "./Pages/HomePage";
import PostDetailPage from "./Pages/PostDetailPage";
import CreatePostPage from "./Pages/CreatePostPage";
import EditPostPage from "./Pages/EditPostPage";
import ProfilePage from "./Pages/ProfilePage";
import EmailVerifyPage from "./Pages/EmailVerifyPage";
import AuthLayout from "./components/Layouts/AuthLayout";
import AboutPage from "./Pages/AboutPage";
import UserPostsPage from "./Pages/UserPostsPage";
const route = createBrowserRouter([
    {
      path: "/",
      element: <AppLayout/>,
      errorElement: <ErrorPage/>,
      children:[
        {
          index:true,
          element: <HomePage/>
        },

        {
          path:'post/:slug',
          element: <PostDetailPage/>
        },
        

        {
          path:'post/create',
          element:<AuthLayout><CreatePostPage/></AuthLayout> 
        },
        {
          path:'post/edit/:slug',
          element: <AuthLayout><EditPostPage/></AuthLayout>
        },

        {
          path:'profile',
          element: <AuthLayout><ProfilePage/></AuthLayout>
        },
        {
          path:'user/posts',
          element: <AuthLayout><UserPostsPage/></AuthLayout>
        },

      ]
    },
    {
      path:'about',
      element: <AboutPage/>
    },
    {
      path:'/login',
      element:<AuthLayout authentication={false}>
                <LoginPage/>
              </AuthLayout>
    },
    {
      path:'/signin',
      element:<AuthLayout authentication={false}>
                  <SigninPage/>
              </AuthLayout> 
    },
    {
      path:'/verification',
      element:<AuthLayout>
                <EmailVerifyPage/>
              </AuthLayout> 
    },

  ]);
export default route;