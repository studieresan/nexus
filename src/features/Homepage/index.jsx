
import { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { homepagePredeterminedOverlayGroups } from '@/utils/predeterminedInformation.jsx'
import { IntroSection } from './components/IntroSection.jsx'
import { HeroSectionProject } from './components/HeroSectionProject.jsx'
export default function Homepage () {
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
    console.log('Entered')
    setImageLoaded({ ...imagesLoaded, [section]: true })
  }

  return (
    <div>
      <IntroSection overlayGroups={overlayGroups} imagesLoaded={imagesLoaded} handleImageLoaded={handleImageLoaded} />
      {imagesLoaded.intro && <HeroSectionProject handleImageLoaded={handleImageLoaded} />}
    </div>
  )
}
