import { User } from './User';
import { Blog } from './Blog';
import { Event } from './Event';
import { LoginResponse } from './Login';

export interface AppData {
  users: User[] | null
  blogPosts: Blog[] | null
  events: Event[]  | null
  loggedIn: boolean
  userDetails: LoginResponse | null
}