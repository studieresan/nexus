import { useEffect, useState } from 'react'
import { Carousel, Modal } from 'react-bootstrap'
import { useTranslation } from 'react-i18next'
export default function BlogPost ({ modal, data }) {
  const { t, i18n } = useTranslation()
  const [inputBlocks, setInputBlocks] = useState(null)

  useEffect(() => {
    if (data.post.description) {
      setInputBlocks(parseInputBlocks(data.post.description))
    }
  }, [data.post])

  function handleCloseModal () {
    modal.off(modal)
  }

  function parseInputBlocks (input) {
    const blocks = input.split(/\n\\image-[0-9]+/g)
    const imageBlocks = []
    blocks.forEach((block, index) => {
      if (index < blocks.length - 1) {
        if (imageBlocks.length === 0 || imageBlocks[imageBlocks.length - 1].images.length > 0) {
          imageBlocks.push({
            text: block.trim(),
            images: [data.post.pictures[index]]
          })
        } else {
          imageBlocks[imageBlocks.length - 1].text += `\n${block.trim()}`
          imageBlocks[imageBlocks.length - 1].images.push(data.post.pictures[index])
        }
      } else {
        imageBlocks[imageBlocks.length - 1].text += `\n${block.trim()}`
      }
    })

    const result = []
    for (let i = 0; i < imageBlocks.length; i++) {
      if (imageBlocks[i].text.trim() === '' && i > 0) {
        result[result.length - 1].images = result[result.length - 1].images.concat(imageBlocks[i].images)
      } else {
        result.push(imageBlocks[i])
      }
    }

    return result
  }

  return (
    <div>
      <Modal show={modal.show} closeButton onHide={handleCloseModal} size='xl' keyboard={false}>

        <Modal.Header closeButton className='py-2 text-gray-700'>
          {/* <Modal.Title>{title}</Modal.Title> */}
          <Modal.Title>&nbsp;</Modal.Title>
        </Modal.Header>
        <div className='d-flex px-4'>
          <Modal.Body>
            <h1 className='fw-light'>{data.post.title}</h1>
            {inputBlocks && inputBlocks.map((block, index) => (
              <div key={index}>
                <p className='lead text-muted'>{block.text}</p>
                <div className='row g-1 row-cols-1 row-cols-xxl-2 justify-content-center mb-5'>
                  <Carousel className='w-100'>
                    {block.images.map((image, index) => (
                      <Carousel.Item key={index}>
                        <img src={image} className='img-fluid' alt='' />
                      </Carousel.Item>
                    ))}
                  </Carousel>
                </div>
              </div>
            ))}
          </Modal.Body>
        </div>
      </Modal>
    </div>
  )
}
