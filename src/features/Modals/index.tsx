import ConfirmModal, { ConfirmModalProps } from '@/features/ConfirmModal/index.jsx'
import PostModal, { PostModalProps } from '@/features/PostModal/index.jsx'
import { AppData } from '@/models/AppData';
import { ModalManager } from '@/models/Modal'
import UserModal, { UserModalProps } from '@/features/UserModal/index.jsx';
// This component is reused from a TellusTalk AB React project with permission. // William Bigert 2023-01-31

interface ModalComponents {
  UserModal: ({ modal, data, appData }: UserModalProps) => JSX.Element;
  PostModal: ({ modal, data, appData }: PostModalProps) => JSX.Element;
  ConfirmModal: ({ modal, data }: ConfirmModalProps) => JSX.Element;
  [key: string]: (props: any) => JSX.Element;
}

const modals: ModalComponents = {
  UserModal,
  PostModal,
  ConfirmModal
}

interface ModalsProps {
  modal: ModalManager,
  appData: AppData,
  [key: string]: any
}

export default function Modals ({ modal, ...props }: ModalsProps) {
  return (
    <>
      {modal.data.map(entry => {
        const ModalComponent = modals[entry.name];
        return (
          <ModalComponent
            key={entry.id ?? entry.name}
            modal={{ ...modal, ...entry, show: !entry.hideDate }}
            data={entry}
            {...props}
          />
        );
      })}
    </>
  );
}
