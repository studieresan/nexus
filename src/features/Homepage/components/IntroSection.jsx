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
      {imagesLoaded.intro
        ? (
          <div className='container-fuid'>
            <div className='row row-cols-1 col-12 justify-content-center text-white' style={{ position: 'absolute', top: '40%', left: '50%', transform: 'translate(-50%, -50%)' }} id='featured-3'>
              <div className='fs-1 col-9 text-grow' style={{ textAlign: 'center', whiteSpace: 'nowrap' }}>
                {t('homepage.intro')}
              </div>
              <div className='col-10 d-none d-xxl-block'>
                <hr style={{ height: 10, opacity: 1 }} />
              </div>
              <div className='container-fluid col-11 d-none d-xxl-flex'>
                <div className='row row-cols-3 gap-5 justify-content-center'>
                  {overlayGroups && overlayGroups.map((group, index) => (
                    <div key={index} className='col-3'>
                      <div className='row'>
                        <div className='col-1 me-3'>
                          <div className='feature-icon d-inline-flex justify-content-center fs-2'>
                            {group.icon}
                          </div>
                        </div>
                        <div className='col-10'>
                          <h3 className='fs-2'>{group.title}</h3>
                          <div>
                            <p>{group.description}</p>
                          </div>
                          <Button>
                            {group.button}
                          </Button>
                        </div>
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
