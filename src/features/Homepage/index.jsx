
import { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { homepagePredeterminedOverlayGroups } from '@/utils/predeterminedInformation.jsx'
import { IntroSection } from './components/IntroSection.jsx'
import bgContact from '@/assets/images/DSC00833.jpg'
import bgEvents from '@/assets/images/b48.jpg'
import bgProject from '@/assets/images/b28.jpg'

import DynamicHero from '@/components/DynamicHero.jsx'
import Divider from '@/components/Divider.jsx'
export default function Homepage ({ appData }) {
  const { t, i18n } = useTranslation()
  const [overlayGroups, setOverlayGroups] = useState(null)
  const [imagesLoaded, setImageLoaded] = useState({
    intro: false,
    hero: false
  })

  useEffect(() => {
    setOverlayGroups((homepagePredeterminedOverlayGroups).map((group, index) => ({
      icon: group.icon,
      title: t(`homepage.${group.name}.title`),
      description: t(`homepage.${group.name}.description`),
      button: t(`homepage.${group.name}.button`),
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
      {imagesLoaded.intro && <DynamicHero align='left' title='Project title aaaaaaaa' description='Studs är ett årligt ideellt projekt från KTH som leds av ett urval av 29 ingenjörsstudenter i masterprogram som är relevanta för datavetenskap.' bgImg={bgProject} primaryButtonText='test!!' secondaryButtonText='test!' />}
      <Divider />
      {imagesLoaded.intro && <DynamicHero align='right' title='Event title aaaaaaaa' description='Studs är ett årligt ideellt projekt från KTH som leds av ett urval av 29 ingenjörsstudenter i masterprogram som är relevanta för datavetenskap.' bgImg={bgEvents} primaryButtonText='test!!' secondaryButtonText='test!' />}
      <Divider />
      {imagesLoaded.intro && <DynamicHero align='left' title='Contact us title aaaaaaaa' description='Studs är ett årligt ideellt projekt från KTH som leds av ett urval av 29 ingenjörsstudenter i masterprogram som är relevanta för datavetenskap.' bgImg={bgContact} primaryButtonText='test!!' secondaryButtonText='test!' />}
    </div>
  )
}
