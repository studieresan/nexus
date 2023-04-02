import { AppDataContext, HandleModalsContext } from '@/context'
import { ContactElement } from '@/models/Contact'
import { useTranslation } from 'react-i18next'
import { IoPersonSharp } from 'react-icons/io5'
import { useContext } from 'react'
interface ContactProps {
  element: ContactElement
}

export default function Contact({ element }: ContactProps): JSX.Element {
  const handleModals = useContext(HandleModalsContext)
  const appData = useContext(AppDataContext)
  const { t } = useTranslation();

  function handleClickContact (id: string) {
    const user = (appData.users || []).find((e) => e.id === id)
    if (!user) {
      throw new Error('handleClickEdit post undefined')
    }
    handleModals.on({
      name: 'UserModal',
      id: 'UserModal-View',
      user: user,
      mode: 'view',
    })
  }

  function handleClickEdit (id: string) {
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

  if (element.vertical) {
    return (
      <div className="d-flex flex-column align-items-center contact-hover" onClick={() => handleClickContact(element.id)}>
        <div className="d-flex ratio ratio-1x1 rounded-circle bg-white overflow-hidden flex-shrink-0" style={{ width: element.lg ? 287 : 120, height: element.lg ? 287 : 120 }}>
          {element.picture ? (
            <img src={element.picture} className="card-img-top img-cover" alt="alt" />
          ) : (
            <IoPersonSharp className="bg-white" />
          )}
        </div>
        <div className="row gap-0 d-flex justify-content-center text-center mt-1">
          <div className="lead fs-4" style={{ whiteSpace: 'nowrap' }}>{element.name}</div>
          {element.role && <div style={{ whiteSpace: 'nowrap' }}>{element.role}</div>}
          {element.phone && <div style={{ whiteSpace: 'nowrap' }}>{element.phone}</div>}
          {element.email && <div style={{ whiteSpace: 'nowrap' }}>{element.email}</div>}
        </div>
      </div>
    );
  } else {
    return (
      <div className="d-flex flex-nowrap contact-hover" onClick={() => handleClickContact(element.id)}>
        <div className="d-flex ratio ratio-1x1 rounded-circle bg-white overflow-hidden" style={{ width: 120, height: 120 }}>
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


