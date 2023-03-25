export interface GroupElement {
  id: string
  cardTitle: string
  cornerImg: JSX.Element
  cornerText: string
  dateText: string
  bgImg: string
  danger?: string
}

export interface GroupInfo {
  year: number
  title: string
  elements: GroupElement[]
} 