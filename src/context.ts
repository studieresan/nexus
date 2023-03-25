import { createContext } from 'react'
import { AppData } from '@/models/AppData'
const defaultAppData: AppData = {
  users: null,
  blogPosts: null,
  events: null,
  loggedIn: false,
  userDetails: null,
};
export const AppDataContext = createContext(defaultAppData)

export const HandleInstructionsContext = createContext<(instructions: any) => void>(() => {
  console.warn('HandleInstructionsContext is not initialized');
});
