import { CardElement } from "@/models/CardElement"
import { Button } from "react-bootstrap"
import { BsPencil, BsTrash } from "react-icons/bs"

interface ToolsProps {
  id: string,
  handleClickDelete: (id: string) => void
  handleClickEdit: (id: string) => void
  optionsRef?: React.RefObject<HTMLDivElement>
  opacity: number
  inline?: boolean
  toolsToShow: {
    edit: boolean
    delete: boolean
  }
}

export function Tools({ id, handleClickDelete, handleClickEdit, optionsRef, opacity, inline, toolsToShow }: ToolsProps) {
  const style: React.CSSProperties = {
    position: 'absolute',
    top: 10,
    right: 10,
    zIndex: 100,
    opacity: opacity,
    transition: '0.1s'
  }

  const styleInline : React.CSSProperties = {
    position: 'relative',
  }


  return (
    <div ref={optionsRef} style={inline ? styleInline : style } className='d-flex gap-2' >
      
      {toolsToShow.edit && 
        <Button
          className='p-2 studs-bg' variant='primary' size='lg'
          onClick={(e) => {
            e.stopPropagation()
            handleClickEdit(id)
          }}
        >
          <BsPencil className='d-block' size={17} />
        </Button>
      }
      {toolsToShow.delete &&
        <Button
          className='p-2' variant='danger' size='lg' onClick={(e) => {
            e.stopPropagation()
            handleClickDelete(id)
          }}
        >
          <BsTrash className='d-block' size={17} />
        </Button>
      }
    </div>
  )
}