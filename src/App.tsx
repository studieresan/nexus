import { useEffect, useRef, useState } from 'react'
import { Routes, Route, useNavigate } from 'react-router-dom'
import { AppDataContext, HandleInstructionsContext, HandleModalsContext } from '@/context'
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
import { AppData } from '@/models/AppData'
import { InstructionArgs, InstructionData } from './models/Instruction'
import WaveDivider from './components/WaveDivider'

function App() {
  const [appData, setAppData] = useState<AppData>({
    users: null,
    blogPosts: null,
    events: null,
    loggedIn: localStorage.loggedIn || false,
    userDetails: (localStorage.userDetails && JSON.parse(localStorage.userDetails)) || null,
    didFetchCollections: false
  })

  useEffect(() => {
    console.log('appData', appData);
  }, [appData])
  const navigateTo = useNavigate()
  const args = useRef<InstructionArgs>({ appData, setAppData, navigateTo })
  args.current = { appData, setAppData, navigateTo }
  const handleModals = useModalManager()
  useFetchCollections(appData, setAppData)

  async function handleInstructions(instruction: string, data: InstructionData = {}) {
    return await instructionSwitchboard(args.current, instruction, data)
  }

  const waveDividedElement = (element: JSX.Element) => {
    return (<><WaveDivider direction='down' />{element}</>)
  }

  return (
    <HandleInstructionsContext.Provider value={handleInstructions}>
      <HandleModalsContext.Provider value={handleModals}>
        <AppDataContext.Provider value={appData}>
          <Modals modal={handleModals} appData={{ ...appData }} />
          <Header appData={appData} setAppData={setAppData} />
          <Routes>
            <Route path='/' element={<Homepage appData={appData} />} />
            <Route path='/about' element={waveDividedElement(<About appData={appData} handleModals={handleModals} />)} />
            <Route path='/events' element={waveDividedElement(<Events appData={appData} handleModals={handleModals} />)} />
            <Route path='/groups' element={waveDividedElement(<Groups appData={appData} />)} />
            <Route path='/blog' element={waveDividedElement(<Blog appData={appData} handleModals={handleModals} />)} />
            <Route path='/auth/:mode/:token?' element={waveDividedElement(<Login appData={appData} setAppData={setAppData} />)} />
          </Routes>
          <WaveDivider direction='up' />
          <Footer appData={appData} />
        </AppDataContext.Provider>
      </HandleModalsContext.Provider>
    </HandleInstructionsContext.Provider>
  )
}

export default App
