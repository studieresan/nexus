import { useRef } from 'react'
import { Button, Dropdown } from 'react-bootstrap'
import { useTranslation } from 'react-i18next'
import { BsCalendarDate, BsPencil, BsThreeDotsVertical, BsTrash } from 'react-icons/bs'

export default function BlogCard ({ post, handleModals }) {
  const { t, i18n } = useTranslation()
  const imageRef = useRef(null)
  const optionsRef = useRef(null)
  const handleConfirm = () => {
    console.log('confirm')
  }
  return (
    <div className='col'>
      <div
        className='card card-cover h-100 overflow-hidden rounded-4 cursor-pointer' style={{ transitionDuration: '0.2s', cursor: 'pointer' }}
        onClick={() => {
          handleModals.on({
            name: 'BlogPostModal',
            id: 'BlogPostModal-View',
            post,
            handleConfirm
          })
        }}
        onMouseEnter={(e) => {
          imageRef.current.style.filter = 'brightness(60%)'
          e.currentTarget.style.boxShadow = '0 0 10px rgba(0,0,0,0.6)'
          optionsRef.current.style.opacity = '1'
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.boxShadow = 'none'
          imageRef.current.style.filter = 'brightness(80%)'
          optionsRef.current.style.opacity = '0'
        }}
      >
        <div ref={imageRef} className='d-flex flex-column h-100' style={{ transitionDuration: '0.2s', backgroundImage: `url(${post.frontPicture})`, backgroundSize: 'cover', backgroundPosition: 'center', filter: 'brightness(80%)', position: 'absolute', top: 0, left: 0, right: 0, bottom: 0 }} />
        <div className='d-flex flex-column h-100 p-5 pb-3 text-white text-shadow-1' style={{ position: 'relative' }}>
          <h3 className='pt-5 mt-5 mb-4 display-6 lh-1 fw-bold'>{post.title}</h3>
          <div className='d-flex mt-auto'>
            <div className='me-2 ratio ratio-1x1 rounded-circle overflow-hidden' style={{ width: 50, height: 50 }}>
              <img src={post.author.info.picture} className='card-img-top img-cover' alt='alt' />
            </div>
            <div className='me-auto d-flex col align-items-center me-3 overflow-hidden'>
              <small>{post.author.firstName}&nbsp;{post.author.lastName}</small>
            </div>
            <div className='d-flex align-items-center gap-2 '>
              <BsCalendarDate />
              <small>{post.date.slice(0, 10)}</small>
            </div>
          </div>
          <div
            ref={optionsRef}
            style={{ position: 'absolute', top: 10, right: 10, zIndex: 100, opacity: 0 }}
            className='d-flex gap-2'
          >
            <Button className='p-2' variant='danger' size='lg'>
              <BsTrash className='d-block' size={17} />
            </Button>
            <Button className='p-2' variant='light' size='lg'>
              <BsPencil className='d-block' size={17} />
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
