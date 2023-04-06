import { uploadImage } from '@/requests/api'
import { useEffect, useRef, useState } from 'react'
import { Alert, Button, FloatingLabel, Form, FormControl, Modal } from 'react-bootstrap'
import { Trans, useTranslation } from 'react-i18next'
import { AddedImage } from './AddedImage.jsx'
import { BlogPost, CreateBlogPost } from '@/models/BlogPost.js'
import { CreateEventPost, EventPost } from '@/models/EventPost.js'
import { AppData } from '@/models/AppData.js'
import { ModalManager } from '@/models/Modal.js'

interface EditPostProps {
  modal: ModalManager,
  data: {
    mode: 'view' | 'edit',
    post: BlogPost | EventPost,
    name: string,
    id: string,
    type: 'blogPost' | 'eventPost'
  }
  appData: AppData,
  handleSubmit: (formData: CreateEventPost | CreateBlogPost ) => void
}

export default function EditPost ({ modal, data, appData, handleSubmit }: EditPostProps): JSX.Element {
  const [formData, setFormData] = useState<CreateEventPost | CreateBlogPost >({
    id: '',
    title: '',
    description: '',
    frontPicture: '',
    pictures: [],
    author: '',
    date: new Date(),
    published: false,
    studsYear: 0
  })
  const { t, i18n } = useTranslation()
  const addImagesRef = useRef<HTMLInputElement>(null)
  const addFrontImageRef = useRef<HTMLInputElement>(null)
  const imageRefs = useRef([])
  const iconRefs = useRef([])
  const frontImageRefs = useRef([])
  const frontIconRefs = useRef([])
  console.log(formData)
  useEffect(() => {
    const post = data.post;
    if (post && appData.users) {
      const highestStudsYear: number = Math.max(...appData.users.map(user => user.studsYear));
      const defaultAuthor = appData.users.find(user => user.id === appData.userDetails?.id) || appData.users.find(user => user.studsYear === highestStudsYear) || appData.users[0];
  
      const newFormData: CreateEventPost | CreateBlogPost = {
        id: post.id || '',
        title: post.title || '',
        description: post.description || '',
        frontPicture: post.frontPicture || '',
        pictures: post.pictures || [],
        author: post?.author?.id || defaultAuthor.id,
        studsYear: post.studsYear || defaultAuthor.studsYear,
        date: post.date || null,
        published: post.published || true,
      };
      setFormData(newFormData);
    }
  }, [data.post]);

  function handleDeleteFrontPicture () {
    setFormData({ ...formData, frontPicture: '' })
  }

  function handleDeleteImage (index: number) {
    const newPictures = [...formData.pictures]
    newPictures.splice(index, 1)
    setFormData({ ...formData, pictures: newPictures })
  }

  async function handleChange (e: React.ChangeEvent<HTMLElement>) {
    if (e.target instanceof HTMLInputElement) {
      switch (e.target.name) {
        case 'pictures': {
          if (e.target.files !== null) {
            const urls: string[] = []
            for (let i = 0; i < e.target.files.length; i++) {
              const file = e.target.files[i]
              await uploadImage(file).then(url => {
                console.log('url: ', url)
                urls.push(url)
              })
            }
            console.log('urls: ', urls)
            setFormData({ ...formData, pictures: [...formData.pictures, ...urls] })
            if (addImagesRef.current) {
              addImagesRef.current.value = ''
            }
          } 
          break
        }
        case 'frontPicture':
          if (e.target.files !== null && e.target.files.length > 0) {
            await uploadImage(e.target.files[0]).then(url => {
              setFormData({ ...formData, frontPicture: url })
            })
            if (addFrontImageRef.current) {
              addFrontImageRef.current.value = ''
            }
          }
          break
        case 'title':
          setFormData({ ...formData, title: e.target.value })
          break
        case 'published':
          setFormData({ ...formData, published: e.target.checked })
          break
        default:
          console.log('Unknown handleChange')
          break
      }
    } else if (e.target instanceof HTMLTextAreaElement) {
      switch (e.target.name) {
        case 'description':
          setFormData({ ...formData, description: e.target.value });
          break;
        default:
          console.log('Unknown handleChange');
          break;
      }
    } else if (e.target instanceof HTMLSelectElement) {
      const target = e.target as HTMLSelectElement
      switch (target.name) {
        case 'author':
          setFormData({ ...formData, author: target.value, studsYear: appData.users?.find(user => user.id === target.value)?.studsYear || 0 });
          break;
        case 'studsYear':
          setFormData({ ...formData, studsYear: parseInt(target.value, 10) });
          break;
        default:
          console.log('Unknown handleChange');
          break;
      }
    }
  }

  if (!formData) {
    return (
      <Modal show={modal.isModalVisible(data.name, data.id)} onHide={() => modal.off(data.name, data.id)} size='xl'>
        <Modal.Header closeButton className='py-2 text-gray-700'>
          <Modal.Title>Loading...</Modal.Title>
        </Modal.Header>
      </Modal>
    )
  }

  const years = (appData.users || []).map(user => user.studsYear).filter((value, index, self) => self.indexOf(value) === index).sort((a, b) => b - a)

  return (
    <Modal show={modal.isModalVisible(data.name, data.id)} onHide={() => modal.off(data.name, data.id)} size='xl' backdrop='static'>
      <Modal.Header closeButton className='py-2 text-gray-700'>
         <Modal.Title>{data.post.title ? t(`${data.type}.edit.label.editing`) + ': ' + data.post.title : t(`${data.type}.edit.label.creating`)}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group className='mb-3' controlId='formPublished'>
            <Form.Check type='switch' label={t(`${data.type}.edit.label.published`)} name='published' checked={formData.published} onChange={(e) => setFormData({ ...formData, published: e.target.checked })} />
          </Form.Group>
          <Form.Group className='mb-3' controlId='formBasicEmail'>
          <FloatingLabel controlId='floatingSelect' label={t(`${data.type}.edit.label.author`)}>
            <Form.Control as='select' name='author' value={formData.author} onChange={(e) => handleChange(e)}>
              {([...new Set((appData.users || []).map(user => user.studsYear))].sort((a, b) => b - a)).map((studsYear, index) => (
                <optgroup key={index} label={`Studs Year: ${studsYear}`} style={{fontStyle: 'normal', fontWeight: 'bold'}}>
                  {(appData.users || [])
                    .filter(user => user.studsYear === studsYear)
                    .map((user, index) => (
                      <option key={index} value={user.id}>
                        {user.firstName}{' '}{user.lastName}
                      </option>
                    ))}
                </optgroup>
              ))}
            </Form.Control>
          </FloatingLabel>
        </Form.Group>
          <Form.Group className='mb-3' controlId='formStudsYear'>
            <FloatingLabel controlId='floatingStudsYearSelect' label={t(`${data.type}.edit.label.studsYear`)}>
              <Form.Control as='select' name='studsYear' value={formData.studsYear} onChange={(e) => handleChange(e)}>
                {years && years.map((year, index) => (
                  <option key={index} value={year}>{year}</option>
                ))}
              </Form.Control>
            </FloatingLabel>
          </Form.Group>
          <Form.Group className='mb-3' controlId='formPostTitle'>
            <FloatingLabel label={t(`${data.type}.edit.label.title`)}>
              <Form.Control type='text' placeholder={t(`${data.type}.edit.label.title`)} name='title' value={formData.title} onChange={(e) => handleChange(e)} />
            </FloatingLabel>
          </Form.Group>
          <Form.Group className='mb-3' controlId='formPostDescription'>
            <FloatingLabel label={t(`${data.type}.edit.label.description`)}>
              <Form.Control as='textarea' type='text' name='description' value={formData.description} onChange={(e) => handleChange(e)} style={{ height: '150px' }} />
            </FloatingLabel>
          </Form.Group>
          <Form.Group className='mb-3' controlId='formFileMultiple'>
            <Form.Label>{t(`${data.type}.edit.label.addFrontImage`)}</Form.Label>
            <Form.Control ref={addFrontImageRef} type='file' name='frontPicture' onChange={(e) => handleChange(e)} />
            <div className='d-flex my-3'>
              {formData.frontPicture && <AddedImage isFrontPicture picture={formData.frontPicture} index={0} handleDeleteImage={handleDeleteFrontPicture} imageRefs={frontImageRefs} iconRefs={frontIconRefs} />}
            </div>
          </Form.Group>

          <Form.Group className='mb-3' controlId='formFileMultiple'>
            <Form.Label>{t(`${data.type}.edit.label.addImages`)}</Form.Label>
            <Form.Control ref={addImagesRef} type='file' name='pictures' multiple onChange={(e) => handleChange(e)} />
            <div className='row g-3 row-cols-6 justify-content-start align-items-center my-3'>
              {formData.pictures &&
                formData.pictures.map((picture, index) => (
                  <AddedImage key={index} picture={picture} index={index} handleDeleteImage={handleDeleteImage} imageRefs={imageRefs} iconRefs={iconRefs} />
                ))}
            </div>
          </Form.Group>
          <Alert className='my-3' variant='success'>
            <Alert.Heading>{t(`${data.type}.edit.alertHeader`)}</Alert.Heading>
            <p>
              {t(`${data.type}.edit.alertDescription`)}
            </p>
            <hr />
            <p className='mb-0'>
              <Trans i18nKey={`${data.type}.edit.alertFooter`} />
            </p>
          </Alert>
          <div className='mt-3 d-flex justify-content-end'>
            <Button onClick={() => handleSubmit(formData)}>{t(`${data.type}.edit.submit`)}</Button>
          </div>
        </Form>
      </Modal.Body>
    </Modal>
  )
}
