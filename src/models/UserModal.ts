import { User } from "./User";

export interface UserModalData {
  mode: 'view' | 'edit',
  user: User,
  name: string,
  id: string,
  handleClickEdit: (id: string) => void,
  handleClickDelete: (id: string) => void,
}