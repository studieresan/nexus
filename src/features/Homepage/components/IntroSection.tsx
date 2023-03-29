import introBg from '@/assets/images/BigSizeBg.png';
import logo2023 from '@/assets/images/logo2023.png';
import { useState } from 'react';
import { Button, Spinner } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import { AppData } from '@/models/AppData';
import { OverlayGroup } from '../models/OverlayGroup';
import { ImagesLoaded } from '../models/ImagesLoaded';

const IconWrapper = ({ icon }: {icon: JSX.Element}) => (
  <div className='mb-1' style={{ width: 'auto', height: 'auto' }}>{icon}</div>
);

const loadingSpinner = (
  <div className="d-flex justify-content-center align-items-center vh-100">
    <Spinner
      variant="primary"
      animation="grow"
      role="status"
      style={{ width: 75, height: 75 }}
    >
      <span className="visually-hidden">Loading...</span>
    </Spinner>
  </div>
);

const overlayText = (
  <div className="d-flex flex-column justify-content-center align-items-center vh-100">
    <img src={logo2023} className="img-fluid" style={{ width: '50%' }} />
    <div className="fs-1 fw-bold text-light">2023</div>
  </div>
);

function OverlayGroupList({ overlayGroups }: { overlayGroups: OverlayGroup[] }) {
  return overlayGroups.map((group, index) => (
    <div key={index} className="col">
      <div className={` ${index == 0 ? 'me-auto' : (index == overlayGroups.length - 1 ? 'ms-auto' : 'mx-auto')}`} style={{width: '90%'}}>
        <div className="d-flex gap-2 fs-1" style={{ }}>
          <IconWrapper icon={group.icon} />
          {group.title}
        </div>
        <div className='mb-3 fs-4 fw-light'>
          {group.description}
        </div>
        <Button
        size = 'lg'
          onClick={() => {
            if (group.ref && group.ref.current) {
              group.ref.current.scrollIntoView({
                behavior: 'smooth',
                block: 'center',
              });
            }
          }}
        >
          {group.button}
        </Button>
      </div>
    </div>
  ));
}
interface IntroSectionProps {
  appData: AppData,
  overlayGroups: OverlayGroup[],
  imagesLoaded: ImagesLoaded,
  handleImageLoaded: (section: string) => void
}

export function IntroSection({ appData, overlayGroups, imagesLoaded, handleImageLoaded }: IntroSectionProps): JSX.Element {
  const { t, i18n } = useTranslation();

  return (
      <div className="row row-cols-1 w-100 justify-content-center g-0 bg-dark pb-5" style={{ position: 'relative' }}>
        <div className="col-12 w-100 position-relative" style={{minHeight: '200px'}}>
          <div className="image-container d-none d-lg-flex justify-content-end">
            <img
              src={introBg}
              style={{
                top: 0,
                right: 0,
                width: '70%',
                height: '100%',
                objectFit: 'cover',
                filter: '',
              }}
              onLoad={() => handleImageLoaded('intro')}
            />
            {!imagesLoaded.intro && loadingSpinner}
          </div>
          <div className="text-container col-11 col-xxl-8 position-absolute start-50 translate-middle-x" style={{top:'10%'}}>
            {imagesLoaded.intro && (
              <div className="col-12 text-center text-lg-start" >
                <div className='d-block d-lg-none' style={{fontWeight: 200}}>
                  <img src={logo2023} style={{width: '300px'}}/>
                </div>
                <div className='d-none d-xxl-flex col-10 text-white' style={{fontWeight: 600, fontSize: 70 }}>
                  {t('homepage.intro')}
                </div>
                <div className='d-flex d-xxl-none col-10 text-white' style={{fontWeight: 600, fontSize: 70 }}>
                  {t('homepage.intro')}
                </div>
              </div>
              
            )}
          </div>
        </div>
        <div className="col-12 bg-dark">
          &nbsp;
        </div>
        <div className="col-11 col-xxl-8 d-none d-lg-block text-white mx-auto">
          <div className="row row-cols-3">
            {overlayGroups && OverlayGroupList({ overlayGroups })}
          </div>
        </div>
      </div>
  );
}
