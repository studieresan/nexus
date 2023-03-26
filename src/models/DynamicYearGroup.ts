import { ContactElement } from "./Contact"
import { CardElement } from "./CardElement"
import { User } from "./User"

export interface DynamicYearGroup {
  year: number
  title: string
  elements: CardElement[] | ContactElement[]
} 