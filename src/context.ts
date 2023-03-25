import { createContext } from 'react'
import { AppData } from '@/models/AppData'
import { InstructionData } from './models/Instruction';
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
