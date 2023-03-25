export interface GroupMasters {
  economy: GroupMaster
  event: GroupMaster
  info: GroupMaster
  it: GroupMaster
  travel: GroupMaster
  sales: GroupMaster
}

export interface GroupMaster {
  masterId: string
  masterFirstName: string
  masterLastName: string
  icon: JSX.Element
}

export interface GroupIcons {
  name: "project" | "events" | "contact"
  icon: JSX.Element
}