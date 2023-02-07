import introBg from '@/assets/images/b39crop.jpg'
import { useState } from 'react'
import { Button, Spinner } from 'react-bootstrap'
import { useTranslation } from 'react-i18next'

export function IntroSection ({ appData, overlayGroups, imagesLoaded, handleImageLoaded }) {
  const { t, i18n } = useTranslation()

  return (
    <div style={{ position: 'relative' }}>
      <img src={introBg} style={{ width: '100%', height: '100%', objectFit: 'cover' }} onLoad={() => handleImageLoaded('intro')} />
      <div className='overlay' style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0 }} />
      {imagesLoaded.intro
        ? (
          <div className='container-fluid' style={{ position: 'absolute', top: '40%', left: '50%', transform: 'translate(-50%, -50%)' }}>
            <div className='row justify-content-center text-white' id='featured-3'>
              <div className='fs-1 fs-lg-2 col-12 text-grow ' style={{ textAlign: 'center' }}>
                {t('homepage.intro')}
              </div>
              <div className='col-9 d-none d-xxl-block'>
                <hr style={{ height: 10, opacity: 1 }} />
              </div>
              <div className='col-8 d-none d-xxl-block'>
                <div className='row row-cols-3 justify-content-center'>
                  {overlayGroups && overlayGroups.map((group, index) => (
                    <div key={index} className='d-flex'>
                      <div className='justify-content-center d-flex align-items-top me-3 mt-0'>
                        {group.icon}
                      </div>
                      <div className='w-100'>
                        <h3 className='fs-2'>{group.title}</h3>
                        <div>
                          <p>{group.description}</p>
                        </div>
                        <Button onClick={() => {
                          group.ref.current.scrollIntoView({ behavior: 'smooth', block: 'center' })
                        }}
                        >
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
