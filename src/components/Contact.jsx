import { useTranslation } from 'react-i18next'
import { IoPersonSharp } from 'react-icons/io5'

export default function Contact ({ picture, name, phone, email, role }) {
  const { t } = useTranslation()
  return (
    <div className='d-flex'>
      <div className='d-flex ratio ratio-1x1 rounded-circle overflow-hidden' style={{ width: 120, height: 120 }}>
        {picture ? <img src={picture} className='card-img-top img-cover' alt='alt' /> : <IoPersonSharp className='bg-white' />}
      </div>
      <div className='d-flex row row-cols-1 align-items-center'>
        <small>
          <strong>{name}</strong>
          {phone && <br />}
          {phone && t('phone') + ': ' + phone}
          {email && <br />}
          {email && t('email') + ': ' + email}
          {role && <br />}
          {role && t('role') + ': ' + role}
        </small>
      </div>
    </div>
  )
}
