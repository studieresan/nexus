import { ModalManager } from '@/models/Modal'
import { User } from '@/models/User'
import { UserModalData } from '@/models/UserModal'
import { useEffect, useState } from 'react'
import { Modal } from 'react-bootstrap'

interface ViewUserProps {
  data: UserModalData
  modal: ModalManager
}

export default function ViewUser({ data, modal }: ViewUserProps) {
  const [permissions, setPermissions] = useState<string[]>([]);
  const user = data.user;
  
  useEffect(() => {
    const formattedPermissions = user.info.permissions;
    setPermissions(formattedPermissions);
  }, [user]);

  return (
    <Modal
      show={modal.isModalVisible(data.name, data.id)}
      onHide={() => modal.off(data.name, data.id)}
      size="xl"
      fullscreen="xxl-down"
      keyboard={false}
    >
      <Modal.Header closeButton className="py-2 text-gray-700">
        <Modal.Title>{`${user.firstName} ${user.lastName}'s Profile`}</Modal.Title>
      </Modal.Header>
      <div className="d-flex px-4 bg-light">
        <Modal.Body>
          <h1 className="fw-light">{user.firstName + ' ' + user.lastName}</h1>
          <p className="text-muted">{user.info.email}</p>
          <p>Role: {user.info.role}</p>
          <p>Studs Year: {user.studsYear}</p>
          {user.info.linkedIn && (
            <p>
              LinkedIn: <a href={user.info.linkedIn}>{user.info.linkedIn}</a>
            </p>
          )}
          {user.info.github && (
            <p>
              GitHub: <a href={user.info.github}>{user.info.github}</a>
            </p>
          )}
          {user.info.phone && <p>Phone: {user.info.phone}</p>}
          {user.info.picture && (
            <div className="user-picture">
              <img src={user.info.picture} alt="Profile picture" />
            </div>
          )}
          {user.info.allergies && <p>Allergies: {user.info.allergies}</p>}
          {user.info.master && <p>Master: {user.info.master}</p>}
          <div>
            <h4>Permissions:</h4>
            <ul>
              {permissions.map((permission, index) => (
                <li key={index}>{permission}</li>
              ))}
            </ul>
          </div>
        </Modal.Body>
      </div>
    </Modal>
  );
}
