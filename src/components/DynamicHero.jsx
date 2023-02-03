export default function DynamicHero ({ bgImg, title, description, primaryButtonText, secondaryButtonText, handleClickPrimary, handleClickSecondary, align }) {
  if (align === 'left') {
    return (
      <div className='container col-xxl-8 px-4 py-5'>
        <div className='row flex-lg-row-reverse align-items-center g-5 py-5'>
          <div className='col-10 col-sm-8 col-lg-6'>
            <img src={bgImg} className='d-block rounded mx-lg-auto img-fluid' alt='Bootstrap Themes' width='700' height='500' loading='eager' />
          </div>
          <div className='col-lg-6'>
            <h1 className='display-5 fw-bold lh-1 mb-3'>{title}</h1>
            <p className='lead'>{description}</p>
            <div className='d-grid gap-2 d-md-flex justify-content-md-start'>
              <button type='button' className='btn btn-primary btn-lg px-4 me-md-2' onClick={() => handleClickPrimary()}>{primaryButtonText}</button>
              <button type='button' className='btn btn-outline-secondary btn-lg px-4' onClick={() => handleClickSecondary()}>{secondaryButtonText}</button>
            </div>
          </div>
        </div>
      </div>
    )
  } else {
    return (
      <div className='container col-xxl-8 px-4 py-5'>
        <div className='row flex-lg-row-reverse align-items-center g-5 py-5'>
          <div className='col-lg-6'>
            <h1 className='display-5 fw-bold lh-1 mb-3'>{title}</h1>
            <p className='lead'>{description}</p>
            <div className='d-grid gap-2 d-md-flex justify-content-md-start'>
              <button type='button' className='btn btn-primary btn-lg px-4 me-md-2' onClick={() => handleClickPrimary()}>{primaryButtonText}</button>
              <button type='button' className='btn btn-outline-secondary btn-lg px-4' onClick={() => handleClickSecondary()}>{secondaryButtonText}</button>
            </div>
          </div>
          <div className='col-10 col-sm-8 col-lg-6'>
            <img src={bgImg} className='d-block rounded mx-lg-auto img-fluid' alt='Bootstrap Themes' width='700' height='500' loading='eager' />
          </div>
        </div>
      </div>
    )
  }
}
