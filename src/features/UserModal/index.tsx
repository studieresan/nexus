import { HandleInstructionsContext } from '@/context.js'
import { useContext } from 'react'
import { ModalManager } from '@/models/Modal'
import { AppData } from '@/models/AppData'
import { UserModalData } from '@/models/UserModal'
import { User } from '@/models/User'
import ViewUser from './components/ViewUser'
import EditUser from './components/EditUser'


export interface UserModalProps {
  modal: ModalManager,
  data: UserModalData,
  appData: AppData
}



export default function UserModal ({ modal, data, appData }: UserModalProps) {
  const handleInstructions = useContext(HandleInstructionsContext)

  async function handleSubmit (formData: User) {
    
    if (formData.id) {
      await handleInstructions('updateUser', { user: formData })
    } else {
      await handleInstructions('createUser', { user: formData })
    }
    modal.off(data.name, data.id)
  }
  if (data.mode === 'view') return <ViewUser modal={modal} data={data} appData={appData} />
  else return <EditUser modal={modal} data={data} appData={appData} handleSubmit={handleSubmit} />
}
