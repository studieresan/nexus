import { Button } from 'react-bootstrap'
import { useTranslation } from 'react-i18next'

export default function BlogIntro ({ handleModals }) {
  const { t, i18n } = useTranslation()

  return (
    <div className='mx-auto'>
      <h1 className='fw-light'>{t('blog.title')}</h1>
      <p className='lead text-muted'>{t('blog.intro')}</p>
      <div className='d-flex gap-2'>
        <Button
          onClick={() => {
            handleModals.on({
              name: 'BlogPostModal',
              id: 'BlogPostModal-View',
              post: {},
              mode: 'edit'
            })
          }}
        >{t('blog.primaryButton')}
        </Button>
        <Button variant='secondary'>{t('blog.secondaryButton')}</Button>
      </div>
    </div>
  )
}
