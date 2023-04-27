import { Tools } from '@/components/Tools'
import { AppData } from '@/models/AppData'
import { ModalManager } from '@/models/Modal'
import { Permission, User } from '@/models/User'
import { UserModalData } from '@/models/UserModal'
import React, { useEffect, useState } from 'react'
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

  function SocialIcon({ icon, url }: { icon: JSX.Element, url?: string }) {
    return (
      <div style={{ cursor: url ? "pointer" : "default" }} onClick={() => url && window.open(url)} >
        {React.cloneElement(icon, { size: 36, style: { opacity: url ? 1 : 0.5 } })}
      </div>
    )
  }
  
  function UserInfoLine({ label, value, fallback }: { label: string, value: string | number | undefined, fallback: string | number }) {
    return (
      <div className="fs-5 mb-1">
        {label}: {value || fallback}
      </div>
    )
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
                  <img src={user.info.picture} alt="Profile picture" style={{ maxWidth: "300px", maxHeight: "300px", borderRadius: "50%",}} />
                </div>
              )}
              <div className="fs-1 fw-light">
                {user.firstName + " " + user.lastName}
              </div>
              <div className="text-muted mb-1">{user.info.email}</div>
              <div className="text-muted mb-3">{user.info.phone}</div>
              <div className="d-flex flex-row justify-content-center gap-1">
                <SocialIcon
                  icon={<IoLogoGithub />}
                  url={user.info.github}
                />
                <SocialIcon
                  icon={<IoLogoLinkedin />}
                  url={user.info.linkedIn}
                />
              </div>
            </div>
          </div>
          <div className="row d-flex justify-content-center my-3">
            <div className="col border rounded fw-light px-4 py-2">
              <UserInfoLine
                label={t("viewUser.biography")}
                value={user.info.biography}
                fallback={t("viewUser.noBiography")}
              />
              <UserInfoLine
                label={t("viewUser.studsYear")}
                value={user.studsYear}
                fallback={-1}
              />
              <UserInfoLine
                label={t("viewUser.master")}
                value={user.info.master}
                fallback={t("viewUser.noMaster")}
              />
              <UserInfoLine
                label={t("viewUser.role")}
                value={t(user.info.role)}
                fallback={t("viewUser.noRole")}
              />
              {isAdmin() && (
                <div>
                  <br />
                  <div className="fs-4 mb-1">
                    {t("viewUser.permissions")}:
                  </div>
                  <div className="fs-5 mb-1">
                    <ul>
                      {permissions.length > 0 ? (
                        permissions.map((permission, index) => (
                          <li key={index}>{t(`${permission}`)}</li>
                        ))
                      ) : (
                        <li>{t("viewUser.noPermissions")}</li>
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