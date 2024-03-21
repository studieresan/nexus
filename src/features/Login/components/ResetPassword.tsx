import { Button, Form } from "react-bootstrap"
import { ForgotPasswordFormData, ResetPasswordFormData } from ".."
import { useTranslation } from "react-i18next"


interface ResetPasswordProps {
  formData: ResetPasswordFormData,
  handleChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void
  resetPassword: (password: string, passwordConfirm: string) => void,
}

export function ResetPassword({ formData, handleChange, resetPassword} : ResetPasswordProps) {
  const { t, i18n } = useTranslation()

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    resetPassword(formData.password, formData.confirmPassword)
  }

  return (
    <div className='d-flex justify-content-center bg-light align-items-center my-5'>
      <div className=' col-9 col-sm-8 col-md-7 col-lg-6 col-xl-5 col-xxl-4 bg-dark rounded text-light p-5'>
        <div className="fs-2 fw-light d-flex align-items-center">
          {t('resetPassword.title')}
        </div>
        <Form className='w-100 mt-5' onSubmit={handleSubmit}>
          <Form.Group className='mb-3' controlId='formBlogTitle'>
            <Form.Label>{t('resetPassword.label.password')}</Form.Label>
            <Form.Control type='password' placeholder={t('resetPassword.label.password')} name='password' defaultValue={formData.password} onChange={(e) => handleChange(e)} />
          </Form.Group>
          <Form.Group className='mb-3' controlId='formBlogTitle'>
            <Form.Label>{t('resetPassword.label.confirmPassword')}</Form.Label>
            <Form.Control type='password' placeholder={t('resetPassword.label.confirmPassword')} name='confirmPassword' defaultValue={formData.confirmPassword} onChange={(e) => handleChange(e)} />
          </Form.Group>
          <div className='d-flex gap-2 mt-5 justify-content-between'>
            <Button className='studs-bg' variant='primary' type="submit">
              {t('resetPassword.primaryButton')}
            </Button>
          </div>
        </Form>
      </div>
    </div>
  )
}