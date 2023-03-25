import { ContactElement } from "./Contact"
import { CardElement } from "./DynamicCard"

export interface GroupInfo {
  year: number
  title: string
  elements: CardElement[] | ContactElement[]
} 