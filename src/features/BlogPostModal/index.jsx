import { useTranslation } from 'react-i18next'
import EditPost from './components/EditPost.jsx'
import ViewPost from './components/ViewPost.jsx'
export default function BlogPostModal ({ modal, data, appData }) {
  const { t, i18n } = useTranslation()
  return data.mode === 'view'
    ? (
      <ViewPost modal={modal} post={data.post} />
      )
    : (
      <EditPost modal={modal} post={data.post} appData={appData} />
      )
}
