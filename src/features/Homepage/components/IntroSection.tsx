import introBg from '@/assets/images/BigSizeBg.png';
import logo2023 from '@/assets/images/logo2023.png';
import React, { useState, useEffect } from 'react';
import { Button, Spinner } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import { AppData } from '@/models/AppData';
import { OverlayGroup } from '../models/OverlayGroup';
import { ImagesLoaded } from '../models/ImagesLoaded';
import { AiOutlineFundProjectionScreen } from 'react-icons/ai';
import { RiTeamFill } from 'react-icons/ri';
import { FiSend } from 'react-icons/fi';
import { useWindowWidth } from '@/hooks/useWindowWidth';

const groupIcons = {
  project: AiOutlineFundProjectionScreen,
  events: RiTeamFill,
  contact: FiSend,
};

const IconWrapper = ({ icon, iconSize }: { icon: typeof AiOutlineFundProjectionScreen | typeof RiTeamFill | typeof FiSend, iconSize: number }) => (
  <div className='mb-1' style={{ width: 'auto', height: 'auto' }}>
    {React.createElement(icon, { size: iconSize, className: "text-white rounded" })}
  </div>
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



function OverlayGroupList({ overlayGroups, windowWidth }: { overlayGroups: OverlayGroup[], windowWidth: number }) {
  const iconSize = windowWidth < 1400 ? 50 : 60;
  const fontSize1 = windowWidth < 1400 ? 'fs-2' : 'fs-1';
  const fontSize2 = windowWidth < 1400 ? 'fs-5' : 'fs-4';

  return (
    <>
      {overlayGroups.map((group, index) => (
        <div key={index} className="col">
          <div className={` ${index == 0 ? 'me-auto' : (index == overlayGroups.length - 1 ? 'ms-auto' : 'mx-auto')}`} style={{width: '90%'}}>
            <div className={`d-flex align-items-center gap-2 ${fontSize1}`} style={{ }}>
              <IconWrapper icon={groupIcons[group.name]} iconSize={iconSize} />
              {group.title}
            </div>
            <div className={`mb-3 ${fontSize2} fw-light`}>
              {group.description}
            </div>
            <Button className='studs-bg'
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
      ))}
    </>
  );
}
interface IntroSectionProps {
  appData: AppData,
  overlayGroups: OverlayGroup[],
  imagesLoaded: ImagesLoaded,
  handleImageLoaded: (section: string) => void
}

export function IntroSection({ appData, overlayGroups, imagesLoaded, handleImageLoaded }: IntroSectionProps): JSX.Element {
  const { t, i18n } = useTranslation();
  const windowWidth = useWindowWidth();
  
  let titleSize = 0;
  if (windowWidth < 576) {
    titleSize = 25
  } else if (windowWidth < 768) {
    titleSize = 30
  } else if (windowWidth < 992) {
    titleSize = 40
  } else if (windowWidth < 1400) {
    titleSize = 55
  } else {
    titleSize = 65
  }
  
  return (
      <div className="row row-cols-1 g-0 bg-dark pb-5" style={{ position: 'relative' }}>
        <div className="col-12 w-100 position-relative" style={{minHeight: '200px'}}>
          <div className="image-container d-none d-lg-flex justify-content-end">
            <img src={introBg} style={{ top: 0, right: 0, width: '60%', height: '100%', objectFit: 'cover', filter: ''}} onLoad={() => handleImageLoaded('intro')}/>
            {!imagesLoaded.intro && loadingSpinner}
          </div>
          <div className="text-container col-11 col-xxl-8 position-absolute start-50 translate-middle-x" style={{top:'10%'}}>
            {imagesLoaded.intro && (
              <div className="col-12">
                <div className="row row-cols-lg-1 text-center text-lg-start justify-content-center" >
                  <div className='d-block d-lg-none p-2' style={{fontWeight: 200}}>
                    <img src={logo2023} style={{width: '300px'}} alt='Studs 2023 Logo' />
                  </div>
                  <div className='d-flex col-10 text-white' style={{fontWeight: 600, fontSize: titleSize }}>
                    {t('homepage.intro')}
                  </div>
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
            {overlayGroups && <OverlayGroupList overlayGroups={overlayGroups} windowWidth={windowWidth} />}
          </div>
        </div>
      </div>
  );
}
