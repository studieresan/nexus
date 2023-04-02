import { uploadImage } from '@/requests/api'
import { useEffect, useRef, useState } from 'react'
import { Button, FloatingLabel, Form, FormControl, Modal } from 'react-bootstrap'
import { Trans, useTranslation } from 'react-i18next'
import { AppData } from '@/models/AppData.js'
import { ModalManager } from '@/models/Modal.js'
import { Permission, User, UserRole } from '@/models/User.js'
import { UserModalData } from '@/models/UserModal.js'
import { AddedImage } from '@/features/PostModal/components/AddedImage'

interface EditUserProps {
  modal: ModalManager,
  data: UserModalData,
  appData: AppData,
  handleSubmit: (formData: User ) => void
}

export default function EditUser ({ modal, data, appData, handleSubmit }: EditUserProps): JSX.Element {
  const { t, i18n } = useTranslation()
  const frontImageRefs = useRef([])
  const frontIconRefs = useRef([])
  const addFrontImageRef = useRef<HTMLInputElement>(null)
  const imageRefs = useRef([])
  const iconRefs = useRef([])
  const [formData, setFormData] = useState<User>({
    id: '',
    firstName: '',
    lastName: '',
    studsYear: 0,
    info: {
      role: UserRole.None,
      email: '',
      linkedIn: '',
      github: '',
      phone: '',
      picture: '',
      allergies: '',
      master: '',
      permissions: []
    },
    tokens: []
  });
  const user = data.user;

  useEffect(() => {
    if (user) {
      const { info } = user;
      const newFormData: User = {
        id: user.id,
        firstName: user.firstName,
        lastName: user.lastName,
        studsYear: user.studsYear,
        info: {
          role: info.role,
          email: info.email,
          linkedIn: info.linkedIn || '',
          github: info.github || '',
          phone: info.phone || '',
          picture: info.picture || '',
          allergies: info.allergies || '',
          master: info.master || '',
          permissions: info.permissions,
        },
        tokens: user.tokens || [],
      };
      setFormData(newFormData);
    }
  }, [data.user]);
  
  function handleDeleteFrontPicture() {
    setFormData({ ...formData, info: { ...formData.info, picture: '' } });
  }

  async function handleChange(e: React.ChangeEvent<HTMLElement>) {
    if (e.target instanceof HTMLInputElement) {
      if (e.target.name === 'picture' && e.target.files !== null && e.target.files.length > 0) {
        await uploadImage(e.target.files[0]).then(url => {
          setFormData({ ...formData, info: { ...formData.info, picture: url } })
        })
        if (addFrontImageRef.current) {
          addFrontImageRef.current.value = ''
        }
      } else {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
      }
    } else if (e.target instanceof HTMLTextAreaElement) {
      const { name, value } = e.target;
      setFormData({ ...formData, [name]: value });
    } else if (e.target instanceof HTMLSelectElement) {
      const { name, value } = e.target;
      setFormData({ ...formData, [name]: parseInt(value, 10) });
    }
  }
  
  if (!formData) {
    return (
      <Modal show={modal.isModalVisible(data.name, data.id)} onHide={() => modal.off(data.name, data.id)} size='xl'>
        <Modal.Header closeButton className='py-2 text-gray-700'>
          <Modal.Title>Loading...</Modal.Title>
        </Modal.Header>
      </Modal>
    );
  }
  
  const years = (appData.users || []).map(user => user.studsYear).filter((value, index, self) => self.indexOf(value) === index).sort((a, b) => b - a);

  return (
    <Modal show={modal.isModalVisible(data.name, data.id)} onHide={() => modal.off(data.name, data.id)} size='xl' backdrop='static'>
      <Modal.Header closeButton className='py-2 text-gray-700'>
        <Modal.Title>{user ? t('editUser.label.editing') + ': ' + user.firstName + ' ' + user.lastName : t('editUser.label.creating')}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
      <Form>
      <Form.Group className='mb-3' controlId='formFileMultiple'>
            <Form.Label>{t(`user.edit.label.changePicture`)}</Form.Label>
            <Form.Control ref={addFrontImageRef} type='file' name='picture' onChange={(e) => handleChange(e)} />
            <div className='d-flex my-3'>
              {formData.info.picture && <AddedImage isFrontPicture picture={formData.info.picture} index={0} handleDeleteImage={handleDeleteFrontPicture} imageRefs={frontImageRefs} iconRefs={frontIconRefs} />}
            </div>
          </Form.Group>
        <Form.Group className='mb-3' controlId='formFirstName'>
          <FloatingLabel label={t('editUser.label.firstName')}>
            <Form.Control type='text' placeholder={t('editUser.label.firstName')} name='firstName' value={formData.firstName} onChange={(e) => handleChange(e)} />
          </FloatingLabel>
        </Form.Group>
        <Form.Group className='mb-3' controlId='formLastName'>
          <FloatingLabel label={t('editUser.label.lastName')}>
            <Form.Control type='text' placeholder={t('editUser.label.lastName')} name='lastName' value={formData.lastName} onChange={(e) => handleChange(e)} />
          </FloatingLabel>
        </Form.Group>
        <Form.Group className='mb-3' controlId='formStudsYear'>
          <FloatingLabel controlId='floatingStudsYearSelect' label={t('editUser.label.studsYear')}>
            <Form.Control as='select' name='studsYear' value={formData.studsYear} onChange={(e) => handleChange(e)}>
              {years && years.map((year, index) => (
                <option key={index} value={year}>{year}</option>
              ))}
            </Form.Control>
          </FloatingLabel>
        </Form.Group>
        <Form.Group className='mb-3' controlId='formEmail'>
          <FloatingLabel label={t('editUser.label.email')}>
            <Form.Control type='email' placeholder={t('editUser.label.email')} name='email' value={formData.info.email} onChange={(e) => handleChange(e)} />
          </FloatingLabel>
        </Form.Group>
        <Form.Group className='mb-3' controlId='formPhone'>
          <FloatingLabel label={t('editUser.label.phone')}>
            <Form.Control type='text' placeholder={t('editUser.label.phone')} name='phone' value={formData.info.phone} onChange={(e) => handleChange(e)} />
          </FloatingLabel>
        </Form.Group>
        <Form.Group className='mb-3' controlId='formLinkedIn'>
          <FloatingLabel label={t('editUser.label.linkedIn')}>
            <Form.Control type='text' placeholder={t('editUser.label.linkedIn')} name='linkedIn' value={formData.info.linkedIn} onChange={(e) => handleChange(e)} />
          </FloatingLabel>
        </Form.Group>
        <Form.Group className='mb-3' controlId='formGitHub'>
          <FloatingLabel label={t('editUser.label.github')}>
            <Form.Control type='text' placeholder={t('editUser.label.github')} name='github' value={formData.info.github} onChange={(e) => handleChange(e)} />
          </FloatingLabel>
        </Form.Group>
        <Form.Group className='mb-3' controlId='formAllergies'>
          <FloatingLabel label={t('editUser.label.allergies')}>
            <Form.Control as='textarea' type='text' name='allergies' value={formData.info.allergies} onChange={(e) => handleChange(e)} style={{ height: '100px' }} />
          </FloatingLabel>
        </Form.Group>
        <Form.Group className='mb-3' controlId='formMaster'>
          <FloatingLabel label={t('editUser.label.master')}>
            <Form.Control type='text' placeholder={t('editUser.label.master')} name='master' value={formData.info.master} onChange={(e) => handleChange(e)} />
          </FloatingLabel>
        </Form.Group>
        <div className='mt-3 d-flex justify-content-end'>
          <Button onClick={() => handleSubmit(formData)}>{t(`user.edit.submit`)}</Button>
        </div>
        </Form>
      </Modal.Body>
    </Modal>
  )
}
