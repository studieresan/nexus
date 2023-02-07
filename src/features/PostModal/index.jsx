import { HandleInstructionsContext } from '@/context.js'
import { useContext } from 'react'
import { useTranslation } from 'react-i18next'
import EditPost from './components/EditPost.jsx'
import ViewPost from './components/ViewPost.jsx'
export default function PostModal ({ modal, data, appData }) {
  const { t, i18n } = useTranslation()
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

  return data.mode === 'view'
    ? (
      <ViewPost modal={modal} post={data.post} />
      )
    : (
      <EditPost modal={modal} post={data.post} appData={appData} handleSubmit={handleSubmit} />
      )
}
