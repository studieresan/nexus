import { CardElement } from '@/models/CardElement'
import { useRef } from 'react'
import { Button, Dropdown } from 'react-bootstrap'
import { useTranslation } from 'react-i18next'
import { BsCalendarDate, BsPencil, BsTrash } from 'react-icons/bs'
import { IoPersonSharp } from 'react-icons/io5'
interface BlogCardProps {
  element: CardElement,
  handleClickCard: (id: string) => void
  handleClickEdit: (id: string) => void
  handleClickDelete: (id: string) => void
  showTools: boolean
}

export default function DynamicCard ({ element, handleClickCard, handleClickEdit, handleClickDelete, showTools }: BlogCardProps) {
  const { t, i18n } = useTranslation()
  const imageRef = useRef<HTMLDivElement>(null)
  const optionsRef = useRef<HTMLDivElement>(null)
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
          if (showTools && optionsRef.current) {
            optionsRef.current.style.opacity = '1'
          }
        }}
        onMouseLeave={(e) => {
          if (imageRef.current) {
            imageRef.current.style.filter = 'brightness(80%)'
          }
          e.currentTarget.style.boxShadow = 'none'
          if (showTools && optionsRef.current) {
            optionsRef.current.style.opacity = '0'
          }
        }}
      >
        <div ref={imageRef} className='d-flex flex-column bg-dark h-100' style={{ transitionDuration: '0.2s', backgroundImage: `url(${element.bgImg})`, backgroundSize: 'cover', backgroundPosition: 'center', filter: 'brightness(80%)', position: 'absolute', top: 0, left: 0, right: 0, bottom: 0 }} />
        <div className='d-flex flex-column h-100 p-5 pb-3 text-white text-shadow-1' style={{ position: 'relative' }}>
          <div className={`pt-5 ${element.danger ? 'mt-3' : 'mt-5'} mb-4`}>
            {element.danger && <small className='lead text-warning'>{element.danger}</small>}
            {element.cardTitle
              ? (
                <h3 className='display-6 lh-1 fw-bold'>{element.cardTitle}</h3>
                )
              : (
                <h3 className='display-6 lh-1 fw-bold text-warning'>{t('card.noTitle')}</h3>
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
          {showTools && (
            <div
              ref={optionsRef}
              style={{ position: 'absolute', top: 10, right: 10, zIndex: 100, opacity: 0 }}
              className='d-flex gap-2'
            >
              <Button
                className='p-2' variant='danger' size='lg' onClick={(e) => {
                  e.stopPropagation()
                  handleClickDelete(element.id)
                }}
              >
                <BsTrash className='d-block' size={17} />
              </Button>
              <Button
                className='p-2' variant='light' size='lg'
                onClick={(e) => {
                  e.stopPropagation()
                  handleClickEdit(element.id)
                }}
              >
                <BsPencil className='d-block' size={17} />
              </Button>
            </div>
          )}
        </div>

      </div>
    </div>
  )
}
