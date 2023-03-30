import { BsFacebook, BsInstagram, BsLinkedin } from 'react-icons/bs'
import studsLogo from '@/assets/images/logo2023.png'
import goldman_sachs from '@/assets/images/goldman_sachs.png'
import karma from '@/assets/images/karma.png'
import scania from '@/assets/images/scania.png'
import storykit from '@/assets/images/storykit.png'
import fra from '@/assets/images/fra.png'
import visma from '@/assets/images/visma.png'
import { useTranslation } from 'react-i18next'
import { projectMasters } from '@/utils/predeterminedInformation'
import { CSSProperties, useEffect, useState } from 'react'
import Contact from '@/components/Contact.jsx'
import { AppData } from '@/models/AppData'
import { ContactElement } from '@/models/Contact'
import { useWindowWidth } from '@/hooks/useWindowWidth'

interface FooterProps {
  appData: AppData
}

export default function Footer ({ appData }: FooterProps): JSX.Element {
  const { t, i18n } = useTranslation()
  const [pictures, setPictures] = useState<string[] | null>(null)
  const windowWidth = useWindowWidth();
  
  let textPos = 'text-start';
  if (windowWidth < 992) {
    textPos = 'text-center';
  }

  useEffect(() => {
    if (appData.users) {
      const pictures: string[] = appData.users
        .filter(user => projectMasters
        .find(master => master.firstName === user.firstName && master.lastName === user.lastName))
        .map(user => user.info.picture)
        .filter((picture): picture is string => picture !== undefined)
      setPictures(pictures)
    }
  }, [appData.users])

  const imgStyle: CSSProperties  = { objectFit: 'contain', width: '200px' }
  const contacts: ContactElement[] = [
    {
      picture: pictures ? pictures[0] : undefined,
      name: `${projectMasters[0].firstName} ${projectMasters[0].lastName}`,
      email: projectMasters[0].email,
      role: t('projectLeader'),
      vertical: true,
    },
    {
      picture: pictures ? pictures[1] : undefined,
      name: `${projectMasters[1].firstName} ${projectMasters[1].lastName}`,
      email: projectMasters[1].email,
      role: t('projectLeader'),
      vertical: true,
    },
  ];

  const companyCircle = (img: string) => {
    return (
      <div className='rounded-circle overflow-hidden bg-white d-flex align-items-center justify-content-center' style={{ width: 120, height: 120 }}>
        <img src={img} className='card-img-top img-cover p-3' style={{ width: '100%', height: '100%', objectFit: 'contain', objectPosition: 'center' }} alt='alt' />
      </div>
    )
  }

  return (
    <div className='container-fluid p-4 bg-dark text-white'>
      <div className='row row-cols-2 mb-5'>
        <div className='col-12 col-lg-6 d-flex justify-content-center justify-content-lg-end'>
          <div className='d-flex row row-cols-1 justify-content-center'>
            <div className='col d-flex justify-content-center mb-3 gap-5'>
                <img src={studsLogo} style={imgStyle} alt='Studs Logo' />
            </div>
            <div className='col d-flex justify-content-center'>
              <div className='d-flex justify-content-center gap-5' style={{width: '200px'}}>
                    <Contact element={contacts[0]} />
                    <Contact element={contacts[1]} />
              </div>
            </div>
          </div>
        </div>
        <div className='col-12 col-lg-6 d-flex justify-content-center justify-content-lg-start'>
          <div className='d-flex row row-cols-1 row-cols-lg-2'>
            <div className='d-flex d-lg-none justify-content-center my-3'>
              <span className='fs-3 fw-light'>Collaborations: </span>
            </div>
            <div className='d-none d-lg-flex align-items-left justify-content-center' style={{width: '50px', height: '200px', border: '1px solid #000'}}>
              <span className='fs-3 fw-light' style={{writingMode: 'vertical-rl', textOrientation: 'mixed'}}>Collaborations: </span>
            </div>
            <div className='d-flex d-lg-block flex-wrap flex-lg-nowrap justify-content-center mb-3'>
              <div className='d-flex justify-content-center justify-content-lg-start flex-row mb-2 gap-3' style={{width:500}}>
                      {companyCircle(goldman_sachs)}
                      {companyCircle(karma)}
                      {companyCircle(scania)}
              </div>
              <div className='d-flex justify-content-center justify-content-lg-start flex-row gap-3' style={{width:500}}>
                      {companyCircle(fra)}
                      {companyCircle( storykit)}
                      {companyCircle( visma)}
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className='row row-cols-1 col-12 justify-content-center'>
        <hr className='col-9 opacity-25' style={{ height: 1 }} />
      </div>
      <div className='col d-flex justify-content-center'>
        <a className='text-muted mx-1' href='https://www.facebook.com/StudsKTH/'><BsFacebook size={22} /></a>
        <a className='text-muted mx-1' href='https://www.linkedin.com/company/studs/'><BsLinkedin size={22} /></a>
        <a className='text-muted mx-1' href='https://www.instagram.com/studskth/'><BsInstagram size={22} /></a>
      </div>
    </div>
  )
}
