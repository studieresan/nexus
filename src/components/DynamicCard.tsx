import { CardElement } from '@/models/CardElement'
import { useRef } from 'react'
import { Button, Dropdown } from 'react-bootstrap'
import { useTranslation } from 'react-i18next'
import { BsCalendarDate, BsPencil, BsTrash } from 'react-icons/bs'
import { IoPersonSharp } from 'react-icons/io5'
import { Tools } from './Tools'
import { getDescriptionSize } from '@/utils/fontSizing'
import { useWindowWidth } from '@/hooks/useWindowWidth'
interface BlogCardProps {
  element: CardElement,
  handleClickCard: (id: string) => void
  handleClickEdit: (id: string) => void
  handleClickDelete: (id: string) => void
  toolsToShow: {
    edit: boolean
    delete: boolean
  }
}

export default function DynamicCard ({ element, handleClickCard, handleClickEdit, handleClickDelete, toolsToShow }: BlogCardProps) {
  const { t, i18n } = useTranslation()
  const imageRef = useRef<HTMLDivElement>(null)
  const optionsRef = useRef<HTMLDivElement>(null)
  const windowWidth = useWindowWidth();
  
  return (
    <div className='col'>
      <div
        className='card card-cover h-100 overflow-hidden rounded-4 cursor-pointer' style={{ transitionDuration: '0.2s', cursor: 'pointer' }}
        onClick={(e) => {
          e.stopPropagation()
          handleClickCard(element.id)
        }}
        onMouseEnter={(e) => {
          if (imageRef.current) {
            imageRef.current.style.filter = 'brightness(60%)'
          }
          e.currentTarget.style.boxShadow = '0 0 10px rgba(0,0,0,0.6)'
          if ((toolsToShow.edit || toolsToShow.delete) && optionsRef.current) {
            optionsRef.current.style.opacity = '1'
          }
        }}
        onMouseLeave={(e) => {
          if (imageRef.current) {
            imageRef.current.style.filter = 'brightness(80%)'
          }
          e.currentTarget.style.boxShadow = 'none'
          if ((toolsToShow.edit || toolsToShow.delete) && optionsRef.current) {
            optionsRef.current.style.opacity = '0'
          }
        }}
      >
        <div ref={imageRef} className='d-flex flex-column bg-dark h-100' style={{ transitionDuration: '0.2s', backgroundImage: `url(${element.bgImg})`, backgroundSize: 'cover', backgroundPosition: 'center', filter: 'brightness(80%)', position: 'absolute', top: 0, left: 0, right: 0, bottom: 0 }} />
        <div className='d-flex flex-column h-100 p-3 p-lg-5 pb-lg-3 text-white text-shadow-1' style={{ position: 'relative' }}>
          <div className={`pt-5 ${element.danger ? 'mt-3' : 'mt-5'} mb-4`}>
            {element.danger && <small className='lead text-warning'>{element.danger}</small>}
            {element.cardTitle
              ? (
                <div className={`display-6 lh-1 fw-bold px-1`}>{element.cardTitle}</div>
                )
              : (
                <div className={`display-6 lh-1 fw-bold text-warning ${getDescriptionSize(windowWidth)}`}>{t('card.noTitle')}</div>
                )}
          </div>
          <div className='d-flex mt-auto'>
            {element.cornerImg}
            <div className='me-auto d-flex col align-items-center me-3 overflow-hidden'>
              <small>{element.cornerText}</small>
            </div>
            <div className='d-flex align-items-center gap-2 '>
              <BsCalendarDate />
              <small>{element.dateText}</small>
            </div>
          </div>
          {(toolsToShow.edit || toolsToShow.delete) && <Tools id={element.id} handleClickDelete={handleClickDelete} handleClickEdit={handleClickEdit} optionsRef={optionsRef} opacity={0} toolsToShow={toolsToShow}/>}
        </div>

      </div>
    </div>
  )
}
