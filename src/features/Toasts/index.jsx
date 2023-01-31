import { useRef, Children } from 'react'
import { ToastContainer, Toast, Button } from 'react-bootstrap'
import { BsCheckCircleFill, BsFillExclamationCircleFill, BsXLg } from 'react-icons/bs'

// This component is reused from a TellusTalk AB React project with permission. // William Bigert 2023-01-31
function Toasts ({ toasts }) {
  const toastRef = useRef([])

  // Max 7 toasts.
  // useEffect(() => {
  //   toasts.setData((currentState) => {
  //     if (toasts.data.length > 7) {
  //       currentState.splice(0, 1)
  //       return [...currentState]
  //     } else return currentState
  //   })
  // }, [toasts.data.length])
  const toastsPositions = [...new Set(toasts.data.map(toast => toast.position))]
  return (
    <>
      {toastsPositions.map(position => (
        <ToastContainer key={position} className='p-3 position-fixed' position={position}>
          {toasts.data.filter(toast => toast.position === position).map((toast) => {
            const disableClose = toast.disableClose

            return (
              <Toast
                show={!toast.hideDate}
                id={toast.id}
                key={toast.id}
                onClose={() => toasts.off(toast)}
                delay={toast.delay > 0 ? toast.delay : undefined}
                autohide={!!toast.delay}
                ref={(ref) => (toastRef.current[toast.id] = ref)}
                className={!toast.title && `text-bg-${toast.color}`}
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

export function addToast (id, { title, children, delay, disableClose, color, position, allowClose }) {
  const newToast = {
    children,
    title,
    id: id ?? Date.now(),
    delay: delay * 1000 ?? 10000,
    disableClose,
    allowClose: allowClose ?? false,
    color: color ?? 'light',
    position: position ?? 'bottom-end'
  }

  return newToast
}
