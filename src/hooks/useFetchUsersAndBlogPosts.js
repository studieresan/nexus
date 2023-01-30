import { fetchUsers, getBlogPosts } from '@/requests/api'
import { useEffect } from 'react'

// check and fetch both users and blog posts, and make one combined update to appData
export function useFetchUsersAndBlogPosts (appData, setAppData) {
  useEffect(() => {
    async function fetchData () {
      const toUpdateAppData = {}
      if (appData.users === null) {
        const users2022 = await fetchUsers(2022)
        const users2023 = await fetchUsers(2023)
        toUpdateAppData.users = [...users2022, ...users2023]
      }
      if (appData.blogPosts === null) {
        toUpdateAppData.blogPosts = await getBlogPosts(2022)
      }
      if (Object.keys(toUpdateAppData).length > 0) {
        console.log('updating appData:', toUpdateAppData)
        setAppData({ ...appData, ...toUpdateAppData })
      }
    }
    fetchData()
  }, [setAppData, appData])
}
