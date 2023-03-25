import { ContactElement } from "./Contact"
import { CardElement } from "./DynamicCard"
import { User } from "./User"

export interface ElementGroupInfo {
  year: number
  title: string
  elements: CardElement[] | ContactElement[]
} 

export interface StudsGroupInfo {
  master: User; // Add the appropriate type for the 'master' property
  name: string;
  title: string;
  description: string;
  icon: string; // Add the appropriate type for the 'icon' property
  elements?: CardElement[] | ContactElement[]; // Make 'elements' optional
}