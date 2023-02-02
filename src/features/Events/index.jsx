import { Button } from 'react-bootstrap'
import { useTranslation } from 'react-i18next'
export default function Events (appData, handleModals) {
  const { t, i18n } = useTranslation()
  return (
    <div className='container-fluid' id='hanging-icons'>
      <div className='row row-cols-1 w-100 justify-content-center'>
        <div className='col-md-12 my-5 w-75'>
          <div>
            <h1 className='fw-light'>{t('groups.title')}</h1>
            <p className='lead text-muted'>{t('groups.intro')}</p>
            <div className='d-flex gap-2'>
              <Button>{t('groups.primaryButton')}</Button>
              <Button variant='secondary'>{t('groups.secondaryButton')}</Button>
            </div>
          </div>
        </div>
        <div className='col col-md-12 w-75'>
          {appData && appData.events && appData.events.map((event, eventIndex) => (
            <div key={`event-${eventIndex}`} className='mb-2'>
              {JSON.stringify(event)}
            </div>
          ))}
        </div>
      </div>
    </div>

  )
}
