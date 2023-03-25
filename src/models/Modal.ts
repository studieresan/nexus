import { ToastData } from "./Toast";

export interface ModalData {
  name: string;
  id: string;
  [key: string]: any;
}

export interface ModalManager {
  data: ModalData[];
  on: (modal: ModalData) => void;
  off: (name: string, id: string) => void;
  isModalVisible: (name: string, id: string) => boolean;
  toasts: {
    data: ToastData[];
    setData: (toastArray: ToastData[]) => void;
    on: (toast: ToastData) => void;
    off: (id: string) => void;
  };
}