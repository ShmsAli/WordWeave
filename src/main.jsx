import React from 'react'
import ReactDOM from 'react-dom/client'
import { RouterProvider } from 'react-router-dom'
import route from './route.jsx'
import './index.css'
import UserProvider from './contexts/user.jsx'
import PostProvider from './contexts/post.jsx'



ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <UserProvider>
      <PostProvider>
        <RouterProvider router={route} />
      </PostProvider>
    </UserProvider>
  </React.StrictMode>,
)
