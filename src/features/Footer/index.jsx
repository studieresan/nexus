import { BsFacebook, BsInstagram, BsLinkedin } from 'react-icons/bs'
import studsLogo from '@/assets/images/Logo_ROUND.png'
export default function Footer () {
  return (
    <div className='container-fluid p-4'>
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
