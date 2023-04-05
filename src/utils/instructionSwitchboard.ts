import { InstructionArgs, InstructionData } from '@/models/Instruction'
import { createBlogPost, deleteBlogpost, loginUser, updateEvent, createEvent, updateBlogPost, requestPasswordReset, resetPassword, createUser, updateUser } from '@/requests/api'
import { setLoggedIn, setLoggedOut } from '@/requests/auth'
import { BlogPost } from '@/models/BlogPost';
import { EventPost } from '@/models/EventPost';
import { LoginResponse } from '@/models/Login';
import { assertDefined } from './assertDefined';


export default async function instructionSwitchboard (args: InstructionArgs, instruction: string, data: InstructionData): Promise<void> {
  console.log('instructionSwitchboard: ', instruction, data);
  
  switch (instruction) {
    case 'updateBlogPost': {
      const blogPost = assertDefined(data.blogPost, instruction, 'data.blogPost');
      const response: BlogPost = await updateBlogPost(blogPost);
      response.date = new Date(response.date)
      console.log('new post response: ', response)
      const newBlogPosts: BlogPost[] = (args.appData.blogPosts || []).map((post: BlogPost) => post.id === blogPost.id ? response : post)
      args.setAppData({ ...args.appData, blogPosts: newBlogPosts })
      break
    }
    case 'createBlogPost': {
      const blogPost = assertDefined(data.blogPost, instruction, 'data.blogPost');
      const response: BlogPost = await createBlogPost(blogPost)
      response.date = new Date(response.date)
      console.log('new post response: ', response)
      const newBlogPosts: BlogPost[] = [response, ...(args.appData.blogPosts || [])]
      args.setAppData({ ...args.appData, blogPosts: newBlogPosts })
      break
    }
    case 'deleteBlogPost': {
      const toDeleteId = assertDefined(data.toDeleteId, instruction, 'data.toDeleteId');
      await deleteBlogpost(toDeleteId)
      const newAppData = { ...args.appData, blogPosts: (args.appData.blogPosts || []).filter(post => post.id !== data.toDeleteId) }
      console.log("New appData after delete:", newAppData);
      
      args.setAppData(newAppData)
      break
    }
    case 'updateEventPost': {
      const eventToUpdate = assertDefined(data.eventPost, instruction, 'data.eventPost');
      const response: EventPost = await updateEvent(eventToUpdate)
      response.date = new Date(response.date)
      console.log('new events response: ', response)
      args.setAppData({ ...args.appData, events: (args.appData.events || []).map((event: EventPost) => event.id === eventToUpdate.id ? response : event) })
      break
    }
    case 'createEventPost': {
      const eventToCreate = assertDefined(data.eventPost, instruction, 'data.eventPost');
      const response: EventPost = await createEvent(eventToCreate)
      response.date = new Date(response.date)
      console.log('new events response: ', response)
      args.setAppData({ ...args.appData, events: [response, ...(args.appData.events || [])] })
      break
    }
    case 'deleteEventPost': {
      const toDeleteId = assertDefined(data.toDeleteId, instruction, 'data.toDeleteId');
      await deleteBlogpost(toDeleteId)
      args.setAppData({ ...args.appData, events: (args.appData.events || []).filter(post => post.id !== data.toDeleteId) })
      break
    }
    case 'createUser':  {
      const user = assertDefined(data.user, instruction, 'data.user');
      await createUser(user)
      args.setAppData({ ...args.appData, users: [user, ...(args.appData.users || [])] })
      break
    }
    case 'updateUser': {
      const user = assertDefined(data.user, instruction, 'data.user');
      await updateUser(user)
      args.setAppData({ ...args.appData, users: (args.appData.users || []).map((u: any) => u.id === user.id ? user : u) })
      break
    }
    case 'loginUser': {
      const email = assertDefined(data.email, instruction, 'data.email');
      const password = assertDefined(data.password, instruction, 'data.password');
      const response: LoginResponse = await loginUser(email, password)
      setLoggedIn(response)
      args.setAppData({ ...args.appData, loggedIn: true, userDetails: response })
      args.navigateTo('/')
      break
    }
    case 'logoutUser': {
      setLoggedOut()
      args.setAppData({ ...args.appData, loggedIn: false, userDetails: null })
      args.navigateTo('/')
      break
    }
    case 'startPasswordReset': {
      const email = assertDefined(data.email, instruction, 'data.email');
      await requestPasswordReset(email)
      break
    }
    case 'resetPassword': {
      const password = assertDefined(data.password, instruction, 'data.password');
      const confirmPassword = assertDefined(data.confirmPassword, instruction, 'data.confirmPassword');
      const resetToken = assertDefined(data.resetToken, instruction, 'data.resetToken');
      await resetPassword(password, confirmPassword, resetToken)
      break
    }
    default:
      console.log('instructionSwitchboard: default')
  }
}
