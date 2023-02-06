import { HandleInstructionsContext } from '@/context.js'
import { useContext, useEffect, useState } from 'react'
import { Button, Spinner } from 'react-bootstrap'
import { useTranslation } from 'react-i18next'
import { BsPinMap } from 'react-icons/bs'
import { IoPersonSharp } from 'react-icons/io5'
import CardGroup from '../../components/CardGroup.jsx'
export default function Events ({ appData, handleModals }) {
  const { t, i18n } = useTranslation()
  const [groupsInfo, setGroupsInfo] = useState(null)
  const handleInstructions = useContext(HandleInstructionsContext)

  useEffect(() => {
    if (appData.events) {
      // event groups divided based on year
      const years = [...new Set(appData.events.map((e) => parseInt(e.date.getFullYear())))].sort((a, b) => b - a)
      const newGroupsInfo = years.map((year) => ({ year, title: t('events.groupTitle') + ' ' + year }))

      for (let i = 0; i < newGroupsInfo.length; i++) {
        const includeUnpublished = appData.loggedIn && ((appData?.userDetails?.permissions || []).includes('event_permission') || (appData?.userDetails?.permissions || []).includes('admin_permission'))
        const matchedBlogPosts = appData.events.filter((e) => (e.published || includeUnpublished) && parseInt(e.date.getFullYear()) === newGroupsInfo[i].year)
        const elements = matchedBlogPosts.map((e) => ({
          id: e.id,
          cardTitle: e.company.name,
          cornerImg: <div className='me-2 ratio ratio-1x1' style={{ width: 25, height: 25 }}><BsPinMap /></div>,
          cornerText: e.location || t('events.noLocation'),
          dateText: e.date.toISOString().slice(0, 10),
          bgImg: e.pictures[0],
          danger: e.published ? null : t('events.notPublished')
        }))
        newGroupsInfo[i].elements = elements
      }

      setGroupsInfo(newGroupsInfo)
    }
  }, [appData, i18n.language])

  function handleClickCard (id) {
    handleModals.on({
      name: 'EventModal',
      id: 'EventModal-View',
      post: appData.events.find((e) => e.id === id),
      mode: 'view'
    })
  }

  function handleClickEdit (id) {
    handleModals.on({
      name: 'EventModal',
      id: 'EventModal-Edit',
      post: appData.events.find((e) => e.id === id),
      mode: 'edit'
    })
  }

  async function handleConfirmDelete ({ modal, data }) {
    await handleInstructions('deleteEvent', { toDeleteId: data.post.id })
    modal.off(modal)
  }

  async function handleClickDelete (id) {
    const post = appData.blogPosts.find((e) => e.id === id)
    handleModals.on({
      name: 'ConfirmModal',
      id: 'EventModal-Delete',
      title: t('blog.deleteEventTitle'),
      children: <div><span className='fw-light'>{t('event.deleteEventDescription')}{': '}</span><span className='fw-bold'>{post.title}</span></div>,
      mode: 'delete',
      post: appData.events.find((e) => e.id === id),
      handleConfirm: handleConfirmDelete
    })
  }

  function handleCreateClick () {
    handleModals.on({
      name: 'EventModal',
      id: 'EventModal-View',
      post: {},
      mode: 'edit'
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
                    <CardGroup expandStart={groupIndex === 0} showTools={showTools} appData={appData} group={group} idx={groupIndex} groupTitle={group.title} elements={group.elements} handleClickCard={handleClickCard} handleClickEdit={handleClickEdit} handleClickDelete={handleClickDelete} />
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
