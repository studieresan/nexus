import { Blog } from "./Blog"
import { Event } from "./Event"

export interface InstructionData {
  blogPost?: Blog
  event?: Event
  toDeleteId?: string
  email?: string
  password?: string
}