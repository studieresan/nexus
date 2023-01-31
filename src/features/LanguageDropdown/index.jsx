import { flagAndCountry } from '@/components/icons/Flags.jsx'
import { useRef, useState } from 'react'
import { Dropdown, DropdownButton, OverlayTrigger, Tooltip } from 'react-bootstrap'
import i18n from '@/i18n'
export default function LanguageDropDown () {
  const tooltipContainerRef = useRef()

  const [lang, setLang] = useState(i18n.languages[0])

  function handleLanguageChange (lang) {
    setLang(lang)
    i18n.changeLanguage(flagAndCountry[lang].code)
  }

  return (
    <>
      <DropdownButton
        key='upLanguage'
        id='dropdown-button-drop-down'
        drop='down'
        variant='dark shadow-none'
        menuVariant='dark'
        title={flagAndCountry[lang]?.icon}
        size='md'
      >
        {Object.entries(flagAndCountry).map(([language, value], index) => (
          <OverlayTrigger
            key={language + 'overlay'}
            placement='left'
            defaultShow={false}
            overlay={
              <Tooltip id='tooltip-left'>
                {value?.text}
              </Tooltip>
            }
          >
            <Dropdown.Item
              key={language}
              eventKey={index + 1}
              size='lg'
              className='d-flex align-items-center gap-1'
              onClick={() => handleLanguageChange(language)}
              onMouseEnter={(e) => e.target.nextSibling.show()}
              onMouseLeave={(e) => e.target.nextSibling.hide()}
            >{value?.icon}{value?.text}
            </Dropdown.Item>
          </OverlayTrigger>
        ))}
      </DropdownButton>
    </>
  )
}
