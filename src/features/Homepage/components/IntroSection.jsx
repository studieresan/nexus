import introBg from '@/assets/images/b39crop.jpg'
import { useState } from 'react'
import { Button, Spinner } from 'react-bootstrap'
import { useTranslation } from 'react-i18next'

export function IntroSection ({ overlayGroups, imagesLoaded, handleImageLoaded }) {
  const { t, i18n } = useTranslation()

  return (
    <div>
      <div className='overlay' />
      <img src={introBg} style={{ width: '100%', height: '100%', objectFit: 'cover' }} onLoad={() => handleImageLoaded('intro')} />
      {imagesLoaded.intro
        ? (
          <div className='container px-4 py-5 text-white' style={{ position: 'absolute', top: '45%', left: '50%', transform: 'translate(-50%, -50%)' }} id='featured-3'>
            <div className='content text-white fs-1 w-100' style={{ textAlign: 'center' }}>
              {t('homepage.intro')}
            </div>
            <hr style={{ height: 10, opacity: 1 }} />
            <div className='row justify-content-center w-100 row-cols-1 row-cols-lg-3'>
              {overlayGroups && overlayGroups.map((group, index) => (
                <div key={index} className='row g-4 py-2'>
                  <div className='feature col'>
                    <div className='feature-icon d-inline-flex align-items-center justify-content-center fs-2 mb-3'>
                      {group.icon}
                    </div>
                    <h3 className='fs-2'>{group.title}</h3>
                    <p>{group.description}</p>
                    <Button>
                      {group.button}
                    </Button>
                  </div>
                </div>
              ))}
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
