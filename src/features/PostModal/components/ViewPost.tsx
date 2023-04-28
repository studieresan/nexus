import { Tools } from '@/components/Tools'
import { useWindowWidth } from '@/hooks/useWindowWidth'
import { AppData } from '@/models/AppData'
import { BlogPost } from '@/models/BlogPost'
import { EventPost } from '@/models/EventPost'
import { ModalManager } from '@/models/Modal'
import { PostModalData } from '@/models/PostModal'
import { Permission } from '@/models/User'
import { getDescriptionSize } from '@/utils/fontSizing'
import { useEffect, useState } from 'react'
import { Carousel, Modal } from 'react-bootstrap'

interface ViewPostProps {
  post: BlogPost | EventPost
  data: PostModalData
  modal: ModalManager
  appData: AppData
}

interface InputBlock {
  text: string
  images: string[]
}

export default function ViewPost ({ post, data, modal, appData }: ViewPostProps) {
  const [inputBlocks, setInputBlocks] = useState<InputBlock[] | null>(null)
  const windowWidth = useWindowWidth();
  useEffect(() => {
    if (post.description) {
      setInputBlocks(parseInputBlocks(post.description))
    }
  }, [post])

  function parseInputBlocks (input: string) {
    const lines = input.split('\n')
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
        if (lines[i].trim()) {
          blocks[currentBlockIdx].text += `${lines[i].trim()}\n\n`
        }
      }
    }
    return blocks
  }

  let toolsToShow = {edit: false, delete: false}
  if (data.type === 'blogPost' && appData.userDetails?.permissions.includes(Permission.Blog)) {
    toolsToShow = {edit: true, delete: true}
  } else if (data.type === 'eventPost' && appData.userDetails?.permissions.includes(Permission.Events)) {
    toolsToShow = {edit: true, delete: true}
  } else if (appData.userDetails?.permissions.includes(Permission.Admin)) {
    toolsToShow = {edit: true, delete: true}
  }
    
  function handleClickEditAndClose() {
    data.handleClickEdit(post.id)
    modal.off(data.name, data.id)
  }

  function handleClickDeleteAndClose() {
    data.handleClickDelete(post.id)
    modal.off(data.name, data.id)
  }

  return (
    <Modal 
      show={modal.isModalVisible(data.name, data.id)} 
      onHide={() => modal.off(data.name, data.id)} 
      size='xl' 
      fullscreen='xxl-down' 
      keyboard={false}
    >
      <Modal.Header closeButton className='px-4 py-3 text-gray-700'>
        {/* <Modal.Title>{title}</Modal.Title> */}
        <Modal.Title>{(toolsToShow.edit || toolsToShow.delete) && <Tools id={post.id} handleClickEdit={handleClickEditAndClose} handleClickDelete={handleClickDeleteAndClose} inline={true} opacity={1} toolsToShow={toolsToShow}/>}</Modal.Title>
      </Modal.Header>
      <Modal.Body className='p-4'>
        <h1 className='fw-bold'>{post.title}</h1>
        {inputBlocks && inputBlocks.map((block, index) => (
          <div key={index}>
            <div className={`fs-5`} style={{whiteSpace: 'pre-line'}}>{block.text.trim()}</div>
            <div className='row g-1 row-cols-1 row-cols-xxl-2 justify-content-center my-4'>
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
    </Modal>
  )
}
