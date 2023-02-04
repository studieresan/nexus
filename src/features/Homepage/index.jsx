
import { useEffect, useState } from 'react'
import { Trans, useTranslation } from 'react-i18next'
import { homepagePredeterminedOverlayGroups, groupsPredeterminedInfo } from '@/utils/predeterminedInformation.jsx'
import { IntroSection } from './components/IntroSection.jsx'
import bgContact from '@/assets/images/DSC00833.jpg'
import bgEvents from '@/assets/images/b48.jpg'
import bgProject from '@/assets/images/b28.jpg'

import DynamicHero from '@/components/DynamicHero.jsx'
import Divider from '@/components/Divider.jsx'
import { IoPersonSharp } from 'react-icons/io5'
import Contact from '@/components/Contact.jsx'
export default function Homepage ({ appData }) {
  const { t, i18n } = useTranslation()
  const [overlayGroups, setOverlayGroups] = useState(null)
  const [imagesLoaded, setImageLoaded] = useState({
    intro: false,
    hero: false
  })
  const [salesContact, setSalesContact] = useState(null)

  useEffect(() => {
    if (appData.users) {
      const salesMaster = groupsPredeterminedInfo.sales
      const salesMasterUser = appData.users && appData.users.find(user => user.firstName === salesMaster.masterFirstName && user.lastName === salesMaster.masterLastName)
      const description = <Trans i18nKey='homepage.contact.description'>{{ name: `${salesMaster.masterFirstName} ${salesMaster.masterLastName}` }}</Trans>
      const bottomElement = <Contact picture={salesMasterUser.info.picture} name={`${salesMaster?.masterFirstName} ${salesMaster?.masterLastName}`} phone={salesMasterUser.info.phone} email={salesMasterUser.info.email} />
      setSalesContact({ description, bottomElement })
    }
  }, [appData.users, i18n.language])

  useEffect(() => {
    setOverlayGroups((homepagePredeterminedOverlayGroups).map((group, index) => ({
      icon: group.icon,
      title: t(`homepage.${group.name}.short.title`),
      description: t(`homepage.${group.name}.short.description`),
      button: t(`homepage.${group.name}.short.button`),
      key: index
    })))
  }, [i18n.language])

  function handleImageLoaded (section) {
    setImageLoaded({ ...imagesLoaded, [section]: true })
  }

  return (
    <div>
      <IntroSection appData={appData} overlayGroups={overlayGroups} imagesLoaded={imagesLoaded} handleImageLoaded={handleImageLoaded} />
      <Divider />
      {imagesLoaded.intro && <DynamicHero align='left' title={t('homepage.project.title')} description={t('homepage.project.description')} bgImg={bgProject} primaryButtonText={t('homepage.project.buttonPrimary')} secondaryButtonText={t('homepage.project.buttonSecondary')} />}
      <Divider />
      {imagesLoaded.intro && <DynamicHero align='right' title={t('homepage.events.title')} description={t('homepage.events.description')} bgImg={bgEvents} primaryButtonText={t('homepage.events.buttonPrimary')} />}
      <Divider />
      {imagesLoaded.intro && salesContact && <DynamicHero align='left' title={t('homepage.contact.title')} description={salesContact.description} bgImg={bgContact} bottomElement={salesContact.bottomElement} />}
    </div>
  )
}
