import { useTranslation } from 'react-i18next'
export default function BlogPost () {
  const { t, i18n } = useTranslation()
  return (
    <div className='d-flex justify-content-center align-items-center vh-100'>
      <div className='w-80 d-flex'>
        {t('blogPost.intro')}
      </div>
    </div>
  )
}
