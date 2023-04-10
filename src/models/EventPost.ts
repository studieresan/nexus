import { User } from './User'

interface EventFields {
  readonly id: string
  title: string
  description: string
  date: Date
  studsYear: number
  pictures: string[]
  frontPicture: string
  published: boolean
}

export interface EventPost extends EventFields {
  author: User | null
}

export interface EventPostStringifedAuthor extends EventFields {
  author: string
}