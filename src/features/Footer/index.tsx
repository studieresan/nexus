import { BsFacebook, BsInstagram, BsLinkedin } from 'react-icons/bs'
import studsLogo from '@/assets/images/Logo_ROUND.png'
import goldman_sachs from '@/assets/images/goldman_sachs.png'
import karma from '@/assets/images/karma.png'
import scania from '@/assets/images/scania.png'
import storykit from '@/assets/images/storykit.png'
import fra from '@/assets/images/fra.png'
import { useTranslation } from 'react-i18next'
import { projectMasters } from '@/utils/predeterminedInformation'
import { CSSProperties, useEffect, useState } from 'react'
import Contact from '@/components/Contact.jsx'
import { AppData } from '@/models/AppData'
import { ContactElement } from '@/models/Contact'

interface FooterProps {
  appData: AppData
}

export default function Footer ({ appData }: FooterProps): JSX.Element {
  const { t, i18n } = useTranslation()
  const [pictures, setPictures] = useState<string[] | null>(null)
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

  const ContactComponents = () => {
    const contacts: ContactElement[] = [
      {
        picture: pictures ? pictures[0] : undefined,
        name: `${projectMasters[0].firstName} ${projectMasters[0].lastName}`,
        email: projectMasters[0].email,
        role: t('projectLeader'),
      },
      {
        picture: pictures ? pictures[1] : undefined,
        name: `${projectMasters[1].firstName} ${projectMasters[1].lastName}`,
        email: projectMasters[1].email,
        role: t('projectLeader'),
      },
    ];

    return (
      <div className="d-flex flex-wrap justify-content-center">
        {contacts.map((element, index) => (
          <Contact key={index} element={element} />
        ))}
      </div>
    );
  };


  return (
    <div className='container-fluid p-4'>
      <div className='mb-4'>
        <div className='text-center fw-bold fs-3 mb-4'>
          {t('footer.questions')}
        </div>
        <div className='d-flex flex-wrap justify-content-center'>
          {ContactComponents()}
        </div>
      </div>
      <div className='text-center fw-bold fs-3'>
        {t('footer.collaborations')}
      </div>

      <div className='row row-cols-2 my-4'>
        <div className='col-12 d-flex flex-wrap justify-content-center gap-3 mb-4'>
          <img src={goldman_sachs} alt='Goldman Sachs' style={imgStyle} />
          <img src={karma} alt='Karma' style={imgStyle} />
          <img src={scania} alt='Scania' style={imgStyle} />
        </div>
        <div className='col-12 d-flex flex-wrap justify-content-center gap-3'>
          <img src={storykit} alt='Storykit' style={imgStyle} />
          <img src={fra} alt='FRA' style={imgStyle} />
        </div>
      </div>

      <div className='row row-cols-1 col-12 justify-content-center'>
        <hr className='col-9 opacity-25' style={{ height: 1, opacity: 1 }} />
      </div>
      <div className='row row-cols-2 col-12 justify-content-between'>
        <div className='col d-flex justify-content-center align-items-center'>
          <div className='mb-3 me-2 mb-md-0 text-muted text-decoration-none lh-1'>
            <img
              alt=''
              src={studsLogo}
              width='30'
              height='30'
              className='d-inline-block'
            />
          </div>
          <span className='mb-3 mb-md-0 text-muted'>&copy; 2021-2023 Studs</span>
        </div>
        <div className='col d-flex justify-content-center'>
          <a className='text-muted mx-1' href='https://www.facebook.com/StudsKTH/'><BsFacebook size={22} /></a>
          <a className='text-muted mx-1' href='https://www.linkedin.com/company/studs/'><BsLinkedin size={22} /></a>
          <a className='text-muted mx-1' href='https://www.instagram.com/studskth/'><BsInstagram size={22} /></a>
        </div>
      </div>
    </div>
  )
}
