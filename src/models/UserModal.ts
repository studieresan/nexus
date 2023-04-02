import { User } from "./User";

export interface UserModalData {
  mode: 'view' | 'edit',
  user: User,
  name: string,
  id: string,
}