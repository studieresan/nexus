import { Button } from 'react-bootstrap'
import { useTranslation } from 'react-i18next'

import { ModalManager } from '@/models/Modal'

interface EventIntroProps {
  handleModals: ModalManager
}

export default function EventIntro ({ handleModals }: EventIntroProps): JSX.Element {
  const { t, i18n } = useTranslation()

  return (
    <div className='py-5 w-75 container'>
      <div className='row pt-5'>
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
      </div>
    </div>
  )
}
