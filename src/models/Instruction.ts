import { AppData } from "./AppData";
import { BlogPost } from "./BlogPost"
import { EventPost } from "./EventPost"

export interface InstructionArgs {
  appData: AppData, 
  setAppData: (appData: AppData) => void, 
  navigateTo: (path: string) => void
}

export interface InstructionData {
  blogPost?: BlogPost
  eventPost?: EventPost
  toDeleteId?: string
  email?: string
  password?: string
  confirmPassword?: string
  resetToken?: string
}