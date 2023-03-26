export interface CardElement {
  id: string;
  cardTitle: string;
  cornerImg: React.ReactNode | null;
  cornerText: string | null;
  dateText: string;
  bgImg: string;
  danger: string | null;
}