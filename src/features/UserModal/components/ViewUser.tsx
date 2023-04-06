import { Tools } from '@/components/Tools'
import { AppData } from '@/models/AppData'
import { ModalManager } from '@/models/Modal'
import { Permission, User } from '@/models/User'
import { UserModalData } from '@/models/UserModal'
import { useEffect, useState } from 'react'
import { Modal, Container, Row, Col } from 'react-bootstrap'
import { useTranslation } from 'react-i18next'
import { IoLogoGithub, IoLogoLinkedin } from 'react-icons/io5'

interface ViewUserProps {
  data: UserModalData
  modal: ModalManager
  appData: AppData
}

export default function ViewUser({ data, modal, appData }: ViewUserProps) {
  const { t } = useTranslation()
  const [permissions, setPermissions] = useState<string[]>([]);
  const user = data.user;
  
  useEffect(() => {
    const formattedPermissions = user.info.permissions;
    setPermissions(formattedPermissions);
  }, [user]);

  function isAdmin(): boolean {
    if (!appData.userDetails) return false;
    return appData.userDetails.permissions.includes(Permission.Admin);
  }

  let toolsToShow = {
    edit: false,
    delete: false,
  }
  if (data.user.id === appData.userDetails?.id) {
    toolsToShow.edit = true
  } 
  if (appData.userDetails?.permissions.includes(Permission.Admin)) {
    toolsToShow.delete = true
    toolsToShow.edit = true
  }
    
  function handleClickEditAndClose() {
    data.handleClickEdit(data.user.id)
    modal.off(data.name, data.id)
  }

  function handleClickDeleteAndClose() {
    data.handleClickDelete(data.user.id)
    modal.off(data.name, data.id)
  }

  return (
    <Modal
      show={modal.isModalVisible(data.name, data.id)}
      onHide={() => modal.off(data.name, data.id)}
      size="lg"
      fullscreen="xxl-down"
      keyboard={false}
    >
      <Modal.Header closeButton className="py-3 text-gray-700">
        <Modal.Title className=''>
          {(toolsToShow.edit || toolsToShow.delete) && 
            <Tools id={data.id} handleClickEdit={handleClickEditAndClose} handleClickDelete={handleClickDeleteAndClose} inline={true} opacity={1} toolsToShow={toolsToShow}/>}
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div className="container">
        <div className="row">
          <div className="col text-center">
            {user.info.picture && (
              <div className="user-picture mb-1">
                <img src={user.info.picture} alt="Profile picture" style={{ maxWidth: '300px', maxHeight: '300px', borderRadius: '50%' }} />
              </div>
            )}
            <div className="fs-1 fw-light">{user.firstName + ' ' + user.lastName}</div>
            <div className="text-muted mb-1">{user.info.email}</div>
            <div className="text-muted mb-3">{user.info.phone && user.info.phone}</div>
            <div className="d-flex flex-row justify-content-center gap-1">
              {user.info.github ? (
                <div style={{ cursor: 'pointer' }} onClick={() => window.open(user.info.github)}>
                  <IoLogoGithub size={36} style={{ opacity: 1 }} />
                </div>
              ) : (
                <div style={{ cursor: 'default' }}>
                  <IoLogoGithub size={36} style={{ opacity: 0.5 }} />
                </div>
              )}
              {user.info.linkedIn ? (
                <div style={{ cursor: 'pointer' }} onClick={() => window.open(user.info.linkedIn)}>
                  <IoLogoLinkedin size={36} style={{ opacity: 1 }} />
                </div>
              ) : (
                <div style={{ cursor: 'default' }}>
                  <IoLogoLinkedin size={36} style={{ opacity: 0.5 }} />
                </div>
              )}
            </div>
          </div>
        </div>
          <div className="row d-flex justify-content-center my-3">
            <div className="col border rounded fw-light px-4 py-2">
              {user.info.biography ? (
                <div className="fs-5 mb-1">{t('viewUser.biography')}: {user.info.biography}</div>
              ) : (
                <div className="fs-5 mb-1">{t('viewUser.biography')}: {t('viewUser.noBiography')}</div>
              )}
              <div className="fs-5 mb-1">{t('viewUser.studsYear')}: {user.studsYear}</div>
              <div className="fs-5 mb-1">
                {user.info.master ? (
                  <div>{t('viewUser.master')}: {user.info.master}</div>
                ) : (
                  <div>{t('viewUser.master')}: {t('viewUser.noMaster')}</div>
                )}
              </div>
              <div className="fs-5 mb-1">
                {user.info.role ? (
                  <div>{t('viewUser.role')}: {t(user.info.role)}</div>
                ) : (
                  <div>{t('viewUser.role')}: {t('viewUser.noRole')}</div>
                )}
              </div>
              <div className="fs-5 mb-1">
                {user.info.allergies ? (
                  <div>{t('viewUser.allergies')}: {user.info.allergies}</div>
                ) : (
                  <div>{t('viewUser.allergies')}: {t('viewUser.noAllergies')}</div>
                )}
              </div>
              {isAdmin() && (
                <div>
                  <br />
                  <div className="fs-4 mb-1">{t('viewUser.permissions')}: </div>
                  <div className="fs-5 mb-1">
                    <ul>
                      {permissions.length > 0 ? (
                        permissions.map((permission, index) => (
                          <li key={index}>{t(`${permission}`)}</li>
                          ))
                          ) : (
                          <li>{t('viewUser.noPermissions')}</li>
                      )}
                    </ul>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </Modal.Body>
    </Modal>
  );
}