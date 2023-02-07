import { useTranslation } from 'react-i18next'
import { IoPersonSharp } from 'react-icons/io5'

export default function Contact ({ lg, vertical, picture, name, phone, email, role }) {
  const { t } = useTranslation()
  if (vertical) {
    return (
      <div className='col'>
        <div className='d-flex row justify-content-center' style={{ width: lg ? 287 : 120 }}>
          <div className='d-flex ratio ratio-1x1 rounded-circle overflow-hidden flex-shrink-0' style={{ width: lg ? 287 : 120, height: lg ? 287 : 120 }}>
            {picture ? <img src={picture} className='card-img-top img-cover' alt='alt' /> : <IoPersonSharp className='bg-white' />}
          </div>
          <div className='row gap-0 d-flex justify-content-center text-center mt-1'>
            <div className='lead fs-4'>{name}</div>
            {role && <div>{role}</div>}
            {phone && <div>{phone}</div>}
            {email && <div>{email}</div>}
          </div>
        </div>
      </div>
    )
  } else {
    return (
      <div className='d-flex'>
        <div className='d-flex ratio ratio-1x1 rounded-circle overflow-hidden' style={{ width: 120, height: 120 }}>
          {picture ? <img src={picture} className='card-img-top img-cover' alt='alt' /> : <IoPersonSharp className='bg-white' />}
        </div>
        <div className='d-flex d-flex flex-column justify-content-center'>
          <div className='lead fs-4'>{name}</div>
          {role && <div>{role}</div>}
          {phone && <div><a href={`tel:${phone}`}>{phone}</a></div>}
          {email && <div><a href={`mailto:${email}`}>{email}</a></div>}
        </div>
      </div>
    )
  }
}
