import { HandleInstructionsContext } from '@/context.js'
import { useContext, useEffect, useState } from 'react'
import { Button, Spinner } from 'react-bootstrap'
import { useTranslation } from 'react-i18next'
import { BsPinMap } from 'react-icons/bs'
import { IoPersonSharp } from 'react-icons/io5'
import ElementGroup from '../../components/ElementGroup'
import generateGroupsInfo from '@/utils/generateGroupsInfo'
import { AppData } from '@/models/AppData'
import { ModalData, ModalManager } from '@/models/Modal'
import { GroupInfo } from '@/models/GroupInfo'
import { assertDefined } from '@/utils/assertDefined'
import { Event } from '@/models/Event'

interface EventsProps {
  appData: AppData
  handleModals: ModalManager
}

export default function Events ({ appData, handleModals }: EventsProps): JSX.Element {
  const { t, i18n } = useTranslation()
  const [groupsInfo, setGroupsInfo] = useState<GroupInfo[]>([])
  const handleInstructions = useContext(HandleInstructionsContext)

  useEffect(() => {
    if (appData.events) {
      const groupsInfo = generateGroupsInfo(appData, 'event')
      console.log('groupsInfo', groupsInfo)
      setGroupsInfo(groupsInfo)
    }
  }, [appData, i18n.language])

  function handleClickCard (id: string) {
    assertDefined(appData.events, 'handleClickCard appData.events undefined', 'appData.events')
    const event = (appData.events || []).find((e) => e.id === id)
    if (!event) {
      throw new Error('handleClickCard event undefined')
    }
    handleModals.on({
      name: 'PostModal',
      id: 'PostModal-View',
      post: event,
      mode: 'view',
      type: 'Event'
    })
  }

  function handleClickEdit (id: string) {
    assertDefined(appData.events, 'handleClickEdit appData.events undefined', 'appData.events')
    const event = (appData.events || []).find((e) => e.id === id)
    if (!event) {
      throw new Error('handleClickCard event undefined')
    }
    handleModals.on({
      name: 'PostModal',
      id: 'PostModal-Edit',
      post: event,
      mode: 'edit',
      type: 'Event'
    })
  }

  function handleCreateClick () {
    handleModals.on({
      name: 'PostModal',
      id: 'PostModal-View',
      post: {},
      mode: 'edit',
      type: 'Event'
    })
  }
  async function handleConfirmDelete (modal: ModalData, data: Event) {
    await handleInstructions('deleteEvent', { toDeleteId: data.id })
    modal.off(modal)
  }

  async function handleClickDelete (id: string) {
    assertDefined(appData.events, 'handleClickEdit appData.events undefined', 'appData.events')
    const event = (appData.events || []).find((e) => e.id === id)
    if (!event) {
      throw new Error('handleClickCard event undefined')
    }
    handleModals.on({
      name: 'ConfirmModal',
      id: 'EventModal-Delete',
      title: t('post.deletePostTitle'),
      children: <div><span className='fw-light'>{t('post.deleteDescription')}{': '}</span><span className='fw-bold'>{event.title}</span></div>,
      mode: 'delete',
      post: event,
      handleConfirm: handleConfirmDelete
    })
  }

  const showTools = (appData?.userDetails?.permissions || []).includes('event_permission') || (appData?.userDetails?.permissions || []).includes('admin_permission')
  if (groupsInfo) {
    return (
      <div className='container-fluid mb-5' id='hanging-icons'>
        <div className='row row-cols-1 justify-content-center'>
          <div className='my-5 col-9'>
            <div>
              <h1 className='fw-light'>{t('events.title')}</h1>
              <p className='lead text-muted'>{t('events.intro')}</p>
              {showTools && (
                <div className='d-flex gap-2'>
                  <Button onClick={() => handleCreateClick()}>{t('events.primaryButton')}</Button>
                </div>
              )}
            </div>
          </div>
          <div className='container-fluid col-9'>
            <div className='row'>
              {groupsInfo && appData.events && groupsInfo.map((group, groupIndex) => {
                return (
                  <div key={`group-${groupIndex}`} className='mb-2'>
                    <ElementGroup expandStart={groupIndex === 0} type='cards' showTools={showTools} appData={appData} idx={groupIndex} groupTitle={group.title} elements={group.elements} handleClickCard={handleClickCard} handleClickEdit={handleClickEdit} handleClickDelete={handleClickDelete} />
                  </div>
                )
              })}
            </div>
          </div>
        </div>
      </div>
    )
  } else {
    return (
      <div className='d-flex justify-content-center align-items-center vh-100'>
        <div className='w-80 d-flex'>
          <Spinner variant='primary' animation='grow' role='status' style={{ width: 75, height: 75 }}>
            <span className='visually-hidden'>Loading...</span>
          </Spinner>
        </div>
      </div>
    )
  }
}
