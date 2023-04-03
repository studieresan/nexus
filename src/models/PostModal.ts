import { BlogPost } from "./BlogPost";
import { EventPost } from "./EventPost";

export interface PostModalData {
  mode: 'view' | 'edit',
  post: BlogPost | EventPost,
  name: string,
  id: string,
  type: 'blogPost' | 'eventPost',
  handleClickEdit: (id: string) => void,
  handleClickDelete: (id: string) => void,
}