import { LoginResponse } from "@/models/Login"
import { User } from "@/models/User"

export function setLoggedIn (response: LoginResponse) : void {
  localStorage.loggedIn = 'true'
  localStorage.token = response.token
  localStorage.userDetails = JSON.stringify(response)
}

export function setLoggedOut () : void {
  localStorage.removeItem('loggedIn')
  localStorage.removeItem('token')
  localStorage.removeItem('userDetails')
}

export function loggedIn () : boolean {
  return localStorage.loggedIn === 'true'
}
