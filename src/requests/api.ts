import { EventPost } from '@/models/EventPost'
import { User } from '@/models/User'
import { BlogPost } from '@/models/BlogPost'
import { pickBy } from 'lodash'

// This file was copied and reused from the old frontend repository
const BASE_URL =  'https://devapi.studs.se' // 'http://localhost:5040'
const GRAPHQL = '/graphql'
const SIGNUP = '/signup'
const LOGIN = '/login'
const PASSWORD_UPDATE = '/account/password'
const PASSWORD_FORGOT = '/forgot'
const PASSWORD_RESET = '/reset'
const STATUS_OK = 200

function checkStatus (response: Response) {
  if (response.status >= STATUS_OK && response.status < 300) {
    return Promise.resolve(response)
  } else {
    return Promise.reject(response)
  }
}

function parseJSON (response: Response): Promise<any> {
  return response.json()
}

function credentials (): RequestCredentials {
  return 'include'
}

function jsonHeader () {
  return {
    'Content-Type': 'application/json'
  }
}

function authorizationHeader () {
  const jwtToken = localStorage.token
  return {
    Authorization: `Bearer ${jwtToken}`
  }
}

function graphQLHeader () {
  return {
    'Content-Type': 'application/graphql'
  }
}

function ftch (input: any, init: any): Promise<any> {
  return fetch(input, init)
    .then(checkStatus)
    .then(parseJSON)
}

function executeGraphQL(query: string): Promise<any> {
  const url = `${BASE_URL}${GRAPHQL}`;
  return ftch(url, {
    method: 'POST',
    credentials: credentials(),
    headers: {
      ...authorizationHeader(),
      ...graphQLHeader(),
    },
    body: query,
  });
}

const USER_PROFILE_FIELDS = `
  email
  phone
  linkedIn
  biography
  github
  master
  allergies  
`

export function fetchUser () {
  const query = `{
    user {
      id
      firstName
      lastName
      studsYear
      info {
        ${USER_PROFILE_FIELDS}
        role
        picture
        permissions
      }
    }
  }
  `
  return executeGraphQL(query).then(res => {
    return Promise.resolve({
      id: res.data.user.id,
      firstName: res.data.user.firstName,
      lastName: res.data.user.lastName,
      studsYear: res.data.user.studsYear,
      info: res.data.user.info,
      permissions: res.data.user.info.permissions
    })
  })
}

function toGraphQLFields (obj: any): string {
  // This will remove any key which has a 'null' value
  const withoutNulls = pickBy(obj, a => a !== null && a !== undefined)
  return JSON.stringify(withoutNulls).replace(/"([^"]*)":/g, '$1:')
}

function wrapInQuotes (str: string): string {
  return '"' + str.replace(/"/g, '\\"') + '"'
}

export function updateUser (newFields: string) {
  const mutation = `mutation {
    userUpdate(id: null, info: ${toGraphQLFields(newFields)}) {
      ${USER_PROFILE_FIELDS}
    }
  } `
  return executeGraphQL(mutation).then(res => {
    return res.data.userUpdate
  })
}

export function createUser (userInfo: User) {
  const body = JSON.stringify({
    ...userInfo,
    token: process.env.REACT_APP_SIGNUP_TOKEN || 'asdf'
  })

  return ftch(BASE_URL + SIGNUP, {
    method: 'POST',
    headers: {
      ...jsonHeader()
    },
    body
  })
}

export function loginUser (email: string, password: string) {
  const data = {
    email,
    password
  }
  const post = {
    method: 'POST',
    credentials: credentials(),
    headers: {
      ...jsonHeader()
    },
    body: JSON.stringify(data)
  }
  return ftch(BASE_URL + LOGIN, post)
}

export function updateUserPassword (password: string, confirmPassword: string) {
  const post: RequestInit = {
    method: 'PUT',
    credentials: 'include',
    headers: {
      ...authorizationHeader(),
      ...jsonHeader()
    },
    body: JSON.stringify({
      password,
      confirmPassword
    })
  }
  return ftch(BASE_URL + PASSWORD_UPDATE, post)
}

export function fetchUsers () {
  // users(userRole: null, studsYear: ${studsYear}) {
  const query = `{
    users(userRole: null) {
      id
      firstName
      lastName
      studsYear
      info { 
        ${USER_PROFILE_FIELDS}
        role
        picture
        permissions
      }
    }
  }
  `
  return executeGraphQL(query).then(res => res.data.users)
}

export function requestPasswordReset (email: string) {
  const url = `${BASE_URL}${PASSWORD_FORGOT}`
  return ftch(url, {
    method: 'POST',
    headers: {
      ...jsonHeader()
    },
    body: JSON.stringify({
      email
    })
  })
}

export function resetPassword (password: string, confirmPassword: string, token: string) {
  const url = `${BASE_URL}${PASSWORD_RESET}/${token}`
  return ftch(url, {
    method: 'POST',
    headers: {
      ...jsonHeader()
    },
    body: JSON.stringify({
      password,
      confirmPassword
    })
  })
}

const EVENT_FIELDS = `
  id
  published
  title
  description
  pictures
  studsYear
  frontPicture
  author {
    id
    firstName
    lastName
    studsYear
    info {
      ${USER_PROFILE_FIELDS}
      role
      picture
      permissions
    }
  }
  date
`

export function fetchEvents () {
  const query = `query {
    events {
      ${EVENT_FIELDS}
    }
  }`
  return executeGraphQL(query)
    .then(res => res.data.events)
    .then(events =>
      events.map((e: EventPost) => ({
        ...e,
        date: new Date(e.date)
      }))
    )
}

export function createEvent (event: EventPost) {
  const mutation = `mutation {
    eventCreate(fields: ${toGraphQLFields(event)}) {
      ${EVENT_FIELDS}
    }
  }
  `
  return executeGraphQL(mutation)
    .then(res => res.data.eventCreate)
    .then(event => ({ ...event, date: new Date(event.date) }))
}

export function updateEvent (event: EventPost) {
  const mutation = `mutation {
    eventUpdate(id: "${event.id}", fields: ${toGraphQLFields(event)}) {
      ${EVENT_FIELDS}
    }
  }
  `
  return executeGraphQL(mutation)
    .then(res => res.data.eventUpdate)
    .then(event => ({ ...event, date: new Date(event.date) }))
}

export function removeEventWithId (id: string) {
  if (id) {
    const mutation = `mutation {
      eventDelete(id: "${id}")
    }
    `
    return executeGraphQL(mutation).then(res => res.data.eventDelete)
  }
}

// TODO
// export function notifyBefore(eventId) {
//   return ftch(`${BASE_URL}${EVENTS}/${eventId}/notify_before`, header())
// }

// export function notifyAfter(eventId) {
//   return ftch(`${BASE_URL}${EVENTS}/${eventId}/notify_after`, header())
// }

export function uploadImage (file: File) {
  const signedUrlEndpoint = `${BASE_URL}/signed-upload?file-name=${
    file.name
  }&file-type=${file.type}`

  const options = {
    method: 'GET',
    credentials: credentials(),
    headers: {
      ...authorizationHeader()
    }
  }

  // Uploading a file consists of two steps. First fetching a signed s3
  // url from the backend, then uploading the file using that url.
  // The url for the image is returned if everything worked
  return ftch(signedUrlEndpoint, options).then(({ signedRequest, url }) =>
    uploadFile(file, signedRequest, url)
  )
}

const uploadFile = (file: any, signedRequest: any, url: any) => {
  const uploadData = {
    method: 'PUT',
    body: file
  }

  return fetch(signedRequest, uploadData)
    .then(checkStatus)
    .then(() => Promise.resolve(url))
}

export const fetchUserRoles = () => {
  const query = `query {
    userRoles
  }`
  return executeGraphQL(query).then(res => res.data.userRoles)
}

export function getPDFURL(file: string) {
  return `${BASE_URL}${file}`
}

const BLOG_FIELDS = `
id
published
title
description
pictures
studsYear
frontPicture
author {
  id
  firstName
  lastName
  studsYear
  info {
    ${USER_PROFILE_FIELDS}
    role
    picture
    permissions
  }
}
date
`

export function createBlogPost (blogPost: BlogPost) {
  // post.date = moment(new Date()).format('YYYY-MM-DD')
  const mutation = `mutation {
    blogCreate(fields: ${toGraphQLFields(blogPost)}) {
      ${BLOG_FIELDS}
    }
  }
  `
  return executeGraphQL(mutation).then(res => res.data.blogCreate)
}

export function fetchBlogPosts () {
  const query = `query {
    blogPosts {
      ${BLOG_FIELDS}
    }
  }`
  return executeGraphQL(query)
    .then(res => res.data.blogPosts)
    .then(events =>
      events.map((e: BlogPost) => ({
        ...e,
        date: new Date(e.date)
      }))
    )
}

export function updateBlogPost(blogPost: BlogPost) {
  const query = `mutation {
    blogPostUpdate(id: "${blogPost.id}", fields: ${toGraphQLFields(blogPost)}) {
      ${BLOG_FIELDS}
    }
  }
  `
  return executeGraphQL(query).then(res => res.data.blogPostUpdate)
}

export function deleteBlogpost(id:string) {
  const query = `mutation {
    blogPostDelete(id: "${id}")
  }`

  return executeGraphQL(query)
}
