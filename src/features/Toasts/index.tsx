import { ToastData } from '@/models/Toast'
import { useRef, Children } from 'react'
import { ToastContainer, Toast, Button } from 'react-bootstrap'
import { BsCheckCircleFill, BsFillExclamationCircleFill, BsXLg } from 'react-icons/bs'

// This component is reused from a TellusTalk AB React project with permission. // William Bigert 2023-01-31
interface ToastsProps {
  toasts: {
    data: ToastData[],
    setData: (data: ToastData[]) => void,
    on: (toast: ToastData) => void,
    off: (toast: ToastData) => void,
  }
}

function Toasts ({ toasts }: ToastsProps) {
  const toastRef = useRef<Record<string, React.RefObject<HTMLDivElement>>>({})

  const toastsPositions = [...new Set(toasts.data.map(toast => toast.position))]
  return (
    <>
      {toastsPositions.map(position => (
        <ToastContainer key={position} className='p-3 position-fixed' position={position}>
          {toasts.data.filter(toast => toast.position === position).map((toast: ToastData) => {
            const disableClose = toast.disableClose

            return (
              <Toast
                show={!toast.hideDate}
                id={toast.id}
                key={toast.id}
                onClose={() => toasts.off(toast)}
                delay={toast.delay > 0 ? toast.delay : undefined}
                autohide={!!toast.delay}
                ref={(ref: HTMLDivElement | null) => (toastRef.current[toast.id] = { current: ref })}
                className={!toast.title ? `text-bg-${toast.color}` : ''}
              >
                {toast.title && (
                  <Toast.Header
                    className={`d-flex flex-row gap-2${toast.color && (' text-bg-' + toast.color)}`}
                    closeButton={false}
                    onClick={!disableClose ? () => toasts.off(toast) : undefined}
                  > {toast.color === 'success' ? <BsCheckCircleFill className='text-white' /> : toast.color === 'danger' ? <BsFillExclamationCircleFill className='text-white' /> : <></>}
                    <strong className='me-auto'>{toast.title}</strong>
                    {toast.allowClose && (
                      <Button className='p-1 d-flex justify-content-center align-items-center' variant={toast.color} onClick={() => toasts.off(toast)}>
                        <BsXLg />
                      </Button>
                    )}
                  </Toast.Header>
                )}
                {Children.toArray(toast.children).length > 0 && (
                  <Toast.Body onClick={!disableClose && !toast.title ? () => toasts.off(toast) : undefined}>
                    {toast.children}
                  </Toast.Body>
                )}
              </Toast>
            )
          })}
        </ToastContainer>
      ))}
    </>
  )
}

export default Toasts

interface ToastProps {
  title?: string
  children: React.ReactNode
  delay?: number
  disableClose?: boolean
  color?: 'primary' | 'secondary' | 'success' | 'danger' | 'warning' | 'info' | 'light' | 'dark'
  position?: 'top-start' | 'top-center' | 'top-end' | 'center-start' | 'center-center' | 'center-end' | 'bottom-start' | 'bottom-center' | 'bottom-end'
  allowClose?: boolean
}

export function addToast (id: string, { title, children, delay, disableClose, color, position, allowClose }: ToastProps) {
  const newToast = {
    children,
    title,
    id: id ?? Date.now().toLocaleString(),
    delay: (delay ?? 10) * 1000,
    disableClose,
    allowClose: allowClose ?? false,
    color: color ?? 'light',
    position: position ?? 'bottom-end'
  }

  return newToast
}
