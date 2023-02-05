import { RxCross1 } from 'react-icons/rx'

export function AddedEventImage ({ picture, isFrontPicture, index, handleDeleteImage, imageRefs, iconRefs }) {
  return (
    <div key={index}>
      <div
        onClick={() => handleDeleteImage(index)}
        onMouseEnter={(e) => {
          if (imageRefs.current[index]) {
            imageRefs.current[index].style.boxShadow = '0 0 10px rgba(0,0,0,0.6)'
            imageRefs.current[index].style.filter = 'brightness(60%)'
          }
          if (iconRefs.current[index]) {
            iconRefs.current[index].style.opacity = 1
          }
        }}
        onMouseLeave={(e) => {
          if (imageRefs.current[index]) {
            imageRefs.current[index].style.boxShadow = 'none'
            imageRefs.current[index].style.filter = 'brightness(100%)'
          }
          if (iconRefs.current[index]) {
            iconRefs.current[index].style.opacity = 0
          }
        }}
        style={{ position: 'relative', cursor: 'pointer' }}
      >
        <img
          ref={(el) => { imageRefs.current[index] = el }}
          src={picture}
          className='img-fluid'
          alt=''
        />
        <div
          style={{ opacity: 0 }} ref={(el) => { iconRefs.current[index] = el }}
        >
          <RxCross1
            size={60}
            className='text-light cross-icon'
            style={{
              fontWeight: '100',
              position: 'absolute',
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%)'
            }}
          />
        </div>
      </div>
      {!isFrontPicture && <div className='d-flex justify-content-center'>\image-{index}</div>}

    </div>
  )
}
