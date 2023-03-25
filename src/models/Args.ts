import { AppData } from "./AppData";

export interface InstructionSwitchboardArgs {
  appData: AppData, 
  setAppData: (appData: AppData) => void, 
  navigateTo: (path: string) => void
}