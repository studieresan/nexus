import Contact from '@/components/Contact.jsx'
import { useWindowWidth } from '@/hooks/useWindowWidth'
import { ContactElement } from '@/models/Contact'
import { StudsGroupInfo } from '@/models/StudsGroupInfo'
import { getDescriptionSize } from '@/utils/fontSizing'
import { useRef } from 'react'
import { Collapse } from 'react-bootstrap'
import { useTranslation } from 'react-i18next'
import { BiChevronDown, BiChevronUp } from 'react-icons/bi'

interface GroupProps {
  handleClick: (index: number) => void
  showGroup: boolean[]
  group: StudsGroupInfo
  groupIndex: number
}

export default function StudsGroup ({ handleClick, showGroup, group, groupIndex }: GroupProps) {
  const { t, i18n } = useTranslation()
  const containerRef = useRef<HTMLDivElement>(null)
  const windowWidth = useWindowWidth();
  const masterContact = () => {
    if (group.manager === undefined) {
      const contact: ContactElement = {
        id: '',
        role: '',
        picture: '',
        name: t('groups.manager_not_found'),
        email: '',
        disabled: true,
        lg: true
      }
      return <Contact element={contact}/>;
    } else {
      const contact: ContactElement = {
        id: group.manager.id,
        role: t(`${group.manager.info.role}`),
        picture: group.manager.info.picture,
        name: `${group.manager.firstName} ${group.manager.lastName}`,
        email: group.manager.info.email,
        lg: true
      }
      return <Contact element={contact} />;
    }
  }

  return (
    <div
      ref={containerRef}
      className='d-flex align-items-start py-1 text-dark'
    >
      <div className='row icon-square text-bg-light d-inline-flex align-items-center justify-content-center fs-1 flex-shrink-0 me-3'>
        {group.icon}
      </div>
      <div className='w-100'>
        <div>
          <div
            className='d-flex' onClick={() => {
              handleClick(groupIndex)
              setTimeout(() => {
                if (containerRef.current) {
                  const viewportHeight = window.innerHeight
                  const currentScroll = window.pageYOffset || document.documentElement.scrollTop
                  const containerBottom = containerRef.current.offsetTop + containerRef.current.offsetHeight
  
                  if (containerBottom > currentScroll + viewportHeight) {
                    containerRef.current.scrollIntoView({ behavior: 'smooth', block: 'end' })
                  }
                }
              }, 300)
            }}
            style={{ cursor: 'pointer' }}
          >
            <h2 className='fw-normal'>{group.title}</h2>
                &nbsp;
            <div className='d-flex justify-content-center align-items-center'>
              {showGroup[groupIndex] ? <BiChevronUp size={30} /> : <BiChevronDown size={30} />}
            </div>
          </div>
          <Collapse in={showGroup[groupIndex]}>
            <div>
              <div className={`fw-light ${getDescriptionSize(windowWidth)}`}>{group.description}</div>
              <div className='d-flex'>
                {masterContact()}
              </div>
            </div>
          </Collapse>
          <hr className='w-100 opacity-25' style={{ height: 1, opacity: 1 }} />
        </div>
      </div>
    </div>

  )
}
