import { createBlogPost, deleteBlogpost, loginUser, updateBlogPost } from '@/requests/api'
import { setLoggedIn, setLoggedOut } from '@/requests/auth'

export default async function instructionSwitchboard (args, instruction, data) {
  switch (instruction) {
    case 'updateBlogPost': {
      const { id, ...postWithoutId } = data.post
      const response = await updateBlogPost(id, postWithoutId)
      args.setAppData({ ...args.appData, blogPosts: args.appData.blogPosts.map(post => post.id === id ? response : post) })
      break
    }
    case 'createBlogPost': {
      const response = await createBlogPost(data.post)
      console.log('new post response: ', response)
      args.setAppData({ ...args.appData, blogPosts: [...args.appData.blogPosts, response.blogCreate] })
      break
    }
    case 'deleteBlogPost': {
      const response = await deleteBlogpost(data.toDeleteId)
      args.setAppData({ ...args.appData, blogPosts: args.appData.blogPosts.filter(post => post.id !== data.toDeleteId) })
      break
    }
    case 'loginUser': {
      const response = await loginUser(data.email, data.password)
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
