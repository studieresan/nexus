import { useTranslation } from 'react-i18next'
import { BsCalendarDate } from 'react-icons/bs'

export default function BlogCard ({ post }) {
  const { t, i18n } = useTranslation()
  return (
    <div className='col'>

      <div className='card card-cover h-100 overflow-hidden text-bg-dark rounded-4 shadow-lg'>
        <div className='d-flex flex-column h-100' style={{ backgroundImage: `url(${post.frontPicture})`, backgroundSize: 'cover', backgroundPosition: 'center', filter: 'brightness(70%)', position: 'absolute', top: 0, left: 0, right: 0, bottom: 0 }} />
        <div className='d-flex flex-column h-100 p-5 pb-3 text-white text-shadow-1' style={{ position: 'relative' }}>
          <h3 className='pt-5 mt-5 mb-4 display-6 lh-1 fw-bold'>{post.title}</h3>
          <div className='row row-cols-3 mt-auto'>
            <div className='ratio ratio-1x1 rounded-circle overflow-hidden' style={{ width: 50, height: 50 }}>
              <img src={post.author.info.picture} className='card-img-top img-cover' alt='alt' />
            </div>
            <div className='me-auto d-flex col align-items-center me-3 overflow-hidden'>
              <small>{post.author.firstName}&nbsp;{post.author.lastName}</small>
            </div>
            <div className='d-flex col align-items-center gap-2'>
              <BsCalendarDate />
              <small>{post.date.slice(0, 10)}</small>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
