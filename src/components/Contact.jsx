import { useTranslation } from 'react-i18next'
import { IoPersonSharp } from 'react-icons/io5'

export default function Contact ({ picture, name, phone, email }) {
  const { t } = useTranslation()
  if (phone) {
    return (
      <div className='d-flex'>
        <div className='d-flex ratio ratio-1x1 rounded-circle overflow-hidden' style={{ width: 75, height: 75 }}>
          {picture ? <img src={picture} className='card-img-top img-cover' alt='alt' /> : <IoPersonSharp className='bg-white' />}
        </div>
        <div className='d-flex row row-cols-1 align-items-center'>
          <small>
            <strong>{name}</strong>
            <br />{t('phone') + ': '}
            {phone}
            <br />{t('email') + ': '}
            {email}
          </small>
        </div>
      </div>
    )
  } else {
    return (
      <div className='d-flex'>
        <div className='d-flex ratio ratio-1x1 rounded-circle overflow-hidden' style={{ width: 75, height: 75 }}>
          {picture ? <img src={picture} className='card-img-top img-cover' alt='alt' /> : <IoPersonSharp className='bg-white' />}
        </div>
        <div className='d-flex row row-cols-1 align-items-center'>
          <small>
            <strong>{name}</strong>
            <br />{t('email') + ': '}
            {email}
          </small>
        </div>
      </div>
    )
  }
}
