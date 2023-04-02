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

  return (
    <Modal
      show={modal.isModalVisible(data.name, data.id)}
      onHide={() => modal.off(data.name, data.id)}
      size="lg"
      fullscreen="xxl-down"
      keyboard={false}
    >
      <Modal.Header closeButton className="py-2 text-gray-700">
        <Modal.Title>{`${user.firstName} ${user.lastName}${t('viewUser.profile')}`}</Modal.Title>
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
            <div className="col-10 border rounded fw-light px-4 py-2">
              {user.info.biography ? (
                <div className="fs-5 mb-1">{t('viewUser.biography')}: {user.info.biography}</div>
              ) : (
                <div className="fs-5 mb-1">{t('viewUser.noBiography')}</div>
              )}
              <div className="fs-5 mb-1">{t('viewUser.studsYear')}: {user.studsYear}</div>
              <div className="fs-5 mb-1">
                {user.info.master ? (
                  <div>{t('viewUser.master')}: {user.info.master}</div>
                ) : (
                  <div>{t('viewUser.noMaster')}</div>
                )}
              </div>
              <div className="fs-5 mb-1">
                {user.info.role ? (
                  <div>{t('viewUser.role')}: {user.info.role}</div>
                ) : (
                  <div>{t('viewUser.noRole')}</div>
                )}
              </div>
              <div className="fs-5 mb-1">
                {user.info.allergies ? (
                  <div>{t('viewUser.allergies')}: {user.info.allergies}</div>
                ) : (
                  <div>{t('viewUser.noAllergies')}</div>
                )}
              </div>
              {isAdmin() && (
                <div>
                  <br />
                  <div className="fs-4 mb-1">{t('viewUser.permissions')}: </div>
                  <div className="fs-5 mb-1">
                    {permissions.length > 0 ? (
                      permissions.map((permission, index) => (
                        <div key={index}>{t(`user.permission.${permission}`)}</div>
                      ))
                    ) : (
                      t('viewUser.noPermissions')
                    )}
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