import { flagAndCountry } from '@/components/icons/Flags.jsx'
import { useEffect, useState } from 'react'
import { Dropdown } from 'react-bootstrap'
import i18n from '@/i18n'
import { LanguageCode } from '@/models/Lang'


export default function LanguageDropDown () {
  const [lang, setLang] = useState<LanguageCode>(i18n.language as LanguageCode)
  const [drop, setDrop] = useState<'up' | 'down'>('down')

  useEffect(() => {
    const handleWindowResize = () => {
      if (window.innerWidth < 768) { // md breakpoint
        setDrop('up')
      } else {
        setDrop('down')
      }
    }

    handleWindowResize()
    window.addEventListener('resize', handleWindowResize)
    return () => window.removeEventListener('resize', handleWindowResize)
  }, [])
  function handleLanguageChange (language: LanguageCode) {
    setLang(language)
    i18n.changeLanguage(flagAndCountry[language].code)
  }

  return (
    <Dropdown drop={drop} style={{ position: 'relative' }}>
      <Dropdown.Toggle className='d-flex align-items-center' variant='dark' id='language-dropdown'>
        <div className='d-flex '>
          {flagAndCountry[lang]?.icon}
        </div>
      </Dropdown.Toggle>

      <Dropdown.Menu
        style={{ position: 'absolute', top: 'auto', bottom: drop === 'down' ? 'auto' : '100%', left: 0, right: 0, zIndex: 1000 }}
      >
        {Object.entries(flagAndCountry).map(([language, value ]) => (
          <Dropdown.Item
            key={language}
            onClick={() => handleLanguageChange(language as LanguageCode)}
          >
            {value?.icon} {value?.text}
          </Dropdown.Item>
        ))}
      </Dropdown.Menu>
    </Dropdown>
  )
}
