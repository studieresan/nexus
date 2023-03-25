import { ToastData } from "./Toast";

export interface ModalData {
  name: string;
  id: string;
  [key: string]: any;
}

export interface ModalManager {
  data: ModalData[];
  on: (modal: ModalData) => void;
  off: (modal: Pick<ModalData, 'name' | 'id'>) => void;
  toasts: {
    data: ToastData[];
    setData: (toastArray: ToastData[]) => void;
    on: (toast: ToastData) => void;
    off: (toast: Pick<ToastData, 'id'>) => void;
  };
}