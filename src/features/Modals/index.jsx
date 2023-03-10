import ConfirmModal from '@/features/ConfirmModal/index.jsx'
import PostModal from '@/features/PostModal/index.jsx'
const modals = {
  PostModal,
  ConfirmModal
}
// This component is reused from a TellusTalk AB React project with permission. // William Bigert 2023-01-31
export default function Modals ({ modal, ...props }) {
  return modal.data.map(entry => {
    const ModalComponent = modals[entry.name]
    const propsPrior = { ...props, configStateHookProps: undefined }
    return (
      <ModalComponent
        key={entry.id ?? entry.name}
        modal={{ ...modal, ...entry, show: !entry.hideDate }}
        data={entry}
        {...propsPrior}
        {...props.configStateHookProps}
      />
    )
  })
}
