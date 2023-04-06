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
  const startUser = {
    id: '',
    firstName: '',
    lastName: '',
    studsYear: new Date().getFullYear(),
    info: {
      role: UserRole.None,
      email: '',
      biography: '',
      linkedIn: '',
      github: '',
      phone: '',
      picture: '',
      allergies: '',
      master: '',
      permissions: []
    },
    tokens: []
  }

  const [formData, setFormData] = useState<User>(startUser);
  const user = data.user;

  useEffect(() => {
    if (user) {
      const info = user.info || startUser.info;
      const newFormData: User = {
        id: user.id,
        firstName: user.firstName || startUser.firstName,
        lastName: user.lastName || startUser.lastName,
        studsYear: user.studsYear || startUser.studsYear,
        info: {
          role: info.role || startUser.info.role,
          email: info.email || startUser.info.email,
          biography: info.biography || startUser.info.biography,
          linkedIn: info.linkedIn || startUser.info.linkedIn,
          github: info.github || startUser.info.github,
          phone: info.phone || startUser.info.phone,
          picture: info.picture || startUser.info.picture,
          allergies: info.allergies || startUser.info.allergies,
          master: info.master || startUser.info.master,
          permissions: info.permissions || startUser.info.permissions,
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
        if (Object.keys(formData.info).includes(name)) {
          setFormData({ ...formData, info: { ...formData.info, [name]: value } });
        } else {
          setFormData({ ...formData, [name]: value });
        }
      }
    } else if (e.target instanceof HTMLTextAreaElement) {
      const { name, value } = e.target;
      if (Object.keys(formData.info).includes(name)) {
        setFormData({ ...formData, info: { ...formData.info, [name]: value } });
      } else {
        setFormData({ ...formData, [name]: value });
      }
    } else if (e.target instanceof HTMLSelectElement) {
      const { name, value } = e.target;
      if (name === 'role') {
        setFormData({ ...formData, info: { ...formData.info, role: value as UserRole } });
      } else {
        setFormData({ ...formData, [name]: parseInt(value, 10) });
      }
    }
  }

  function handleCheckboxChange(e: React.ChangeEvent<HTMLInputElement>) {
    if (e.target.name === 'permissions') {
      const { value, checked } = e.target;
      const newPermissions = [...formData.info.permissions];
  
      if (checked) {
        newPermissions.push(value as Permission);
      } else {
        const index = newPermissions.indexOf(value as Permission);
        if (index > -1) {
          newPermissions.splice(index, 1);
        }
      }
      setFormData({ ...formData, info: { ...formData.info, permissions: newPermissions } });
    }
  }

  function isAdmin(): boolean {
    if (!appData.userDetails) return false;
    return appData.userDetails.permissions.includes(Permission.Admin);
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
    <Modal 
      show={modal.isModalVisible(data.name, data.id)} 
      onHide={() => modal.off(data.name, data.id)} 
      size="lg" 
      fullscreen="xxl-down" 
      backdrop='static'
    >
      <Modal.Header closeButton className='py-2'>
        <Modal.Title>{user.id ? t('editUser.label.editing') + ': ' + user.firstName + ' ' + user.lastName : t('editUser.label.creating')}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group className='mb-3 fs-4 fw-light' controlId='formFileMultiple'>
            <Form.Label>{t(`editUser.label.changePicture`)}</Form.Label>
            <Form.Control ref={addFrontImageRef} type='file' name='picture' onChange={(e) => handleChange(e)} />
            <div className='d-flex my-3 justify-content-center'>
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
              <FloatingLabel controlId='floatingStudsYearInput' label={t('editUser.label.studsYear')}>
                <Form.Control
                  type='number'
                  name='studsYear'
                  value={formData.studsYear}
                  onChange={(e) => handleChange(e)}
                  min={new Date().getFullYear() - 70}
                  max={new Date().getFullYear() + 1}
                />
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
            <Form.Group className='mb-3' controlId='formBiography'>
              <FloatingLabel label={t('editUser.label.biography')}>
                <Form.Control as='textarea' type='text' name='biography' value={formData.info.biography} onChange={(e) => handleChange(e)} style={{ height: '100px' }} />
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
            {isAdmin() && (
              <div>
                <div className='fs-4 fw-light'>
                  <span className='fs-4 fw-light'>{t('editUser.label.admin')}</span>
                </div>
                <Form.Group className='mb-3' controlId='formRole'>
                  <FloatingLabel controlId='floatingRoleSelect' label={t('editUser.label.role')}>
                    <Form.Control as='select' name='role' value={formData.info.role} onChange={(e) => handleChange(e)}>
                      {Object.entries(UserRole).map(([key, value]) => (
                        <option key={key} value={value}>{t(`${value}`)}</option>
                      ))}
                    </Form.Control>
                  </FloatingLabel>
                </Form.Group>
                <Form.Group className='mb-3' controlId='formPermissions'>
                  <Form.Label>{t('editUser.label.permissions')}</Form.Label>
                  {Object.entries(Permission).map(([key, value]) => (
                    <Form.Check
                      key={key}
                      type='checkbox'
                      name='permissions'
                      value={value}
                      label={t(`${value}`)}
                      checked={formData.info.permissions.includes(value)}
                      onChange={(e) => handleCheckboxChange(e)}
                    />
                  ))}
                </Form.Group>
              </div>
            )}
            <div className='mt-3 d-flex justify-content-end'>
              <Button className='studs-bg' onClick={() => handleSubmit(formData)}>{data.user ? t('editUser.edit.submit') : t('editUser.create.submit')}</Button>
            </div>
          </Form>
        </Modal.Body>
      </Modal>
  )
}
