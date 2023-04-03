import { AppDataContext, HandleInstructionsContext } from '@/context.js'
import { useContext } from 'react'
import EditPost from './components/EditPost'
import ViewPost from './components/ViewPost'
import { ModalManager } from '@/models/Modal'
import { CreateEventPost } from '@/models/EventPost'
import { CreateBlogPost } from '@/models/BlogPost'
import { AppData } from '@/models/AppData'
import { PostModalData } from '@/models/PostModal'


export interface PostModalProps {
  modal: ModalManager,
  data: PostModalData
}



export default function PostModal ({ modal, data }: PostModalProps) {
  const handleInstructions = useContext(HandleInstructionsContext)
  const appData = useContext(AppDataContext)

  async function handleSubmit (formData: CreateBlogPost | CreateEventPost) {
    const payload = { ...formData, date: formData.date || new Date().toISOString() }
    
    if (payload.id) {
      const instruction = `update` + (data.type === 'blogPost' ? 'BlogPost' : 'EventPost')
      await handleInstructions(instruction, { [data.type]: payload })
    } else {
      const instruction = `create` + (data.type === 'blogPost' ? 'BlogPost' : 'EventPost')
      await handleInstructions(instruction, { [data.type]: payload })
    }
    modal.off(data.name, data.id)
  }
  if (data.mode === 'view') return <ViewPost modal={modal} data={data} appData={appData} post={data.post} />
  else return <EditPost modal={modal} data={data} appData={appData} handleSubmit={handleSubmit} />
}
