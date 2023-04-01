import { HandleInstructionsContext } from '@/context'
import { AppData } from '@/models/AppData'
import { useContext, useState } from 'react'
import { Button, Form } from 'react-bootstrap'
import { useTranslation } from 'react-i18next'
import { useNavigate, useParams } from 'react-router-dom'
import { StandardLogin } from './components/StandardLogin'
import { ForgotPassword } from './components/ForgotPassword'
import { ResetPassword } from './components/ResetPassword'
import { CheckEmail } from './components/CheckEmail'
import { ChangeSuccess } from './components/ChangeSuccess'

interface LoginProps {
  appData: AppData,
  setAppData: React.Dispatch<React.SetStateAction<AppData>>
}

export interface ForgotPasswordFormData {
  email: string
}

export interface ResetPasswordFormData {
  password: string,
  confirmPassword: string
}
export interface LoginFormData {
  email: string,
  password: string
}

export default function Login ({ appData, setAppData }: LoginProps) {
  const { t, i18n } = useTranslation()
  const { mode, token } = useParams()
  console.log('mode', mode);
  
  const [formData, setFormData] = useState<LoginFormData>({ email: '', password: '' })
  const [forgotPasswordFormData, setForgotPasswordFormData] = useState<ForgotPasswordFormData>({ email: '' })
  const [resetPasswordFormData, setResetPasswordFormData] = useState<ResetPasswordFormData>({ password: '', confirmPassword: '' })
  const navigateTo = useNavigate()
  const handleInstructions = useContext(HandleInstructionsContext)

  async function login () {
    await handleInstructions('loginUser', { email: formData.email, password: formData.password })
  }

  async function startPasswordReset (email: string) {
    await handleInstructions('startPasswordReset', { email })
    navigateTo('/auth/check-email')
  }

  async function resetPassword(password: string, confirmPassword: string) {
    await handleInstructions('resetPassword', { password, confirmPassword, resetToken: token })
    navigateTo('/auth/change-success')
  }

  
  function handleChange (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
    if (mode === 'login') {
      setFormData({ ...formData, [e.target.name]: e.target.value })
    } else if (mode === 'forgot-password') {
      setForgotPasswordFormData({ ...forgotPasswordFormData, [e.target.name]: e.target.value })
    } else {
      setResetPasswordFormData({ ...resetPasswordFormData, [e.target.name]: e.target.value })
    }
  }


  switch (mode) {
    case 'login': return <StandardLogin formData={formData} handleChange={handleChange} login={login} />
    case 'forgot-password': return <ForgotPassword formData={forgotPasswordFormData} handleChange={handleChange} handleStartPasswordReset={startPasswordReset} />
    case 'reset-password': return <ResetPassword formData={resetPasswordFormData} handleChange={handleChange} resetPassword={resetPassword}/>
    case 'check-email': return <CheckEmail />
    case 'change-success': return <ChangeSuccess />
    default: return <div>404</div>
  }
}
