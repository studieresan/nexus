import { User } from './User';
import { BlogPost } from './BlogPost';
import { EventPost } from './EventPost';
import { LoginResponse } from './Login';

export interface AppData {
  users: User[] | null
  blogPosts: BlogPost[] | null
  events: EventPost[] | null
  loggedIn: boolean
  userDetails: LoginResponse | null
  didFetchCollections: boolean
}