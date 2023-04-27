
import { useEffect, useRef, useState } from 'react'
import { Trans, useTranslation } from 'react-i18next'
import { IntroSection } from './components/IntroSection'
import bgContact from '@/assets/images/DSC00833.jpg'
import bgEvents from '@/assets/images/b48.jpg'
import bgProject from '@/assets/images/b28.jpg'

import DynamicHero from '@/components/DynamicHero.jsx'
import Contact from '@/components/Contact.jsx'
import { useNavigate } from 'react-router-dom'
import { AppData } from '@/models/AppData'
import { OverlayGroup } from './models/OverlayGroup'
import { ImagesLoaded } from './models/ImagesLoaded'
import { SalesInfo } from './models/SalesInfo'
import { ContactElement } from '@/models/Contact'
import WaveDivider from '@/components/WaveDivider'
import { UserRole } from '@/models/User'
import { GroupIcons } from '@/models/Group'
import { AiOutlineFundProjectionScreen } from 'react-icons/ai'
import { RiTeamFill } from 'react-icons/ri'
import { FiSend } from 'react-icons/fi'
import { ProjectInfo } from './models/ProjectInfo'



export default function Homepage ({ appData }: { appData: AppData }): JSX.Element {
  const { t, i18n } = useTranslation()
  const navigateTo = useNavigate()
  const [overlayGroups, setOverlayGroups] = useState<OverlayGroup[]>([])
  const [imagesLoaded, setImageLoaded] = useState<ImagesLoaded>({
    intro: false,
    hero: false
  })
  const projectRef = useRef(null)
  const eventsRef = useRef(null)
  const contactRef = useRef(null)
  const [salesInfo, setSalesInfo] = useState<SalesInfo>({bottomElement: null, description: null})
  const [projectInfo, setProjectInfo] = useState<ProjectInfo>({bottomElement: null, description: null})

  interface Refs {
    project: React.RefObject<HTMLElement>;
    events: React.RefObject<HTMLElement>;
    contact: React.RefObject<HTMLElement>;
  }

  const refs: Refs = { project: projectRef, events: eventsRef, contact: contactRef }

  useEffect(() => {
    if (appData.users) {
      const highestStudsYear = Math.max(...(appData.users).map((user) => user.studsYear))
      const salesManager = appData.users.find(user => user.info.role === UserRole.SalesGroupManager && user.studsYear === highestStudsYear)
      const numberOfUsers = appData.users.filter((user) => user.studsYear === highestStudsYear).length
      
      setProjectInfo({
        bottomElement: null,
        description: <Trans i18nKey='homepage.project.description'>{{ name: `${numberOfUsers}` }}</Trans>
      })
      if (salesManager) {
        const masterContact: ContactElement = {
          id: salesManager.id,
          picture: salesManager?.info?.picture,
          name: `${salesManager.firstName} ${salesManager.lastName}`,
          email: salesManager.info.email,
          phone: salesManager.info.phone,
          role: t(salesManager.info.role)
        }
        setSalesInfo({
          bottomElement: <Contact element={masterContact} />,
          description: <Trans i18nKey='homepage.contact.description'>{{ name: `${salesManager.firstName} ${salesManager.lastName}` }}</Trans>
        })
        
      } else {
        setSalesInfo({
          bottomElement: null,
          description: <Trans i18nKey='homepage.contact.description'>{{ name: t("groups.manager_not_found") }}</Trans>
        })
      }
    }
  }, [appData.users, i18n.language])

  const groupIcons:GroupIcons[] = [
    { name: 'project', icon: <AiOutlineFundProjectionScreen size={60} className='text-white rounded' /> },
    { name: 'events', icon: <RiTeamFill size={60} className='text-white rounded' /> },
    { name: 'contact', icon: <FiSend size={60} className='text-white rounded' /> }
  ]

  useEffect(() => {
    setOverlayGroups((groupIcons).map((group, index) => (
    {
      name: group.name,
      title: t(`homepage.${group.name}.short.title`),
      description: t(`homepage.${group.name}.short.description`),
      button: t(`homepage.${group.name}.short.button`),
      key: index,
      ref: refs[group.name]
    } as OverlayGroup)))
  }, [i18n.language])

  function handleImageLoaded (section: string) {
    setImageLoaded({ ...imagesLoaded, [section]: true })
  }

  function projectPrimaryButton () {
    navigateTo('/about')
    setTimeout(() => {
      document.body.scrollTop = document.documentElement.scrollTop = 0
    }, 100)
  }

  function projectSecondaryButton () {
    navigateTo('/blog')
    setTimeout(() => {
      document.body.scrollTop = document.documentElement.scrollTop = 0
    }, 100)
  }

  function eventsPrimaryButton () {
    navigateTo('/events')
    setTimeout(() => {
      document.body.scrollTop = document.documentElement.scrollTop = 0
    }, 100)
  }

  return (
    <div className='container-fluid g-0'>
      <div className='row row-cols-1 justify-content-center g-0'>
        <IntroSection appData={appData} overlayGroups={overlayGroups} imagesLoaded={imagesLoaded} handleImageLoaded={handleImageLoaded} />
        <WaveDivider direction='down'/>
        <div className='row row-cols-1 mt-2 mb-5 mt-lg-5 my- g-0'>
          <DynamicHero insertRef={projectRef} align='left' title={t('homepage.project.title')} description={projectInfo.description} bgImg={bgProject} primaryButtonText={t('homepage.project.buttonPrimary')} secondaryButtonText={t('homepage.project.buttonSecondary')} handleClickPrimary={projectPrimaryButton} handleClickSecondary={projectSecondaryButton} />
          <DynamicHero insertRef={eventsRef} align='right' title={t('homepage.events.title')} description={t('homepage.events.description')} bgImg={bgEvents} primaryButtonText={t('homepage.events.buttonPrimary')} handleClickPrimary={eventsPrimaryButton} />
          <DynamicHero insertRef={contactRef} align='left' title={t('homepage.contact.title')} description={salesInfo.description} bgImg={bgContact} bottomElement={salesInfo.bottomElement} />
        </div>
      </div>
    </div>
  )
}
