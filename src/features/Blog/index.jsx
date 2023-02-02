import { HandleInstructionsContext } from '@/context.js'
import { useContext, useEffect, useState } from 'react'
import { Spinner } from 'react-bootstrap'
import { useTranslation } from 'react-i18next'
import BlogGroup from './components/BlogGroup.jsx'
import BlogIntro from './components/BlogIntro.jsx'
export default function Blog ({ appData, handleModals }) {
  const { t, i18n } = useTranslation()
  const [showGroup, setShowGroup] = useState(null)
  const [groupsInfo, setGroupsInfo] = useState(null)
  const handleInstructions = useContext(HandleInstructionsContext)

  useEffect(() => {
    if (appData.blogPosts && groupsInfo) {
      setShowGroup(showGroup ? [...showGroup] : Array(groupsInfo.length).fill(true))
    }
  }, [appData.blogPosts, groupsInfo])

  useEffect(() => {
    if (appData.blogPosts) {
      const years = [...new Set(appData.blogPosts.map((e) => parseInt(e.date.slice(0, 4))))].sort((a, b) => b - a)
      setGroupsInfo(years.map((year) => ({ year, title: t('blog.groupTitle') + ' ' + year })))
    }
  }, [appData.blogPosts, i18n.language])

  function handleClickGroup (groupIndex) {
    const newShowGroup = [...showGroup]
    newShowGroup[groupIndex] = !newShowGroup[groupIndex]
    setShowGroup(newShowGroup)
  }

  function handleClickCard (id) {
    handleModals.on({
      name: 'BlogPostModal',
      id: 'BlogPostModal-View',
      post: appData.blogPosts.find((e) => e.id === id),
      mode: 'view'
    })
  }

  function handleClickEdit (id) {
    handleModals.on({
      name: 'BlogPostModal',
      id: 'BlogPostModal-Edit',
      post: appData.blogPosts.find((e) => e.id === id),
      mode: 'edit'
    })
  }

  async function handleConfirmDelete ({ modal, data }) {
    await handleInstructions('deleteBlogPost', { toDeleteId: data.post.id })
    modal.off(modal)
  }

  async function handleClickDelete (id) {
    const post = appData.blogPosts.find((e) => e.id === id)
    handleModals.on({
      name: 'ConfirmModal',
      id: 'BlogPostModal-Delete',
      title: t('blog.deletePostTitle'),
      children: <div><span className='fw-light'>{t('blog.deletePostDescription')}{': '}</span><span className='fw-bold'>{post.title}</span></div>,
      mode: 'delete',
      post: appData.blogPosts.find((e) => e.id === id),
      handleConfirm: handleConfirmDelete
    })
  }

  if (groupsInfo && showGroup) {
    return (
      <div className='container-fluid'>
        <div className='row row-cols-1 w-100 justify-content-center'>
          <div className='col my-5 w-75'>
            <BlogIntro handleModals={handleModals} />
          </div>
          <div className='col w-75'>
            {groupsInfo && showGroup && groupsInfo.map((group, groupIndex) => (
              <div key={`group-${groupIndex}`} className='mb-2'>
                <BlogGroup appData={appData} showGroup={showGroup} setShowGroup={setShowGroup} group={group} groupIndex={groupIndex} handleClickGroup={handleClickGroup} handleClickCard={handleClickCard} handleClickEdit={handleClickEdit} handleClickDelete={handleClickDelete} />
              </div>
            ))}
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
