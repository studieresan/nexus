import { AppDataContext, HandleInstructionsContext, HandleModalsContext } from '@/context'
import { ContactElement } from '@/models/Contact'
import { useTranslation } from 'react-i18next'
import { IoPersonSharp } from 'react-icons/io5'
import { useContext } from 'react'
import { User } from '@/models/User'
import { useWindowWidth } from '@/hooks/useWindowWidth'
interface ContactProps {
  element: ContactElement
}

export default function Contact({ element }: ContactProps): JSX.Element {

  const handleModals = useContext(HandleModalsContext)
  const appData = useContext(AppDataContext)
  const handleInstructions = useContext(HandleInstructionsContext)
  const windowWidth = useWindowWidth()
  const hover = windowWidth > 576 ? 'contact-hover' : ''
  const { t } = useTranslation();

  function handleClickContact(id: string) {
    const user = (appData.users || []).find((e) => e.id === id)
    if (!user) {
      throw new Error('handleClickEdit post undefined')
    }
    handleModals.on({
      name: 'UserModal',
      id: 'UserModal-View',
      user: user,
      mode: 'view',
      handleClickEdit: handleClickEdit,
      handleClickDelete: handleClickDelete,
    })
  }

  function handleClickEdit(id: string) {
    const user = (appData.users || []).find((e) => e.id === id)
    if (!user) {
      throw new Error('handleClickEdit post undefined')
    }
    handleModals.on({
      name: 'UserModal',
      id: 'UserModal-Edit',
      user: user,
      mode: 'edit',
    })
  }

  async function handleConfirmDelete(name: string, id: string, user: User) {
    await handleInstructions('deleteUser', { toDeleteId: user.id })
    handleModals.off(name, id)
  }

  async function handleClickDelete(id: string) {
    const user = (appData.users || []).find((e) => e.id === id)
    if (!user) {
      throw new Error('handleClickDelete post undefined')
    }
    handleModals.on({
      name: 'ConfirmModal',
      id: 'ContactModal-Delete',
      title: t('contact.deleteUser'),
      children: <div><span className='fw-light'>{t('contact.deleteUserDescription')}{': '}</span><span className='fw-bold'>{user.firstName}{' '}{user.lastName}</span></div>,
      mode: 'delete',
      info: user,
      handleConfirm: handleConfirmDelete
    })
  }

  if (element.navbar) {
    return (
      <div className={`d-flex flex-column align-items-center ${hover}`} onClick={() => handleClickContact(element.id)}>
        <div className="d-flex ratio ratio-1x1 rounded-circle bg-light overflow-hidden flex-shrink-0" style={{ width: 50, height: 50 }}>
          {element.picture ? (
            <img src={element.picture} className="card-img-top img-cover" alt="alt" />
          ) : (
            <IoPersonSharp className="bg-white" />
          )}
        </div>
      </div>
    )
  }

  if (element.vertical) {
    return (
      <div className={`d-flex flex-column align-items-center ${hover} px-0 px-sm-3 py-3`} onClick={() => handleClickContact(element.id)}>
        <div className="d-flex ratio ratio-1x1 rounded-circle bg-light overflow-hidden flex-shrink-0" style={{ width: element.lg ? 287 : 120, height: element.lg ? 287 : 120 }}>
          {element.picture ? (
            <img src={element.picture} className="card-img-top img-cover" alt="alt" />
          ) : (
            <IoPersonSharp className="bg-white" />
          )}
        </div>
        <div className="row gap-0 d-flex justify-content-center text-center mt-1">
          <div className="lead fs-4">{element.name}</div>
          {element.role && <div style={{ whiteSpace: 'nowrap' }}>{element.role}</div>}
          {element.phone && <div style={{ whiteSpace: 'nowrap' }}>{element.phone}</div>}
          {element.email && <div style={{ whiteSpace: 'nowrap' }}>{element.email}</div>}
        </div>
      </div>
    );
  } else {
    return (
      <div className={`d-flex flex-nowrap ${hover} px-0 px-sm-3 py-3`} onClick={() => handleClickContact(element.id)}>
        <div className="d-flex me-1 ratio ratio-1x1 rounded-circle bg-white overflow-hidden" style={{ width: 120, height: 120 }}>
          {element.picture ? (
            <img src={element.picture} className="card-img-top img-cover" alt="alt" />
          ) : (
            <IoPersonSharp className="bg-white" />
          )}
        </div>
        <div className="d-flex flex-column justify-content-center">
          <div className="lead fs-4" style={{ whiteSpace: 'nowrap' }}>{element.name}</div>
          {element.role && <div style={{ whiteSpace: 'nowrap' }}>{element.role}</div>}
          {element.phone && (
            <div style={{ whiteSpace: 'nowrap' }}>
              <a href={`tel:${element.phone}`}>{element.phone}</a>
            </div>
          )}
          {element.email && (
            <div style={{ whiteSpace: 'nowrap' }}>
              <a href={`mailto:${element.email}`}>{element.email}</a>
            </div>
          )}
        </div>
      </div>
    );
  }
}


