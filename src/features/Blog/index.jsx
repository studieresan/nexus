import { HandleInstructionsContext } from '@/context.js'
import { useContext, useEffect, useState } from 'react'
import { Button, Spinner } from 'react-bootstrap'
import { useTranslation } from 'react-i18next'
import { AiOutlinePlus } from 'react-icons/ai'
import { IoPersonSharp } from 'react-icons/io5'
import GroupOfCards from '../../components/CardGroup.jsx'
import generateGroupsInfo from './utils/generateGroupsInfo.jsx'
export default function Blog ({ appData, handleModals }) {
  const { t, i18n } = useTranslation()
  const [groupsInfo, setGroupsInfo] = useState(null)
  const handleInstructions = useContext(HandleInstructionsContext)

  useEffect(() => {
    if (appData.blogPosts) {
      setGroupsInfo(generateGroupsInfo(appData))
    }
  }, [appData.blogPosts, i18n.language])

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

  function handleCreateClick () {
    handleModals.on({
      name: 'BlogPostModal',
      id: 'BlogPostModal-View',
      post: {},
      mode: 'edit'
    })
  }

  if (groupsInfo) {
    return (
      <div className='container-fluid mb-5' id='hanging-icons'>
        <div className='row row-cols-1 col-12 justify-content-center'>
          <div className='my-5 col-9'>
            <h1 className='fw-light'>{t('blog.title')}</h1>
            <p className='lead text-muted'>{t('blog.intro')}</p>
            <div className='d-flex gap-2'>
              <Button onClick={() => handleCreateClick()}>{t('blog.primaryButton')}</Button>
            </div>
          </div>
          <div className='col w-75'>
            {groupsInfo && appData.blogPosts && groupsInfo.map((group, groupIndex) => {
              return (
                <div key={`group-${groupIndex}`} className='mb-2'>
                  <GroupOfCards appData={appData} group={group} idx={groupIndex} groupTitle={group.title} elements={group.elements} handleClickCard={handleClickCard} handleClickEdit={handleClickEdit} handleClickDelete={handleClickDelete} />
                </div>
              )
            })}
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
