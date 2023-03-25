import { HandleInstructionsContext } from '@/context'
import { useContext, useEffect, useState } from 'react'
import { Button, Spinner } from 'react-bootstrap'
import { useTranslation } from 'react-i18next'
import ElementGroup from '../../components/ElementGroup.tsx'
import generateGroupsInfo from './utils/generateGroupsInfo.jsx'
import { GroupInfo } from '@/models/GroupInfo.js'
import { AppData } from '@/models/AppData.js'

interface BlogProps {
  appData: AppData,
}


export default function Blog ({ appData, handleModals }) {
  const { t, i18n } = useTranslation()
  const [groupsInfo, setGroupsInfo] = useState<GroupInfo[]>([])
  const handleInstructions = useContext(HandleInstructionsContext)

  useEffect(() => {
    if (appData.blogPosts) {
      setGroupsInfo(generateGroupsInfo(appData))
    }
  }, [appData.blogPosts, i18n.language])

  function handleClickCard (id) {
    handleModals.on({
      name: 'PostModal',
      id: 'PostModal-View',
      post: appData.blogPosts.find((e) => e.id === id),
      mode: 'view',
      type: 'BlogPost'
    })
  }

  function handleClickEdit (id) {
    handleModals.on({
      name: 'PostModal',
      id: 'PostModal-Edit',
      post: appData.blogPosts.find((e) => e.id === id),
      mode: 'edit',
      type: 'BlogPost'
    })
  }

  function handleCreateClick () {
    handleModals.on({
      name: 'PostModal',
      id: 'PostModal-View',
      post: {},
      mode: 'edit',
      type: 'BlogPost'
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

  const showTools = (appData?.userDetails?.permissions || []).includes('blog_permission') || (appData?.userDetails?.permissions || []).includes('admin_permission')

  if (groupsInfo) {
    return (
      <div className='container-fluid mb-5' id='hanging-icons'>
        <div className='row row-cols-1 justify-content-center'>
          <div className='mt-5 mb-5 col-9'>
            <h1 className='fw-light'>{t('blog.title')}</h1>
            <p className='lead text-muted'>{t('blog.intro')}</p>
            {showTools && (
              <div className='d-flex gap-2'>
                <Button onClick={() => handleCreateClick()}>{t('blog.primaryButton')}</Button>
              </div>
            )}
          </div>
          <div className='col w-75'>
            {groupsInfo && appData.blogPosts && groupsInfo.map((group, groupIndex) => {
              return (
                <div key={`group-${groupIndex}`} className='mb-2'>
                  <ElementGroup expandStart type='cards' showTools={showTools} appData={appData} group={group} idx={groupIndex} groupTitle={group.title} elements={group.elements} handleClickCard={handleClickCard} handleClickEdit={handleClickEdit} handleClickDelete={handleClickDelete} />
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
