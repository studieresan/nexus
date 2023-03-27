import { BlogPost } from '@/models/BlogPost'
import { EventPost } from '@/models/EventPost'
import { ModalManager } from '@/models/Modal'
import { PostModalData } from '@/models/PostModal'
import { useEffect, useState } from 'react'
import { Carousel, Modal } from 'react-bootstrap'

interface ViewPostProps {
  post: BlogPost | EventPost
  data: PostModalData
  modal: ModalManager
}

interface InputBlock {
  text: string
  images: string[]
}

export default function ViewPost ({ post, data, modal }: ViewPostProps) {
  const [inputBlocks, setInputBlocks] = useState<InputBlock[] | null>(null)
  console.log('post 222: ', post)
  useEffect(() => {
    if (post.description) {
      setInputBlocks(parseInputBlocks(post.description))
    }
  }, [post])

  function parseInputBlocks (input: string) {
    const lines = input.split('\n')
    console.log(lines)
    const blocks: InputBlock[] = [{
      text: '',
      images: []
    }]
    let currentBlockIdx = 0
    let encounteredImg = false
    for (let i = 0; i < lines.length; i++) {
      if (lines[i].startsWith('\\image-')) {
        encounteredImg = true
        const imgIndex = parseInt(lines[i].split('-')[1].trim())
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
    <Modal show={modal.isModalVisible(data.name, data.id)} onHide={() => modal.off(data.name, data.id)} size='xl' fullscreen='xxl-down' keyboard={false}>
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
