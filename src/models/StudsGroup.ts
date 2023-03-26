import { User } from "./User";

export interface StudsGroup {
  master: User; // Add the appropriate type for the 'master' property
  name: string;
  title: string;
  description: string;
  icon: string; // Add the appropriate type for the 'icon' property
}