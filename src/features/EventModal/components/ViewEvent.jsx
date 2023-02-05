import { useEffect, useState } from 'react'
import { Carousel, Modal } from 'react-bootstrap'
import ViewEventContent from './ViewEventContent.jsx'

export default function ViewPost ({ post, modal }) {
  return (
    <Modal show={modal.show} onHide={() => modal.off(modal)} size='xl' fullscreen='xxl-down' keyboard={false}>
      <Modal.Header closeButton className='py-2 text-gray-700'>
        {/* <Modal.Title>{title}</Modal.Title> */}
        <Modal.Title>&nbsp;</Modal.Title>
      </Modal.Header>
      <div className='d-flex px-4 bg-light'>
        <Modal.Body>
          <ViewEventContent post={post} />
        </Modal.Body>
      </div>
    </Modal>
  )
}
