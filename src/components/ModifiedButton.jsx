import { Button } from 'react-bootstrap'

export const ModifiedButton = (props) => {
  return (
    <Button {...props} className='border-0' style={{ '--bs-btn-active-color': 'rgb(0, 0, 0)', '--bs-btn-active-bg': 'transparent', boxShadow: 'none', '--bs-btn-hover-bg': 'transparent', '--bs-btn-bg': 'transparent', '--bs-btn-color': 'rgb(230, 230, 230)', '--bs-btn-hover-color': 'rgb(100, 100, 100)', '--bs-btn-hover-border-color': 'rbg(255, 255, 255)' }}>
      {props.children}
    </Button>
  )
}
