import { BlogPost } from '@/models/BlogPost'
import { EventPost } from '@/models/EventPost'
import { ModalManager } from '@/models/Modal'
import { User } from '@/models/User'
import { useEffect, useRef } from 'react'
import { Button, Modal } from 'react-bootstrap'
import { useTranslation } from 'react-i18next'

export interface ConfirmModalProps {
  modal: ModalManager,
  data: {
    title: string,
    name: string,
    id: string,
    info: BlogPost | EventPost | User,
    children: JSX.Element,
    handleConfirm: (name: string, id: string, info: BlogPost | EventPost | User) => void,
    disabled?: boolean
  }
}

function ConfirmModal ({ modal, data }: ConfirmModalProps): JSX.Element {
  const cancelButtonRef = useRef<HTMLButtonElement>(null)

  const { t } = useTranslation()

  function handleModalClose () {
    modal.off(data.name, data.id)
  }

  useEffect(() => {
    cancelButtonRef?.current && cancelButtonRef.current.focus()
  }, [])

  return (
    <Modal show={modal.isModalVisible(data.name, data.id)} onHide={handleModalClose}>
      <Modal.Header closeButton={!data.disabled}>
        <Modal.Title>{data.title}</Modal.Title>
      </Modal.Header>
      <Modal.Body>{data.children}</Modal.Body>
      <Modal.Footer>
        <Button ref={cancelButtonRef} disabled={data.disabled} variant='secondary' onClick={handleModalClose}>
          {t('cancel')}
        </Button>
        <Button disabled={data.disabled} variant='primary' onClick={() => data.handleConfirm(data.name, data.id, data.info)}>
          {t('confirm')}
        </Button>
      </Modal.Footer>
    </Modal>
  )
}

export default ConfirmModal
