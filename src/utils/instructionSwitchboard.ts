import { InstructionArgs, InstructionData } from '@/models/Instruction'
import { createBlogPost, deleteBlogpost, loginUser, updateEvent, createEvent, updateBlogPost, requestPasswordReset, resetPassword, createUser, updateUser, removeEventWithId, deleteUser } from '@/requests/api'
import { setLoggedIn, setLoggedOut } from '@/requests/auth'
import { BlogPost, BlogPostStringifiedAuthor } from '@/models/BlogPost';
import { EventPost, EventPostStringifedAuthor } from '@/models/EventPost';
import { LoginResponse } from '@/models/Login';
import { assertDefined } from './assertDefined';
import { User } from '@/models/User';


export default async function instructionSwitchboard (args: InstructionArgs, instruction: string, data: InstructionData): Promise<void> {
  console.log('instructionSwitchboard: ', instruction, data);
  
  switch (instruction) {
    case 'updateBlogPost': {
      const blogPost = assertDefined(data.blogPost, instruction, 'data.blogPost');
      const response: BlogPostStringifiedAuthor = await updateBlogPost(blogPost);

      const newDate = new Date(response.date)
      const newAuthor: User | undefined = (args.appData.users || []).find((user: User) => user.id === response.author)
      if (!newAuthor) {
        throw new Error('Could not find author for new blog post')
      }
      
      const newPost: BlogPost = { ...response, date: newDate, author: newAuthor }
      const newBlogPosts: BlogPost[] = (args.appData.blogPosts || []).map((post: BlogPost) => post.id === blogPost.id ? newPost : post)
      const sortedPosts = newBlogPosts.sort((a: BlogPost, b: BlogPost) => a.date < b.date ? 1 : -1)
      
      args.setAppData({ ...args.appData, blogPosts: sortedPosts })
      break
    }
    case 'createBlogPost': {
      const blogPost = assertDefined(data.blogPost, instruction, 'data.blogPost');
      const response: BlogPostStringifiedAuthor = await createBlogPost(blogPost)
      const newDate = new Date(response.date)
      const newAuthor: User | undefined = (args.appData.users || []).find((user: User) => user.id === response.author)
      if (!newAuthor) {
        throw new Error('Could not find author for new blog post')
      }
      const newPost: BlogPost = { ...response, date: newDate, author: newAuthor }
      console.log('new post response: ', response)

      const newBlogPosts: BlogPost[] = [newPost, ...(args.appData.blogPosts || [])]
      const sortedPosts = newBlogPosts.sort((a: BlogPost, b: BlogPost) => a.date < b.date ? 1 : -1)
      args.setAppData({ ...args.appData, blogPosts: sortedPosts })
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
      const response: EventPostStringifedAuthor = await updateEvent(eventToUpdate)
      
      const newDate = new Date(response.date)
      const newAuthor = (args.appData.users || []).find((user: User) => user.id === response.author)
      if (!newAuthor) {
        throw new Error('Could not find author for new event post')
      }
      const newPost: EventPost = { ...response, date: newDate, author: newAuthor }
      
      const newPosts = (args.appData.events || []).map((post: EventPost) => post.id === eventToUpdate.id ? newPost : post)
      const sortedPosts = newPosts.sort((a: EventPost, b: EventPost) => a.date < b.date ? 1 : -1)
      args.setAppData({ ...args.appData, events: sortedPosts })
      break
    }
    case 'createEventPost': {
      const eventToCreate = assertDefined(data.eventPost, instruction, 'data.eventPost');
      const response: EventPostStringifedAuthor = await createEvent(eventToCreate)

      const newDate = new Date(response.date)
      const newAuthor = (args.appData.users || []).find((user: User) => user.id === response.author)
      if (!newAuthor) {
        throw new Error('Could not find author for new event post')
      }
      const newPost: EventPost = { ...response, date: newDate, author: newAuthor }

      const newPosts = [newPost, ...(args.appData.events || [])]
      const sortedPosts = newPosts.sort((a: EventPost, b: EventPost) => a.date < b.date ? 1 : -1)
      args.setAppData({ ...args.appData, events: sortedPosts })
      break
    }
    case 'deleteEventPost': {
      const toDeleteId = assertDefined(data.toDeleteId, instruction, 'data.toDeleteId');
      await removeEventWithId(toDeleteId)
      args.setAppData({ ...args.appData, events: (args.appData.events || []).filter(post => post.id !== data.toDeleteId) })
      break
    }
    case 'createUser':  {
      const user = assertDefined(data.user, instruction, 'data.user');
      const response = await createUser(user)
      console.log('createUser response: ', response)
      user.id = response.id
      
      const newUsers = [user, ...(args.appData.users || [])]
      const sortedUsers = newUsers.sort((a: User, b: User) => a.firstName > b.firstName ? 1 : -1)
      args.setAppData({ ...args.appData, users: sortedUsers })
      break
    }
    case 'updateUser': {
      const user = assertDefined(data.user, instruction, 'data.user');
      await updateUser(user)
      const newUsers = (args.appData.users || []).map((u: any) => u.id === user.id ? user : u)
      const sortedUsers = newUsers.sort((a: User, b: User) => a.firstName> b.firstName ? 1 : -1)
      args.setAppData({ ...args.appData, users: sortedUsers })
      break
    }
    case 'deleteUser': {
      const toDeleteId = assertDefined(data.toDeleteId, instruction, 'data.toDeleteId');
      await deleteUser(toDeleteId)
      args.setAppData({ ...args.appData, users: (args.appData.users || []).filter(u => u.id !== data.toDeleteId) })
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
