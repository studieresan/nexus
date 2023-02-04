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
    const lines = input.split('\n')
    const blocks = [{
      text: '',
      images: []
    }]
    let currentBlockIdx = 0
    let encounteredImg = false
    for (let i = 0; i < lines.length; i++) {
      if (lines[i].startsWith('\\image-')) {
        encounteredImg = true
        const imgIndex = lines[i].split('-')[1].trim()
        blocks[currentBlockIdx].images.push(post.pictures[imgIndex])
      } else {
        if (encounteredImg) {
          currentBlockIdx++
          encounteredImg = false
          blocks.push({
            text: '',
            images: []
          })
        }
        blocks[currentBlockIdx].text += `\n${lines[i]}`.trim()
      }
    }
    return blocks
  }

  return (
    <Modal show={modal.show} onHide={() => modal.off(modal)} size='xl' fullscreen='xxl-down' keyboard={false}>
      <Modal.Header closeButton className='py-2 text-gray-700'>
        {/* <Modal.Title>{title}</Modal.Title> */}
        <Modal.Title>&nbsp;</Modal.Title>
      </Modal.Header>
      <div className='d-flex px-4 bg-light'>
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
