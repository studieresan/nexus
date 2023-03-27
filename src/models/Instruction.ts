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
  event?: EventPost
  toDeleteId?: string
  email?: string
  password?: string
}