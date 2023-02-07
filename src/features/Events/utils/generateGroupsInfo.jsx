import { BsPinMap } from 'react-icons/bs'
import { IoPersonSharp } from 'react-icons/io5'
import i18next from 'i18next'
export default function generateGroupsInfo (appData) {
  // event groups divided based on year
  const years = [...new Set(appData.events.map((e) => parseInt(e.date.getFullYear())))].sort((a, b) => b - a)
  const newGroupsInfo = years.map((year) => ({ year, title: i18next.t('events.groupTitle') + ' ' + year }))

  for (let i = 0; i < newGroupsInfo.length; i++) {
    const includeUnpublished = appData.loggedIn && ((appData?.userDetails?.permissions || []).includes('event_permission') || (appData?.userDetails?.permissions || []).includes('admin_permission'))
    const matchedEvents = appData.events.filter((e) => (e.published || includeUnpublished) && parseInt(e.date.getFullYear()) === newGroupsInfo[i].year)
    const elements = matchedEvents.map((e) => {
      let cornerImg = null
      let cornerText = null
      let responsible = null
      if (e?.responsible?.id) {
        responsible = appData.users && appData.users.find((u) => u.id === e.responsible.id)
      } else if (e?.author?.id) {
        responsible = appData.users && appData.users.find((u) => u.id === e.author.id)
      }
      if (responsible) {
        console.log('responsible', responsible)
        cornerImg = responsible?.info?.picture
          ? (
            <div className='me-2 ratio ratio-1x1 rounded-circle overflow-hidden bg-light' style={{ width: 50, height: 50 }}>
              <img src={responsible?.info?.picture} className='card-img-top img-cover' alt='alt' />
            </div>
            )
          : (
            <div className='me-2 ratio ratio-1x1 rounded-circle overflow-hidden' style={{ width: 50, height: 50 }}>
              <IoPersonSharp />
            </div>
            )
        cornerText = `${responsible.firstName} ${responsible.lastName}`
      } else if (e.location) {
        cornerImg = <div className='me-2 ratio ratio-1x1' style={{ width: 25, height: 25 }}><BsPinMap /></div>
        cornerText = e.location
      }
      return {
        id: e.id,
        cardTitle: e.title || e?.company?.name,
        cornerImg,
        cornerText,
        dateText: e.date.toISOString().slice(0, 10),
        bgImg: e.frontPicture || e.pictures[0],
        danger: e.published ? null : i18next.t('events.notPublished')
      }
    })
    newGroupsInfo[i].elements = elements
  }
  return newGroupsInfo
}
