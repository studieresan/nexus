import { HandleInstructionsContext } from '@/context.js'
import { useContext } from 'react'
import EditPost from './components/EditPost'
import ViewPost from './components/ViewPost'
import { ModalManager } from '@/models/Modal'
import { CreateEvent, Event } from '@/models/Event'
import { Blog, CreateBlog } from '@/models/Blog'
import { AppData } from '@/models/AppData'

export interface PostModalProps {
  modal: ModalManager,
  data: {
    mode: 'view' | 'edit',
    post: Blog | Event,
    name: string,
    id: string,
    type: 'Blog' | 'Event'
  }
  appData: AppData
}

export interface InstructionData {
  blogPost?: Blog
  event?: Event
  toDeleteId?: string
  email?: string
  password?: string
}

export default function PostModal ({ modal, data, appData }: PostModalProps) {
  const handleInstructions = useContext(HandleInstructionsContext)

  async function handleSubmit (formData: CreateBlog | CreateEvent) {
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
  if (data.mode === 'view') return <ViewPost modal={modal} post={data.post} />
  else return <EditPost modal={modal} data={data} appData={appData} handleSubmit={handleSubmit} />
}
