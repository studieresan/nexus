import { AppData } from '@/models/AppData'
import { BlogPost, BlogPostStringifiedAuthor } from '@/models/BlogPost'
import { EventPost, EventPostStringifedAuthor } from '@/models/EventPost'
import { User } from '@/models/User'
import { fetchEvents, fetchUsers, fetchBlogPosts } from '@/requests/api'
import { useEffect } from 'react'

export default function useFetchCollections(appData: AppData, setAppData: (appData: AppData) => void) {
  useEffect(() => {
    async function fetchData() {
      const result = await Promise.all([fetchUsers(), fetchBlogPosts(), fetchEvents()])

      const usersResult: User[] = result[0] || appData.users || []
      const blogPostsResult: BlogPostStringifiedAuthor[] = result[1] || appData.blogPosts || []
      const eventsResult: EventPostStringifedAuthor[] = result[2] || appData.events || []

      let finalBlogPosts: BlogPost[] = []
      let finalEvents: EventPost[] = []
      let finalUsers = usersResult

      blogPostsResult.forEach((bp: BlogPostStringifiedAuthor) => {
        const author: User = finalUsers.find((u: User) => u.id === bp.author) || ({} as User)
        finalBlogPosts.push({ ...bp, author })
      })

      eventsResult.forEach((e: EventPostStringifedAuthor) => {
        const author: User = finalUsers.find((u: User) => u.id === e.author) || ({} as User)
        finalEvents.push({ ...e, author })
      })

      setAppData({
        ...appData,
        users: finalUsers,
        blogPosts: finalBlogPosts,
        events: finalEvents,
        didFetchCollections: true
      })
    }
    if (!appData.didFetchCollections) {
      fetchData()
    }
  }, [setAppData, appData])
}
