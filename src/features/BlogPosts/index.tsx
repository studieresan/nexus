import { HandleInstructionsContext } from '@/context'
import { useContext, useEffect, useState } from 'react'
import { Button, Spinner } from 'react-bootstrap'
import { useTranslation } from 'react-i18next'
import ElementGroup from '../../components/ElementGroup'
import generateGroupsInfo from '@/utils/getDynamicYearGroupsInfo'
import { DynamicYearGroup } from '@/models/DynamicYearGroup.js'
import { AppData } from '@/models/AppData.js'
import { ModalData, ModalManager } from '@/models/Modal.js'
import { BlogPost } from '@/models/BlogPost.js'

interface BlogProps {
  appData: AppData
  handleModals: ModalManager
}


export default function BlogPosts ({ appData, handleModals }: BlogProps): JSX.Element {
  const { t, i18n } = useTranslation()
  const [groupsInfo, setGroupsInfo] = useState<DynamicYearGroup[]>([])
  const handleInstructions = useContext(HandleInstructionsContext)

  useEffect(() => {
    if (appData.blogPosts) {
      setGroupsInfo(generateGroupsInfo(appData, 'blog'))
    }
  }, [appData.blogPosts, i18n.language])

  function handleClickCard (id: string) {
    const post = (appData.blogPosts || []).find((e) => e.id === id)
    if (!post) {
      throw new Error('handleClickEdit post undefined')
    }
    handleModals.on({
      name: 'PostModal',
      id: 'PostModal-View',
      post: post,
      mode: 'view',
      type: 'BlogPost'
    })
  }

  function handleClickEdit (id: string) {
    const post = (appData.blogPosts || []).find((e) => e.id === id)
    if (!post) {
      throw new Error('handleClickEdit post undefined')
    }
    handleModals.on({
      name: 'PostModal',
      id: 'PostModal-Edit',
      post: post,
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

  async function handleConfirmDelete (modal: ModalData, data: BlogPost) {
    await handleInstructions('deleteBlogPost', { toDeleteId: data.id })
    modal.off(modal)
  }

  async function handleClickDelete (id: string) {
    const post = (appData.blogPosts || []).find((e) => e.id === id)
    if (!post) {
      throw new Error('handleClickDelete post undefined')
    }
    handleModals.on({
      name: 'ConfirmModal',
      id: 'BlogPostModal-Delete',
      title: t('blog.deletePostTitle'),
      children: <div><span className='fw-light'>{t('blog.deletePostDescription')}{': '}</span><span className='fw-bold'>{post.title}</span></div>,
      mode: 'delete',
      post: (appData.blogPosts || []).find((e) => e.id === id),
      handleConfirm: handleConfirmDelete
    })
  }

  const showTools = (appData?.userDetails?.permissions || []).includes('blog_permission') || (appData?.userDetails?.permissions || []).includes('admin_permission')

  if (groupsInfo) {
    return (
      <div className='container-fluid mb-5' id='hanging-icons'>
        <div className='row row-cols-1 justify-content-center'>
          <div className='mb-5 mt-3 col-9'>
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
                  <ElementGroup expandStart type='cards' showTools={showTools} appData={appData} idx={groupIndex} groupTitle={group.title} elements={group.elements} handleClickCard={handleClickCard} handleClickEdit={handleClickEdit} handleClickDelete={handleClickDelete} />
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
