import { fetchEvents, fetchUsers, getBlogPosts } from '@/requests/api'
import { useEffect } from 'react'

export default function useFetchCollections (appData, setAppData) {
  useEffect(() => {
    async function fetchData () {
      const fetchUsersPromise = appData.users === null ? fetchUsers() : Promise.resolve(appData.users)
      const fetchBlogPostsPromise = appData.blogPosts === null ? getBlogPosts() : Promise.resolve(appData.blogPosts)
      const fetchEventsPromise = appData.events === null ? fetchEvents() : Promise.resolve(appData.events)

      Promise.all([fetchUsersPromise, fetchBlogPostsPromise, fetchEventsPromise]).then(([users, blogPosts, events]) => {
        setAppData({
          ...appData,
          users: appData.users === null ? users : appData.users,
          blogPosts: appData.blogPosts === null ? blogPosts : appData.blogPosts,
          events: appData.events === null ? events : appData.events
        })
      })
    }

    fetchData()
  }, [setAppData, appData])
}
