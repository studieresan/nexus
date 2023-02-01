export function setLoggedIn (response) {
  localStorage.loggedIn = 'true'
  localStorage.token = response.token
  localStorage.userDetails = JSON.stringify(response)
}

export function setLoggedOut () {
  localStorage.removeItem('loggedIn')
  localStorage.removeItem('token')
  localStorage.removeItem('userDetails')
}

export function loggedIn () {
  return localStorage.loggedIn === 'true'
}
