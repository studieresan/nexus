import { useEffect, useState } from 'react'
import { Carousel, Modal } from 'react-bootstrap'

export default function ViewPost ({ post, modal }) {
  const [inputBlocks, setInputBlocks] = useState(null)

  useEffect(() => {
    if (post.description) {
      setInputBlocks(parseInputBlocks(post.description))
    }
  }, [post])

  function parseInputBlocks (input) {
    const split = input.trim().split(/\n\\image-[0-9]+/g)
    const blocks = split.slice(0, split.length - 1)
    const tokens = input.trim().match(/\n\\image-[0-9]+/g)
    const imageBlocks = []
    blocks.forEach((block, index) => {
      const imgIndex = tokens[index].split('-')[1].trim()
      if (index < blocks.length - 1) {
        if (imageBlocks.length === 0 || imageBlocks[imageBlocks.length - 1].images.length > 0) {
          imageBlocks.push({
            text: block.trim(),
            images: [post.pictures[imgIndex]]
          })
        } else {
          imageBlocks[imageBlocks.length - 1].text += `\n${block.trim()}`
          imageBlocks[imageBlocks.length - 1].images.push(post.pictures[index])
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
    <Modal show={modal.show} onHide={() => modal.off(modal)} size='xl' keyboard={false}>
      <Modal.Header closeButton className='py-2 text-gray-700'>
        {/* <Modal.Title>{title}</Modal.Title> */}
        <Modal.Title>&nbsp;</Modal.Title>
      </Modal.Header>
      <div className='d-flex px-4'>
        <Modal.Body>
          <h1 className='fw-light'>{post.title}</h1>
          {inputBlocks && inputBlocks.map((block, index) => (
            <div key={index}>
              <p className='lead text-muted'>{block.text}</p>
              <div className='row g-1 row-cols-1 row-cols-xxl-2 justify-content-center mb-5'>
                {block.images.length === 1
                  ? (
                    <div className='w-100'>
                      <img src={block.images[0]} className='img-fluid' alt='' />
                    </div>
                    )
                  : (
                    <Carousel className='w-100'>
                      {block.images.map((image, index) => (
                        <Carousel.Item key={index}>
                          <img src={image} className='img-fluid' alt='' />
                        </Carousel.Item>
                      ))}
                    </Carousel>

                    )}
              </div>
            </div>
          ))}
        </Modal.Body>
      </div>
    </Modal>
  )
}
