export type LanguageCode = "en" | "sv" | "no" | "fi" | "de";
export interface Country {
  icon: JSX.Element;
  code: LanguageCode;
  text: string;
}