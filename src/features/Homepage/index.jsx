
import { useEffect, useRef, useState } from 'react'
import { Trans, useTranslation } from 'react-i18next'
import { homepagePredeterminedOverlayGroups, groupsPredeterminedInfo, salesMaster } from '@/utils/predeterminedInformation.jsx'
import { IntroSection } from './components/IntroSection.jsx'
import bgContact from '@/assets/images/DSC00833.jpg'
import bgEvents from '@/assets/images/b48.jpg'
import bgProject from '@/assets/images/b28.jpg'

import DynamicHero from '@/components/DynamicHero.jsx'
import Divider from '@/components/Divider.jsx'
import { IoPersonSharp } from 'react-icons/io5'
import Contact from '@/components/Contact.jsx'
import { useNavigate } from 'react-router-dom'
export default function Homepage ({ appData }) {
  const { t, i18n } = useTranslation()
  const navigateTo = useNavigate()
  const [overlayGroups, setOverlayGroups] = useState(null)
  const [imagesLoaded, setImageLoaded] = useState({
    intro: false,
    hero: false
  })
  const projectRef = useRef(null)
  const eventsRef = useRef(null)
  const contactRef = useRef(null)
  const [salesInfo, setSalesInfo] = useState(null)

  const refs = { project: projectRef, events: eventsRef, contact: contactRef }

  useEffect(() => {
    const salesMasterUser = appData.users ? appData.users.find(user => user.firstName === salesMaster.firstName && user.lastName === salesMaster.lastName) : null
    setSalesInfo({
      bottomElement: <Contact picture={salesMasterUser?.info?.picture} name={`${salesMaster.firstName} ${salesMaster.lastName}`} phone={salesMaster.phone} email={salesMaster.email} />,
      description: <Trans i18nKey='homepage.contact.description'>{{ name: `${salesMaster.firstName} ${salesMaster.lastName}` }}</Trans>
    })
  }, [appData.users])

  useEffect(() => {
    setOverlayGroups((homepagePredeterminedOverlayGroups).map((group, index) => ({
      icon: group.icon,
      title: t(`homepage.${group.name}.short.title`),
      description: t(`homepage.${group.name}.short.description`),
      button: t(`homepage.${group.name}.short.button`),
      key: index,
      ref: refs[group.name]
    })))
  }, [i18n.language])

  function handleImageLoaded (section) {
    setImageLoaded({ ...imagesLoaded, [section]: true })
  }

  function projectPrimaryButton () {
    navigateTo('/about')
    document.body.scrollTop = document.documentElement.scrollTop = 0
  }

  function projectSecondaryButton () {
    navigateTo('/blog')
    document.body.scrollTop = document.documentElement.scrollTop = 0
  }

  function eventsPrimaryButton () {
    navigateTo('/events')
    document.body.scrollTop = document.documentElement.scrollTop = 0
  }

  return (
    <div>
      <IntroSection appData={appData} overlayGroups={overlayGroups} imagesLoaded={imagesLoaded} handleImageLoaded={handleImageLoaded} />
      <Divider />
      {imagesLoaded.intro && <DynamicHero insertRef={projectRef} align='left' title={t('homepage.project.title')} description={t('homepage.project.description')} bgImg={bgProject} primaryButtonText={t('homepage.project.buttonPrimary')} secondaryButtonText={t('homepage.project.buttonSecondary')} handleClickPrimary={projectPrimaryButton} handleClickSecondary={projectSecondaryButton} />}
      <Divider />
      {imagesLoaded.intro && <DynamicHero insertRef={eventsRef} align='right' title={t('homepage.events.title')} description={t('homepage.events.description')} bgImg={bgEvents} primaryButtonText={t('homepage.events.buttonPrimary')} handleClickPrimary={eventsPrimaryButton} />}
      <Divider />
      {imagesLoaded.intro && <DynamicHero insertRef={contactRef} align='left' title={t('homepage.contact.title')} description={salesInfo.description} bgImg={bgContact} bottomElement={salesInfo.bottomElement} />}
    </div>
  )
}
