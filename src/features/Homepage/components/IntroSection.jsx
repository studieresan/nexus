import introBg from '@/assets/images/b39crop.jpg'
import { useState } from 'react'
import { Button, Spinner } from 'react-bootstrap'
import { useTranslation } from 'react-i18next'

export function IntroSection ({ appData, overlayGroups, imagesLoaded, handleImageLoaded }) {
  const { t, i18n } = useTranslation()

  return (
    <div style={{ position: 'relative', width: '100%', height: '100%' }}>
      <img src={introBg} style={{ width: '100%', height: '100%', objectFit: 'cover' }} onLoad={() => handleImageLoaded('intro')} />
      <div className='overlay' style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0 }} />
      {imagesLoaded.intro && appData.userDetails &&
        <div className='d-none d-xl-flex fs-1 fw-light  justify-content-center mb-5 text-bold text-white' style={{ position: 'absolute', top: '10%', left: '50%', transform: 'translate(-50%, -50%)' }}>
          <div className='bg-dark rounded p-3'>
            {t('homepage.loggedIn')}{': '}{appData.userDetails.name}
          </div>
        </div>}
      {imagesLoaded.intro
        ? (
          <div className='container-fuid'>
            <div className='row row-cols-1 col-12 justify-content-center text-white' style={{ position: 'absolute', top: '40%', left: '50%', transform: 'translate(-50%, -50%)' }} id='featured-3'>
              <div className='fs-1 col-9' style={{ textAlign: 'center' }}>
                {t('homepage.intro')}
              </div>
              <div className='col-10 d-none d-xl-block'>
                <hr style={{ height: 10, opacity: 1 }} />
              </div>
              <div className='container-fluid col-9 d-none d-xl-block'>
                <div className='row row-cols-3 justify-content-center'>
                  {overlayGroups && overlayGroups.map((group, index) => (
                    <div key={index} className='row'>
                      <div className='feature col-12'>
                        <div className='feature-icon d-inline-flex align-items-center justify-content-center fs-2 mb-3'>
                          {group.icon}
                        </div>
                        <h3 className='fs-2'>{group.title}</h3>
                        <div>
                          <p>{group.description}</p>
                        </div>
                        <Button>
                          {group.button}
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
          )
        : (
          <div className='d-flex justify-content-center align-items-center vh-100'>
            <div className='w-80 d-flex'>
              <Spinner variant='primary' animation='grow' role='status' style={{ width: 75, height: 75 }}>
                <span className='visually-hidden'>Loading...</span>
              </Spinner>
            </div>
          </div>
          )}
    </div>
  )
}
