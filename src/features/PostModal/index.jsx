import { HandleInstructionsContext } from '@/context.js'
import { useContext } from 'react'
import EditPost from './components/EditPost.jsx'
import ViewPost from './components/ViewPost.jsx'
export default function PostModal ({ modal, data, appData }) {
  const handleInstructions = useContext(HandleInstructionsContext)

  async function handleSubmit (formData) {
    const payload = { ...formData, date: formData.date || new Date().toISOString() }
    console.log('payload: ', { ...payload })
    if (payload.id) {
      await handleInstructions(`update${data.type}`, { post: payload })
    } else {
      await handleInstructions(`create${data.type}`, { post: payload })
    }
    modal.off(modal)
  }
  if (data.mode === 'view') return <ViewPost modal={modal} post={data.post} />
  else return <EditPost modal={modal} post={data.post} appData={appData} handleSubmit={handleSubmit} />
}
