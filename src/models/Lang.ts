export type LanguageCode = "en" | "sv" | "no" | "fi";
export interface Country {
  icon: JSX.Element;
  code: LanguageCode;
  text: string;
}