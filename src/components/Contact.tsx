import { ContactElement } from '@/models/Contact'
import { useTranslation } from 'react-i18next'
import { IoPersonSharp } from 'react-icons/io5'

interface ContactProps {
  element: ContactElement
}

export default function Contact ({ element } : ContactProps) : JSX.Element {
  const { t } = useTranslation()
  
  if (element.vertical) {
    return (
      <div className='col'>
        <div className='d-flex row justify-content-center' style={{ width: element.lg ? 287 : 120 }}>
          <div className='d-flex ratio ratio-1x1 rounded-circle overflow-hidden flex-shrink-0' style={{ width: element.lg ? 287 : 120, height: element.lg ? 287 : 120 }}>
            {element.picture ? <img src={element.picture} className='card-img-top img-cover' alt='alt' /> : <IoPersonSharp className='bg-white' />}
          </div>
          <div className='row gap-0 d-flex justify-content-center text-center mt-1'>
            <div className='lead fs-4'>{element.name}</div>
            {element.role && <div>{element.role}</div>}
            {element.phone && <div>{element.phone}</div>}
            {element.email && <div>{element.email}</div>}
          </div>
        </div>
      </div>
    )
  } else {
    return (
      <div className='d-flex'>
        <div className='d-flex ratio ratio-1x1 rounded-circle overflow-hidden' style={{ width: 120, height: 120 }}>
          {element.picture ? <img src={element.picture} className='card-img-top img-cover' alt='alt' /> : <IoPersonSharp className='bg-white' />}
        </div>
        <div className='d-flex d-flex flex-column justify-content-center'>
          <div className='lead fs-4'>{element.name}</div>
          {element.role && <div>{element.role}</div>}
          {element.phone && <div><a href={`tel:${element.phone}`}>{element.phone}</a></div>}
          {element.email && <div><a href={`mailto:${element.email}`}>{element.email}</a></div>}
        </div>
      </div>
    )
  }
}
