import { ModifiedButton } from '@/components/ModifiedButton.jsx'
import { Container, Nav, Navbar, NavDropdown } from 'react-bootstrap'
import { BiLogIn } from 'react-icons/bi'
import { useNavigate } from 'react-router-dom'
import LanguageDropDown from '../LanguageDropdown/index.jsx'
import studsLogo from '@/assets/images/Logo_ROUND.png'
import { useTranslation } from 'react-i18next'
function test () {
  const { t, i18n } = useTranslation()
  const navigateTo = useNavigate()

  return (
    <Navbar className='p-3 fs-5 w-100' bg='light' variant='light' style={{ position: 'absolute', opacity: 0.6, zIndex: 1 }}>
      <Navbar.Brand className='fs-3 text-dark' onClick={() => navigateTo('/')}>STUDS</Navbar.Brand>
      <Nav className='me-auto'>
        <ModifiedButton onClick={() => navigateTo('/about')}>{t('about.name')}</ModifiedButton>
        <ModifiedButton onClick={() => navigateTo('/events')}>{t('events.name')}</ModifiedButton>
        <ModifiedButton onClick={() => navigateTo('/groups')}>{t('groups.name')}</ModifiedButton>
        <ModifiedButton onClick={() => navigateTo('/blog')}>{t('blog.name')}</ModifiedButton>
      </Nav>
      <Nav className='pe-2'>
        <ModifiedButton>
          <LanguageDropDown />
        </ModifiedButton>
        <ModifiedButton onClick={() => navigateTo('/login')}>
          {t('login.name')} <BiLogIn />
        </ModifiedButton>
      </Nav>
    </Navbar>
  )
}

export default function Header () {
  const { t, i18n } = useTranslation()
  const navigateTo = useNavigate()
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
          <ModifiedButton onClick={() => navigateTo('/login')}>
            {t('login.name')} <BiLogIn />
          </ModifiedButton>
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  )
}
