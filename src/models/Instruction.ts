import { AppData } from "./AppData";
import { Blog } from "./Blog"
import { Event } from "./Event"

export interface InstructionArgs {
  appData: AppData, 
  setAppData: (appData: AppData) => void, 
  navigateTo: (path: string) => void
}

export interface InstructionData {
  blogPost?: Blog
  event?: Event
  toDeleteId?: string
  email?: string
  password?: string
}