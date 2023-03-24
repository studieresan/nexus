import { HandleInstructionsContext } from '@/context'
import { useContext, useState } from 'react'
import { Button, Form } from 'react-bootstrap'
import { useTranslation } from 'react-i18next'
export default function Login ({ appData, setAppData }) {
  const { t, i18n } = useTranslation()
  const [formData, setFormData] = useState({ email: '', password: '' })
  const handleInstructions = useContext(HandleInstructionsContext)

  async function login () {
    await handleInstructions('loginUser', { email: formData.email, password: formData.password })
  }
  function handleChange (e) {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  function forgotPassword () {
    console.log('forgotPassword')
  }

  return (
    <div className='d-flex justify-content-center bg-light align-items-center w-100 vh-100'>
      <div className=' w-25 bg-dark rounded text-light p-5'>
        <h1 className='fw-light'>{t('login.title')}</h1>
        <Form className='w-100 mt-5'>
          <Form.Group className='mb-3' controlId='formBlogTitle'>
            <Form.Label>{t('login.label.email')}</Form.Label>
            <Form.Control type='email' placeholder={t('login.label.email')} name='email' defaultValue={formData.title} onChange={(e) => handleChange(e)} />
          </Form.Group>
          <Form.Group className='mb-3' controlId='formBlogTitle'>
            <Form.Label>{t('login.label.password')}</Form.Label>
            <Form.Control type='password' placeholder={t('login.label.password')} name='password' defaultValue={formData.title} onChange={(e) => handleChange(e)} />
          </Form.Group>
        </Form>
        <div className='d-flex gap-2 mt-5 justify-content-between'>
          <Button variant='primary' size='sm' onClick={() => login()}>
            {t('login.primaryButton')}
          </Button>
          <Button variant='secondary' size='sm' onClick={() => forgotPassword()}>
            {t('login.secondaryButton')}
          </Button>
        </div>
      </div>
    </div>
  )
}
