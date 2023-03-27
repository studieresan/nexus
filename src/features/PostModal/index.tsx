import { HandleInstructionsContext } from '@/context.js'
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
  data: PostModalData,
  appData: AppData
}



export default function PostModal ({ modal, data, appData }: PostModalProps) {
  const handleInstructions = useContext(HandleInstructionsContext)

  async function handleSubmit (formData: CreateBlogPost | CreateEventPost) {
    const payload = { ...formData, date: formData.date || new Date().toISOString() }
    console.log('payload: ', { ...payload })
    
    const key = data.type === 'Blog' ? 'blogPost' : 'event'
    if (payload.id) {
      await handleInstructions(`update${data.type}`, { [key]: payload })
    } else {
      await handleInstructions(`create${data.type}`, { [key]: payload })
    }
    modal.off(data.name, data.id)
  }
  if (data.mode === 'view') return <ViewPost modal={modal} data={data} post={data.post} />
  else return <EditPost modal={modal} data={data} appData={appData} handleSubmit={handleSubmit} />
}
