import { createBlogPost, deleteBlogpost, updateBlogPost } from '@/requests/api'

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
      args.setAppData({ ...args.appData, blogPosts: [...args.appData.blogPosts, response] })
      break
    }
    case 'deleteBlogPost': {
      const response = await deleteBlogpost(data.toDeleteId)
      args.setAppData({ ...args.appData, blogPosts: args.appData.blogPosts.filter(post => post.id !== data.toDeleteId) })
      break
    }
    case 'login':
      console.log('login', data)
      break
    case 'logout':
      console.log('logout', data)
      break
    default:
      console.log('instructionSwitchboard: default')
  }
}
