import { User } from './User'

export interface BlogFields {
    readonly id: string
    title: string
    description: string
    date: Date
    studsYear: number
    pictures: string[]
    frontPicture: string
    published: boolean
}

export interface BlogPost extends BlogFields {
    author: User
}

export interface BlogPostStringifiedAuthor extends BlogFields {
    author: string
}