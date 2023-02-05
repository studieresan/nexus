import { useTranslation } from 'react-i18next'
import EditEvent from './components/EditEvent.jsx'
import ViewEvent from './components/ViewEvent.jsx'
export default function EventPostModal ({ modal, data, appData }) {
  return data.mode === 'view'
    ? (
      <ViewEvent modal={modal} post={data.post} />
      )
    : (
      <EditEvent modal={modal} post={data.post} appData={appData} />
      )
}
