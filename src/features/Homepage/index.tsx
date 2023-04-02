
import { useEffect, useRef, useState } from 'react'
import { Trans, useTranslation } from 'react-i18next'
import { groupIcons, salesMaster } from '@/utils/predeterminedInformation'
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

  interface Refs {
    project: React.RefObject<HTMLElement>;
    events: React.RefObject<HTMLElement>;
    contact: React.RefObject<HTMLElement>;
  }

  const refs: Refs = { project: projectRef, events: eventsRef, contact: contactRef }

  useEffect(() => {
    const salesMasterUser = appData.users ? appData.users.find(user => user.firstName === salesMaster.firstName && user.lastName === salesMaster.lastName) : null
    const masterContact: ContactElement = {
      id: salesMaster.id,
      picture: salesMasterUser?.info?.picture,
      name: `${salesMaster.firstName} ${salesMaster.lastName}`,
      email: salesMaster.email,
      phone: salesMaster.phone,
      role: t('salesLeader')
    }
    setSalesInfo({
      bottomElement: <Contact element={masterContact} />,
      description: <Trans i18nKey='homepage.contact.description'>{{ name: `${salesMaster.firstName} ${salesMaster.lastName}` }}</Trans>
    })
  }, [appData.users, i18n.language])

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
        <div className='row row-cols-1 my-5 g-0'>
          {imagesLoaded.intro && <DynamicHero insertRef={projectRef} align='left' title={t('homepage.project.title')} description={t('homepage.project.description')} bgImg={bgProject} primaryButtonText={t('homepage.project.buttonPrimary')} secondaryButtonText={t('homepage.project.buttonSecondary')} handleClickPrimary={projectPrimaryButton} handleClickSecondary={projectSecondaryButton} />}
          {imagesLoaded.intro && <DynamicHero insertRef={eventsRef} align='right' title={t('homepage.events.title')} description={t('homepage.events.description')} bgImg={bgEvents} primaryButtonText={t('homepage.events.buttonPrimary')} handleClickPrimary={eventsPrimaryButton} />}
          {imagesLoaded.intro && <DynamicHero insertRef={contactRef} align='left' title={t('homepage.contact.title')} description={salesInfo.description} bgImg={bgContact} bottomElement={salesInfo.bottomElement} />}
        </div>
      </div>
    </div>
  )
}
