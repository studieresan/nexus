import { ModifiedButton } from '@/components/ModifiedButton.jsx'
import { Container, Nav, Navbar, NavDropdown } from 'react-bootstrap'
import { BiLogIn, BiLogOut } from 'react-icons/bi'
import { useNavigate } from 'react-router-dom'
import LanguageDropDown from '../LanguageDropdown/index.jsx'
import studsLogo from '@/assets/images/Logo_ROUND.png'
import { useTranslation } from 'react-i18next'
import { setLoggedOut } from '@/requests/auth.js'
import { useEffect, useState } from 'react'

export default function Header ({ appData, setAppData }) {
  const { t, i18n } = useTranslation()
  const navigateTo = useNavigate()
  const [loggedIn, setLoggedIn] = useState(false)

  function logout () {
    setLoggedOut()
    setAppData({ ...appData, loggedIn: false, userDetails: null })
    navigateTo('/')
  }
  return (
    <Navbar bg='dark' variant='dark' className='px-3' expand='md'>
      <Navbar.Brand onClick={() => navigateTo('/')} style={{ cursor: 'pointer' }}><img
        alt=''
        src={studsLogo}
        width='30'
        height='30'
        className='d-inline-block align-top'
                                                                                  />{' '}STUDS
      </Navbar.Brand>
      <Navbar.Toggle aria-controls='basic-navbar-nav' />
      <Navbar.Collapse id='basic-navbar-nav'>
        <Nav className='mr-auto'>
          <ModifiedButton onClick={() => navigateTo('/about')}>{t('about.name')}</ModifiedButton>
          <ModifiedButton onClick={() => navigateTo('/events')}>{t('events.name')}</ModifiedButton>
          <ModifiedButton onClick={() => navigateTo('/groups')}>{t('groups.name')}</ModifiedButton>
          <ModifiedButton onClick={() => navigateTo('/blog')}>{t('blog.name')}</ModifiedButton>
        </Nav>
        <Nav className='ms-auto align-items-center'>
          <LanguageDropDown />
          {appData.loggedIn
            ? (
              <ModifiedButton onClick={() => logout()}>
                <div className='d-flex gap-1'>
                  {t('logout')}
                  <div className='d-flex align-items-center'>
                    <BiLogOut size={20} />
                  </div>
                </div>
              </ModifiedButton>
              )
            : (
              <ModifiedButton onClick={() => navigateTo('/login')}>
                <div className='d-flex gap-1'>
                  {t('login')}
                  <div className='d-flex align-items-center'>
                    <BiLogIn size={20} />
                  </div>
                </div>

              </ModifiedButton>
              )}
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  )
}
