import { Button, Nav, Navbar } from 'react-bootstrap'
import { BiLogIn, BiLogOut } from 'react-icons/bi'
import { useNavigate } from 'react-router-dom'
import LanguageDropDown from '../LanguageDropdown/index.jsx'
import studsLogo from '@/assets/images/logo2023.png'
import { useTranslation } from 'react-i18next'
import { useContext, useState } from 'react'
import { HandleInstructionsContext } from '@/context'
import { AppData } from '@/models/AppData'
import Contact from '@/components/Contact.jsx'
import { ContactElement } from '@/models/Contact.js'
import { AiOutlineHome } from 'react-icons/ai'
import { useWindowWidth } from '@/hooks/useWindowWidth.js'

interface HeaderProps {
  appData: AppData;
  setAppData: (appData: AppData) => void;
}

const loginOrOut = (loggedIn: boolean, t: any, navigateTo: any, logout: any) => {
  if (loggedIn) {
    return (
      <Button className='studs-navbar' onClick={() => logout()}>
        <div className='d-flex gap-1'>
          {t('logout')}
          <div className='d-flex align-items-center'>
            <BiLogOut size={20} />
          </div>
        </div>
      </Button>
    )
  } else {
    return (
      <Button className='studs-navbar' onClick={() => navigateTo('/auth/login')}>
        <div className='d-flex gap-1'>
          {t('login')}
          <div className='d-flex align-items-center'>
            <BiLogIn size={20} />
          </div>
        </div>
      </Button>
    )
  }
}

export default function Header({ appData, setAppData }: HeaderProps): JSX.Element {
  const { t, i18n } = useTranslation()
  const navigateTo = useNavigate()
  const handleInstructions = useContext(HandleInstructionsContext)
  const windowWidth = useWindowWidth()
  const logoDivWidth = '100%'

   // Add this state to manage the collapsed state of the navbar
  const [navbarCollapsed, setNavbarCollapsed] = useState(true);

  const handleNavItemClick = (path: string) => {
    navigateTo(path);
    setNavbarCollapsed(true); // Collapse the navbar after clicking on an item
  };
  async function logout () {
    await handleInstructions('logoutUser')
  }

  function userProfile() {
    const user = (appData.users || []).find(user => user.id === appData.userDetails?.id)
    if (!user) {
      return null;
    }
    const element: ContactElement = {
      id: user.id,
      picture: user.info.picture,
      name: `${user.firstName} ${user.lastName}`,
      // phone: e.info.phone,
      email: user.info.email,
      role: t(user.info.role),
      navbar: true,
      lg: true,
    }; 

    return (
      <div className='p-2'>
        <Contact element={element}/>
      </div>
    )
  }

  return (
    <Navbar bg='dark' variant='dark' className='px-3' expand='md'>
      <Navbar.Toggle
        aria-controls='basic-navbar-nav'
        onClick={() => setNavbarCollapsed(!navbarCollapsed)} // Toggle the collapsed state when the button is clicked
      />
      <Navbar.Collapse id='basic-navbar-nav' in={!navbarCollapsed}>
        <div className='d-flex flex-column flex-md-row w-100'>
          <div className='d-flex justify-content-center'>
            <Nav className='align-items-center gap-2'>
              <Button className='studs-navbar' onClick={() => handleNavItemClick('/about')}>
                {t('about.name')}
              </Button>
              <Button className='studs-navbar' onClick={() => handleNavItemClick('/events')}>
                {t('events.name')}
              </Button>
              <Button className='studs-navbar' onClick={() => handleNavItemClick('/groups')}>
                {t('groups.name')}
              </Button>
            </Nav>
          </div>
          <div className='d-flex justify-content-center p-2 mx-auto'style={{width: logoDivWidth}}>
            <Button className='studs-navbar'  onClick= {() => handleNavItemClick('/')}>
              <img alt='' src={studsLogo} width='200px' height='100%' className='d-none d-lg-inline-block align-top'/>
              <AiOutlineHome size={30} className='d-inline-block d-lg-none'/>
            </Button>
          </div>
          <div className='d-flex flex-column flex-md-row justify-content-center'>
            <Nav className='align-items-center gap-2 p-2 p-md-0'>
              <LanguageDropDown />
              <Button className='studs-navbar' onClick={() => handleNavItemClick('/blog')}>{t('blog.name')}</Button>
              {loginOrOut(appData.loggedIn, t, navigateTo, logout)}
              {userProfile()}
            </Nav>
          </div>
        </div>
      </Navbar.Collapse>
    </Navbar>
  )
}
