import { useEffect, useRef, useState } from 'react'
import { Routes, Route, useNavigate } from 'react-router-dom'
import { AppDataContext, HandleInstructionsContext } from '@/context'
import Header from './features/Header/index.jsx'
import Homepage from './features/Homepage/index.jsx'
import About from './features/About/index.jsx'
import Events from './features/Events/index.jsx'
import Groups from './features/Groups/index.jsx'
import Blog from './features/Blog/index.jsx'
import Login from './features/Login/index.jsx'
import useFetchCollections from './hooks/useFetchCollections.js'
import { useModalManager } from './hooks/useModalManager.js'
import Modals from './features/Modals/index.jsx'
import instructionSwitchboard from './utils/instructionSwitchboard.js'
import Footer from './features/Footer/index.jsx'
import Divider from './components/Divider.jsx'
function App () {
  const [appData, setAppData] = useState({
    users: null,
    blogPosts: null,
    events: null,
    loggedIn: localStorage.loggedIn || false,
    userDetails: (localStorage.userDetails && JSON.parse(localStorage.userDetails)) || null
  })

  useEffect(() => {
    console.log('appData: ', appData)
  }, [appData])
  const navigateTo = useNavigate()
  const args = useRef()
  args.current = { appData, setAppData, navigateTo }
  const handleModals = useModalManager()
  useFetchCollections(appData, setAppData)

  async function handleInstructions (instruction, data = {}) {
    return await instructionSwitchboard(args.current, instruction, data)
  }

  return (
    <HandleInstructionsContext.Provider value={handleInstructions}>
      <AppDataContext.Provider value={appData}>
        <Modals modal={handleModals} appData={{ ...appData }} />
        <Header appData={appData} setAppData={setAppData} />
        <Routes>
          <Route path='/' element={<Homepage appData={appData} />} />
          <Route path='/about' element={<About />} />
          <Route path='/events' element={<Events appData={appData} handleModals={handleModals} />} />
          <Route path='/groups' element={<Groups appData={appData} />} />
          <Route path='/blog' element={<Blog appData={appData} handleModals={handleModals} />} />
          <Route path='/login' element={<Login appData={appData} setAppData={setAppData} />} />
        </Routes>
        <Divider />
        <Footer />
      </AppDataContext.Provider>
    </HandleInstructionsContext.Provider>
  )
}

export default App
