import { useEffect, useRef, useState } from 'react'
import { Routes, Route, useNavigate } from 'react-router-dom'
import { AppDataContext, HandleInstructionsContext } from '@/context'
import Header from './features/Header/index'
import Homepage from './features/Homepage/index'
import About from './features/About/index'
import Events from './features/Events/index'
import Groups from './features/StudsGroups/index'
import Blog from './features/BlogPosts/index'
import Login from './features/Login/index'
import useFetchCollections from './hooks/useFetchCollections'
import { useModalManager } from './hooks/useModalManager'
import Modals from './features/Modals/index.jsx'
import instructionSwitchboard from './utils/instructionSwitchboard.js'
import Footer from './features/Footer/index.jsx'
import Divider from './components/Divider.jsx'
import { AppData } from '@/models/AppData'
import { InstructionArgs, InstructionData } from './models/Instruction'
import WaveDivider from './components/WaveDivider'

function App () {
  const [appData, setAppData] = useState<AppData>({
    users: null,
    blogPosts: null,
    events: null,
    loggedIn: localStorage.loggedIn || false,
    userDetails: (localStorage.userDetails && JSON.parse(localStorage.userDetails)) || null
  })

  useEffect(() => {
    console.log('appData', appData);
  }, [appData])
  const navigateTo = useNavigate()
  const args = useRef<InstructionArgs>({
    appData,
    setAppData,
    navigateTo,
  });
  args.current = { appData, setAppData, navigateTo }
  const handleModals = useModalManager()
  useFetchCollections(appData, setAppData)

  async function handleInstructions (instruction: string, data: InstructionData = {}) {
    return await instructionSwitchboard(args.current, instruction, data)
  }

  return (
    <HandleInstructionsContext.Provider value={handleInstructions}>
      <AppDataContext.Provider value={appData}>
        <Modals modal={handleModals} appData={{ ...appData }} />
        <Header appData={appData} setAppData={setAppData} />
        
        <Routes>
          <Route path='/' element={<Homepage appData={appData} />} />
          <Route path='/about' element={<div><WaveDivider direction='down'/><About appData={appData} /> </div>} />
          <Route path='/events' element={<div><WaveDivider direction='down' /><Events appData={appData} handleModals={handleModals} /></div>} />
          <Route path='/groups' element={<div><WaveDivider direction='down' /><Groups appData={appData} /></div>} />
          <Route path='/blog' element={<div><WaveDivider direction='down' /><Blog appData={appData} handleModals={handleModals} /></div>} />
          <Route path='/login' element={<div><WaveDivider direction='down' /><Login appData={appData} setAppData={setAppData} /></div>} />
        </Routes>
        <WaveDivider direction='up' />
        <Footer appData={appData} />
      </AppDataContext.Provider>
    </HandleInstructionsContext.Provider>
  )
}

export default App
