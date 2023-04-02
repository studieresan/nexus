import { createContext } from 'react'
import { AppData } from '@/models/AppData'
import { InstructionData } from './models/Instruction';
import { ModalManager } from './models/Modal';
const defaultAppData: AppData = {
  users: null,
  blogPosts: null,
  events: null,
  loggedIn: false,
  userDetails: null,
};
export const AppDataContext = createContext(defaultAppData)

type HandleInstructions = (
  instruction: string,
  data?: InstructionData
) => Promise<void>;

export const HandleInstructionsContext = createContext<HandleInstructions>((instruction, data) => {
  console.warn('HandleInstructionsContext is not initialized');
  return Promise.resolve(); // Return an empty resolved Promise
});

export const HandleModalsContext = createContext<ModalManager>({
  data: [],
  on: (modal) => {
    console.warn('HandleModalsContext is not initialized');
  },
  off: (name, id) => {
    console.warn('HandleModalsContext is not initialized');
  },
  isModalVisible: (name, id) => {
    console.warn('HandleModalsContext is not initialized');
    return false;
  },
  toasts: {
    data: [],
    setData: (toastArray) => {
      console.warn('HandleModalsContext is not initialized');
    },
    on: (toast) => {
      console.warn('HandleModalsContext is not initialized');
    },
    off: (id) => {
      console.warn('HandleModalsContext is not initialized');
    }
  }
});