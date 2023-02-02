import { HandleInstructionsContext } from '@/context.js'
import { createBlogPost, updateBlogPost, uploadImage } from '@/requests/api'
import { useContext, useEffect, useRef, useState } from 'react'
import { Alert, Button, FloatingLabel, Form, FormControl, Modal } from 'react-bootstrap'
import { useTranslation } from 'react-i18next'
import { AddedImage } from './AddedImage.jsx'
export default function EditPost ({ modal, appData, post }) {
  const [formData, setFormData] = useState(null)
  const { t, i18n } = useTranslation()
  const addImagesRef = useRef(null)
  const addFrontImageRef = useRef(null)
  const imageRefs = useRef([])
  const iconRefs = useRef([])
  const frontImageRefs = useRef([])
  const frontIconRefs = useRef([])

  const handleInstructions = useContext(HandleInstructionsContext)
  useEffect(() => {
    if (post) {
      const newFormData = {
        title: post.title || '',
        description: post.description || '',
        frontPicture: post.frontPicture || '',
        pictures: post.pictures || [],
        author: post?.author?.id || appData.users[0].id,
        date: post.date || null
      }
      if (post.id) newFormData.id = post.id
      setFormData(newFormData)
    }
  }, [post])

  async function handleSubmit () {
    const payload = { ...formData, date: formData.date || new Date().toISOString() }
    console.log('payload: ', { ...payload })
    if (payload.id) {
      await handleInstructions('updateBlogPost', { post: payload })
    } else {
      await handleInstructions('createBlogPost', { post: payload })
    }
    modal.off(modal)
  }

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
        <Modal.Title>{t('blog.edit.label.editing')} {post.title}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group className='mb-3' controlId='formBasicEmail'>
            <FloatingLabel controlId='floatingSelect' label={t('blog.edit.label.author')}>
              <Form.Control as='select' name='author' defaultValue={formData.author} onChange={(e) => handleChange(e)}>
                {appData.users.map((user, index) => (
                  <option key={index} value={user.id}>{user.firstName}{' '}{user.lastName}</option>
                ))}
              </Form.Control>
            </FloatingLabel>
          </Form.Group>
          <Form.Group className='mb-3' controlId='formBlogTitle'>
            <FloatingLabel controlId='floatingInput' label={t('blog.edit.label.title')}>
              <Form.Control type='text' placeholder={t('blog.edit.label.title')} name='title' defaultValue={formData.title} onChange={(e) => handleChange(e)} />
            </FloatingLabel>
          </Form.Group>
          <Form.Group className='mb-3' controlId='formBlogTitle'>
            <Form.Label>{t('blog.edit.label.description')}</Form.Label>
            <Form.Control as='textarea' rows='10' cols='70' type='text' name='description' defaultValue={formData.description} onChange={(e) => handleChange(e)} />
          </Form.Group>
          <Form.Group className='mb-3' controlId='formFileMultiple'>
            <Form.Label>{t('blog.edit.label.addFrontImage')}</Form.Label>
            <Form.Control ref={addFrontImageRef} type='file' name='frontPicture' onChange={(e) => handleChange(e)} />
          </Form.Group>
          <div className='d-flex mb-3'>
            {formData.frontPicture && <AddedImage isFrontPicture picture={formData.frontPicture} index={0} handleDeleteImage={handleDeleteFrontPicture} imageRefs={frontImageRefs} iconRefs={frontIconRefs} />}
          </div>

          <Form.Group className='mb-3' controlId='formFileMultiple'>
            <Form.Label>{t('blog.edit.label.addImages')}</Form.Label>
            <Form.Control ref={addImagesRef} type='file' name='pictures' multiple onChange={(e) => handleChange(e)} />
          </Form.Group>
          <div className='row g-3 row-cols-6 justify-content-start align-items-center'>
            {formData.pictures &&
    formData.pictures.map((picture, index) => (
      <AddedImage key={index} picture={picture} index={index} handleDeleteImage={handleDeleteImage} imageRefs={imageRefs} iconRefs={iconRefs} />
    ))}
          </div>
          <Alert className='my-3' variant='success'>
            <Alert.Heading>{t('blog.edit.alertHeader')}</Alert.Heading>
            <p>
              {t('blog.edit.alertDescription')}
            </p>
            <hr />
            <p className='mb-0'>
              {t('blog.edit.alertFooter')}
            </p>
          </Alert>
          <div className='mt-3 d-flex justify-content-end'>
            <Button onClick={() => handleSubmit()}>{t('blog.edit.submit')}</Button>
          </div>
        </Form>
      </Modal.Body>
    </Modal>
  )
}
