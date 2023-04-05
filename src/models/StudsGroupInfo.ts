import { User } from "./User";

export interface StudsGroupInfo {
  manager?: User; // Add the appropriate type for the 'master' property
  name: string;
  title: string;
  description: string;
  icon: JSX.Element;
}