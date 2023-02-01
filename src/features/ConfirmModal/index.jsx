import { useEffect, useRef } from 'react'
import { Button, Modal } from 'react-bootstrap'
import { useTranslation } from 'react-i18next'

function ConfirmModal ({ modal, data }) {
  const cancelButtonRef = useRef()

  const { t } = useTranslation()

  function handleModalClose () {
    modal.off(modal)
  }

  useEffect(() => {
    cancelButtonRef.current.focus()
  }, [])

  return (
    <Modal show={modal.show} onHide={handleModalClose}>
      <Modal.Header closeButton={!data.disabled}>
        <Modal.Title>{data.title}</Modal.Title>
      </Modal.Header>
      <Modal.Body>{data.children}</Modal.Body>
      <Modal.Footer>
        <Button ref={cancelButtonRef} disabled={data.disabled} variant='secondary' onClick={handleModalClose}>
          {t('cancel')}
        </Button>
        <Button disabled={data.disabled} variant='primary' onClick={() => data.handleConfirm({ modal, data })}>
          {t('confirm')}
        </Button>
      </Modal.Footer>
    </Modal>
  )
}

export default ConfirmModal
