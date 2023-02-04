import { BsFacebook, BsInstagram, BsLinkedin } from 'react-icons/bs'
import studsLogo from '@/assets/images/Logo_ROUND.png'
import goldman_sachs from '@/assets/images/goldman_sachs.png'
import karma from '@/assets/images/karma.png'
import scania from '@/assets/images/scania.png'
import storykit from '@/assets/images/storykit.png'
import fra from '@/assets/images/fra.png'
import { useTranslation } from 'react-i18next'

export default function Footer () {
  const { t, i18n } = useTranslation()

  return (
    <div className='container-fluid p-4'>
      <div className='text-center fst-italic fs-4'>
        {t('footer.collaborations')}
      </div>
      <div className='row row-cols-2 my-4'>
        <div className='col-12 d-flex flex-wrap justify-content-center gap-3 mb-4'>
          <img src={goldman_sachs} alt='Goldman Sachs' style={{ width: '200px', height: 'auto' }} />
          <img src={karma} alt='Karma' style={{ width: '200px', height: 'auto' }} />
          <img src={scania} alt='Scania' style={{ width: '200px', height: 'auto' }} />
        </div>
        <div className='col-12 d-flex flex-wrap justify-content-center gap-3'>
          <img src={storykit} alt='Storykit' style={{ width: '200px', height: 'auto' }} />
          <img src={fra} alt='FRA' style={{ width: '200px', height: 'auto' }} />
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
