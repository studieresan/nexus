import { InstructionArgs } from '@/models/InstructionArgs'
import { InstructionData } from '@/models/InstructionData'
import { createBlogPost, deleteBlogpost, loginUser, updateEvent, createEvent, updateBlogPost } from '@/requests/api'
import { setLoggedIn, setLoggedOut } from '@/requests/auth'
import { Blog } from '@/models/Blog';
import { Event } from '@/models/Event';
import { LoginResponse } from '@/models/Login';
import { assertDefined } from './assertDefined';


export default async function instructionSwitchboard (args: InstructionArgs, instruction: string, data: InstructionData): Promise<void> {
  switch (instruction) {
    case 'updateBlogPost': {
      const blogPost = assertDefined(data.blogPost, instruction, 'data.blogPost');
      const response: Blog = await updateBlogPost(blogPost);
      const newBlogPosts: Blog[] = (args.appData.blogPosts || []).map((post: Blog) => post.id === blogPost.id ? response : post)
      args.setAppData({ ...args.appData, blogPosts: newBlogPosts })
      break
    }
    case 'createBlogPost': {
      const blogPost = assertDefined(data.blogPost, instruction, 'data.blogPost');
      const response: Blog = await createBlogPost(blogPost)
      console.log('new post response: ', response)
      const newBlogPosts: Blog[] = [...(args.appData.blogPosts || []), response]
      args.setAppData({ ...args.appData, blogPosts: newBlogPosts })
      break
    }
    case 'deleteBlogPost': {
      const toDeleteId = assertDefined(data.toDeleteId, instruction, 'data.toDeleteId');
      await deleteBlogpost(toDeleteId)
      args.setAppData({ ...args.appData, blogPosts: (args.appData.blogPosts || []).filter(post => post.id !== data.toDeleteId) })
      break
    }
    case 'updateEvent': {
      const eventToUpdate = assertDefined(data.event, instruction, 'data.event');
      const response = await updateEvent(eventToUpdate)
      args.setAppData({ ...args.appData, events: (args.appData.events || []).map((event: Event) => event.id === eventToUpdate.id ? response : event) })
      break
    }
    case 'createEvent': {
      const eventToCreate = assertDefined(data.event, instruction, 'data.event');
      const response = await createEvent(eventToCreate)
      console.log('new events response: ', response)
      args.setAppData({ ...args.appData, events: [...(args.appData.events || []), response] })
      break
    }
    case 'deleteEvent': {
      const toDeleteId = assertDefined(data.toDeleteId, instruction, 'data.toDeleteId');
      await deleteBlogpost(toDeleteId)
      args.setAppData({ ...args.appData, events: (args.appData.events || []).filter(post => post.id !== data.toDeleteId) })
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
    default:
      console.log('instructionSwitchboard: default')
  }
}
