import { AppData } from '@/models/AppData'
import { Blog } from '@/models/Blog'
import { Event } from '@/models/Event'
import { User } from '@/models/User'
import { fetchEvents, fetchUsers, getBlogPosts } from '@/requests/api'
import { useEffect } from 'react'

export default function useFetchCollections (appData: AppData, setAppData: (appData: AppData) => void) {
  useEffect(() => {
    async function fetchData () {
      const promises = []
      appData.users === null && promises.push(fetchUsers())
      appData.blogPosts === null && promises.push(getBlogPosts())
      appData.events === null && promises.push(fetchEvents())
      const result = await Promise.all(promises)
      console.log('result', result)
      const toUpdate: {users?: User[], blogPosts?: Blog[], events?: Event[] } = {}
      result.forEach((r, i) => {
        i === 0 && (toUpdate.users = r)
        i === 1 && (toUpdate.blogPosts = r)
        i === 2 && (toUpdate.events = r)
      })

      if (Object.keys(toUpdate).length > 0) {
        console.log('new appData', { ...appData, ...toUpdate })
        setAppData({ ...appData, ...toUpdate })
      }
    }

    fetchData()
  }, [setAppData, appData])
}
