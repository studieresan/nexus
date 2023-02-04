import { useTranslation } from 'react-i18next'
import { IoPersonSharp } from 'react-icons/io5'
import i18next from 'i18next'
export default function generateGroupsInfo (appData) {
  const years = [...new Set(appData.blogPosts.map((e) => parseInt(e.date.slice(0, 4))))].sort((a, b) => b - a)
  const newGroupsInfo = years.map((year) => ({ year, title: i18next.t('blog.groupTitle') + ' ' + year }))
  for (let i = 0; i < newGroupsInfo.length; i++) {
    const matchedBlogPosts = appData.blogPosts.filter((e) => parseInt(e.date.slice(0, 4)) === newGroupsInfo[i].year)
    newGroupsInfo[i].elements = matchedBlogPosts.map((e) => ({
      id: e.id,
      cardTitle: e.title,
      cornerImg:
                    e.author.info.picture
                      ? (
                        <div className='me-2 ratio ratio-1x1 rounded-circle overflow-hidden' style={{ width: 50, height: 50 }}>
                          <img src={e.author.info.picture} className='card-img-top img-cover' alt='alt' />
                        </div>
                        )
                      : (
                        <div className='me-2 ratio ratio-1x1 rounded-circle overflow-hidden' style={{ width: 50, height: 50 }}>
                          <IoPersonSharp />
                        </div>
                        ),
      cornerText: `${e.author.firstName} ${e.author.lastName}`,
      dateText: e.date.slice(0, 10),
      bgImg: e.frontPicture
    }))
  }
  return newGroupsInfo
}
