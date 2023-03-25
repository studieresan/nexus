export interface OverlayGroup {
  icon: JSX.Element;
  title: string;
  description: string;
  button: string;
  key: number;
  ref: React.RefObject<HTMLElement>;
}