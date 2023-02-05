import { Carousel } from 'react-bootstrap'
import { useTranslation } from 'react-i18next'

export default function Content ({ post }) {
  const { t } = useTranslation()
  let images = null
  if (post.pictures.length === 0) {
    images = <div />
  } else if (post.pictures.length === 1) {
    images = (
      <div className='w-100'>
        <img src={post.images[0]} className='img-fluid' alt='' />
      </div>
    )
  } else {
    images = (
      <Carousel className='w-100'>
        {post.pictures.map((image, index) => (
          <Carousel.Item key={index}>
            <div className='d-flex justify-content-center'>
              <img src={image} className='img-fluid' alt='' />
            </div>
          </Carousel.Item>
        ))}
      </Carousel>
    )
  }
  console.log('post', post)
  return (
    <div>
      <h1 className='fw-light'>{t('event') + ': '}{post.company.name}</h1>
      <p className='lead text-muted'>{post.publicDescription}
      </p>
      <div className='row g-1 row-cols-1 row-cols-xxl-2 justify-content-center mb-5'>
        {images}
      </div>
    </div>
  )
}
