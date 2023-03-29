import { BsFacebook, BsInstagram, BsLinkedin } from 'react-icons/bs'
import studsLogo from '@/assets/images/logo2023.png'
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

  return (
    <div className='container-fluid p-4 bg-dark text-white'>
      <div className='row row-cols-2'>
        <div className='col-12 col-md-6 d-flex justify-content-end'>
          <div className='col-6 me-5'>
            <div className='row row-cols-1'>
                <div className='col-6 text-center'>
                  <img src={studsLogo} style={imgStyle} alt='Studs Logo' />
                </div>
            </div>
            <div className='row row-cols-2 justify-content-center my-5'>
                <div className='col-12 col-md-6 text-center'>
                  <Contact element={contacts[0]} />
                </div>
                <div className='col-12 col-md-6 text-center'>
                  <Contact element={contacts[1]} />
                </div>
            </div>
          </div>
        </div>
        <div className='col-12 col-md-6'>
  <div className='row g-0' style={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
    <div style={{ marginRight: '1rem', transform: 'rotate(90deg)', transformOrigin: 'top left' }}>
      Test
    </div>
    <div className='text-left'>
      Test 2
    </div>
  </div>
</div>
 
      </div>

      <div className='row row-cols-1 col-12 justify-content-center'>
        <hr className='col-9 opacity-25' style={{ height: 1, opacity: 1 }} />
      </div>
      <div className='col d-flex justify-content-center'>
        <a className='text-muted mx-1' href='https://www.facebook.com/StudsKTH/'><BsFacebook size={22} /></a>
        <a className='text-muted mx-1' href='https://www.linkedin.com/company/studs/'><BsLinkedin size={22} /></a>
        <a className='text-muted mx-1' href='https://www.instagram.com/studskth/'><BsInstagram size={22} /></a>
      </div>
    </div>
  )
}
