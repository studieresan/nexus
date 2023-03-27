import { BlogPost } from "./BlogPost";
import { EventPost } from "./EventPost";

export interface PostModalData {
  mode: 'view' | 'edit',
  post: BlogPost | EventPost,
  name: string,
  id: string,
  type: 'Blog' | 'Event'
}