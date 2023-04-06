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
import { Permission } from '@/models/User'
import { useWindowWidth } from '@/hooks/useWindowWidth'
import { getDescriptionSize } from '@/utils/fontSizing'

interface BlogProps {
  appData: AppData
  handleModals: ModalManager
}


export default function BlogPosts ({ appData, handleModals }: BlogProps): JSX.Element {
  const { t, i18n } = useTranslation()
  const [groupsInfo, setGroupsInfo] = useState<DynamicYearGroup[]>([])
  const handleInstructions = useContext(HandleInstructionsContext)
  const windowWidth = useWindowWidth();
  useEffect(() => {
    if (appData.blogPosts) {
      setGroupsInfo(generateGroupsInfo(appData, 'blog', windowWidth))
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
      type: 'blogPost',
      handleClickEdit: handleClickEdit,
      handleClickDelete: handleClickDelete
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
      type: 'blogPost'
    })
  }

  function handleCreateClick () {
    handleModals.on({
      name: 'PostModal',
      id: 'PostModal-View',
      post: {},
      mode: 'edit',
      type: 'blogPost'
    })
  }

  async function handleConfirmDelete (name: string, id: string, post: BlogPost) {
    await handleInstructions('deleteBlogPost', { toDeleteId: post.id })
    handleModals.off(name, id)
  }

  async function handleClickDelete (id: string) {
    const post = (appData.blogPosts || []).find((e) => e.id === id)
    if (!post) {
      throw new Error('handleClickDelete post undefined')
    }
    handleModals.on({
      name: 'ConfirmModal',
      id: 'BlogPostModal-Delete',
      title: t('blogPost.deletePostTitle'),
      children: <div><span className='fw-light'>{t('blog.deletePostDescription')}{': '}</span><span className='fw-bold'>{post.title}</span></div>,
      mode: 'delete',
      info: post,
      handleConfirm: handleConfirmDelete
    })
  }

  const toolsToShow = (appData?.userDetails?.permissions || []).includes(Permission.Blog) || (appData?.userDetails?.permissions || []).includes(Permission.Admin) ? { edit: true, delete: true } : { edit: false, delete: false }
  
  if (groupsInfo) {
    return (
      <div className='container-fluid mb-5' id='hanging-icons'>
        <div className='row row-cols-1 justify-content-center'>
          <div className='mb-5 mt-3 col-11 col-lg-9'>
          <div className='fw-bold py-2 fs-1 display-5'>{t('blog.title')}</div>
          <div className={`fw-light ${getDescriptionSize(windowWidth)}`}>{t('blog.intro')}</div>
            {toolsToShow.edit && (
              <div className='d-flex gap-2 mt-3'>
                <Button className='studs-bg' size='lg' onClick={() => handleCreateClick()}>{t('blog.primaryButton')}</Button>
              </div>
            )}
          </div>
          <div className='container-fluid col-11 col-lg-9'>
            <div className='row'>
            {groupsInfo && appData.blogPosts && groupsInfo.map((group, groupIndex) => {
              return (
                <div key={`group-${groupIndex}`} className='mb-2'>
                  <ElementGroup expandStart type='cards' toolsToShow={toolsToShow} appData={appData} idx={groupIndex} groupTitle={group.title} elements={group.elements} handleClickCard={handleClickCard} handleClickEdit={handleClickEdit} handleClickDelete={handleClickDelete} />
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
