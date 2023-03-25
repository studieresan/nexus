import { HandleInstructionsContext } from '@/context.js'
import { createBlogPost, updateBlogPost, uploadImage } from '@/requests/api'
import { useContext, useEffect, useRef, useState } from 'react'
import { Alert, Button, FloatingLabel, Form, FormControl, Modal } from 'react-bootstrap'
import { Trans, useTranslation } from 'react-i18next'
import { AddedImage } from './AddedImage.jsx'
export default function EditPost ({ modal, appData, post, handleSubmit }) {
  const [formData, setFormData] = useState(null)
  const { t, i18n } = useTranslation()
  const addImagesRef = useRef(null)
  const addFrontImageRef = useRef(null)
  const imageRefs = useRef([])
  const iconRefs = useRef([])
  const frontImageRefs = useRef([])
  const frontIconRefs = useRef([])

  useEffect(() => {
    if (post) {
      const newFormData = {
        title: post.title || '',
        description: post.description || '',
        frontPicture: post.frontPicture || '',
        pictures: post.pictures || [],
        author: post?.author?.id || appData.users[0].id,
        date: post.date || null,
        published: post.published || false
      }
      if (post.id) newFormData.id = post.id
      setFormData(newFormData)
    }
  }, [post])

  function handleDeleteFrontPicture () {
    setFormData({ ...formData, frontPicture: '' })
  }

  function handleDeleteImage (index) {
    const newPictures = [...formData.pictures]
    newPictures.splice(index, 1)
    setFormData({ ...formData, pictures: newPictures })
  }

  async function handleChange (e) {
    switch (e.target.name) {
      case 'pictures': {
        const urls = []
        for (let i = 0; i < e.target.files.length; i++) {
          const file = e.target.files[i]
          await uploadImage(file).then(url => {
            console.log('url: ', url)
            urls.push(url)
          })
        }
        console.log('urls: ', urls)
        setFormData({ ...formData, pictures: [...formData.pictures, ...urls] })
        addImagesRef.current.value = ''
        break
      }
      case 'frontPicture':
        if (e.target.files.length === 0) return
        await uploadImage(e.target.files[0]).then(url => {
          setFormData({ ...formData, frontPicture: url })
        })

        addFrontImageRef.current.value = ''
        break
      case 'title':
        setFormData({ ...formData, title: e.target.value })
        break
      case 'description':
        setFormData({ ...formData, description: e.target.value })
        break
      case 'author':
        setFormData({ ...formData, author: e.target.value })
        break
      case 'published':
        setFormData({ ...formData, published: e.target.checked })
        break
      default:
        console.log('Unknown handleChange')
        break
    }
  }

  // appData.users contain all users

  if (!formData) {
    return (
      <Modal show={modal.show} onHide={() => modal.off(modal)} size='xl'>
        <Modal.Header closeButton className='py-2 text-gray-700'>
          <Modal.Title>Loading...</Modal.Title>
        </Modal.Header>
      </Modal>
    )
  }

  return (
    <Modal show={modal.show} onHide={() => modal.off(modal)} size='xl' backdrop='static'>
      <Modal.Header closeButton className='py-2 text-gray-700'>
        {post.title
          ? (
            <Modal.Title>{t('blog.edit.label.editing')}{': '}{post.title}</Modal.Title>
            )
          : (
            <Modal.Title>{t('blog.edit.label.creating')}</Modal.Title>
            )}
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group className='mb-3' controlId='formPublished'>
            <Form.Check type='switch' label={t('events.edit.label.published')} name='published' checked={formData.published} onChange={(e) => setFormData({ ...formData, published: e.target.checked })} />
          </Form.Group>
          <Form.Group className='mb-3' controlId='formBasicEmail'>
            <FloatingLabel controlId='floatingSelect' label={t('blog.edit.label.author')}>
              <Form.Control as='select' name='author' defaultValue={formData.author} onChange={(e) => handleChange(e)}>
                {appData.users.map((user, index) => (
                  <option key={index} value={user.id}>{user.firstName}{' '}{user.lastName}</option>
                ))}
              </Form.Control>
            </FloatingLabel>
          </Form.Group>
          <Form.Group className='mb-3' controlId='formPostTitle'>
            <FloatingLabel label={t('blog.edit.label.title')}>
              <Form.Control type='text' placeholder={t('blog.edit.label.title')} name='title' defaultValue={formData.title} onChange={(e) => handleChange(e)} />
            </FloatingLabel>
          </Form.Group>
          <Form.Group className='mb-3' controlId='formPostDescription'>
            <FloatingLabel label={t('blog.edit.label.description')}>
              <Form.Control as='textarea' type='text' name='description' defaultValue={formData.description} onChange={(e) => handleChange(e)} style={{ height: '150px' }} />
            </FloatingLabel>
          </Form.Group>
          <Form.Group className='mb-3' controlId='formFileMultiple'>
            <Form.Label>{t('blog.edit.label.addFrontImage')}</Form.Label>
            <Form.Control ref={addFrontImageRef} type='file' name='frontPicture' onChange={(e) => handleChange(e)} />
            <div className='d-flex my-3'>
              {formData.frontPicture && <AddedImage isFrontPicture picture={formData.frontPicture} index={0} handleDeleteImage={handleDeleteFrontPicture} imageRefs={frontImageRefs} iconRefs={frontIconRefs} />}
            </div>
          </Form.Group>

          <Form.Group className='mb-3' controlId='formFileMultiple'>
            <Form.Label>{t('blog.edit.label.addImages')}</Form.Label>
            <Form.Control ref={addImagesRef} type='file' name='pictures' multiple onChange={(e) => handleChange(e)} />
            <div className='row g-3 row-cols-6 justify-content-start align-items-center my-3'>
              {formData.pictures &&
    formData.pictures.map((picture, index) => (
      <AddedImage key={index} picture={picture} index={index} handleDeleteImage={handleDeleteImage} imageRefs={imageRefs} iconRefs={iconRefs} />
    ))}
            </div>
          </Form.Group>
          <Alert className='my-3' variant='success'>
            <Alert.Heading>{t('blog.edit.alertHeader')}</Alert.Heading>
            <p>
              {t('blog.edit.alertDescription')}
            </p>
            <hr />
            <p className='mb-0'>
              <Trans i18nKey='blog.edit.alertFooter' />
            </p>
          </Alert>
          <div className='mt-3 d-flex justify-content-end'>
            <Button onClick={() => handleSubmit(formData)}>{t('blog.edit.submit')}</Button>
          </div>
        </Form>
      </Modal.Body>
    </Modal>
  )
}
