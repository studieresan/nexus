import { useState } from 'react'
import { Routes, Route } from 'react-router-dom'
import { AppDataContext } from '@/context'
import Header from './features/Header/index.jsx'
import Homepage from './features/Homepage/index.jsx'
import About from './features/About/index.jsx'
import Events from './features/Events/index.jsx'
import Groups from './features/Groups/index.jsx'
import Blog from './features/Blog/index.jsx'
import Login from './features/Login/index.jsx'
import { useFetchUsersAndBlogPosts } from './hooks/useFetchUsersAndBlogPosts.js'
import BlogPost from './features/BlogPost/index.jsx'
function App () {
  const [appData, setAppData] = useState({
    users: null,
    blogPosts: null
  })
  useFetchUsersAndBlogPosts(appData, setAppData)

  return (
    <AppDataContext.Provider value={appData}>
      <Header />
      <Routes>
        <Route path='/' element={<Homepage />} />
        <Route path='/about' element={<About />} />
        <Route path='/events' element={<Events />} />
        <Route path='/groups' element={<Groups appData={appData} />} />
        <Route path='/blog' element={<Blog appData={appData} />} />
        <Route path='/blog/:id' element={<BlogPost appData={appData} />} />
        <Route path='/login' element={<Login />} />
      </Routes>
    </AppDataContext.Provider>
  )
}

export default App
