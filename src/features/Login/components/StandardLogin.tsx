import { Button, Form } from "react-bootstrap"
import { LoginFormData } from ".."
import { useTranslation } from "react-i18next"
import { useNavigate } from "react-router-dom"


interface StandardLoginProps {
  formData: LoginFormData
  handleChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void
  login: () => void
}

export function StandardLogin({ formData, handleChange, login} : StandardLoginProps) {
  const { t, i18n } = useTranslation()
  const navigateTo = useNavigate()

  function handleSubmit (e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    login()
  }

  return (  
    <div className='d-flex justify-content-center bg-light align-items-center my-5'>
      <div className='col-10 col-sm-8 col-md-7 col-lg-6 col-xl-5 col-xxl-4 col-xxxl-3 bg-dark rounded text-light p-5'>
        <div className="fs-2 fw-light d-flex align-items-center">
          {t('login.title')}
        </div>
        <Form className='w-100 mt-5' onSubmit={handleSubmit}>
          <Form.Group className='mb-3' controlId='formBlogTitle'>
            <Form.Label>{t('login.label.email')}</Form.Label>
            <Form.Control type='email' placeholder={t('login.label.email')} name='email' defaultValue={formData.email} onChange={(e) => handleChange(e)} />
          </Form.Group>
          <Form.Group className='mb-3' controlId='formBlogTitle'>
            <Form.Label>{t('login.label.password')}</Form.Label>
            <Form.Control type='password' placeholder={t('login.label.password')} name='password' defaultValue={formData.password} onChange={(e) => handleChange(e)} />
          </Form.Group>
          <div className='d-flex gap-2 mt-5 justify-content-between'>
            <Button className='studs-bg' variant='primary' type="submit">
              {t('login.primaryButton')}
            </Button>
            <Button variant='secondary' onClick={() => navigateTo('/auth/forgot-password')}>
              {t('login.secondaryButton')}
            </Button>
          </div>
        </Form>
      </div>
    </div>
  )
}