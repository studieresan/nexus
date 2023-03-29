export interface OverlayGroup {
  name: 'project' | 'events' | 'contact';
  title: string;
  description: string;
  button: string;
  key: number;
  ref: React.RefObject<HTMLElement>;
}