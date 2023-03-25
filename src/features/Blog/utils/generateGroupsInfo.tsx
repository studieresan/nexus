import { useTranslation } from 'react-i18next'
import { IoPersonSharp } from 'react-icons/io5'
import i18next from 'i18next'
import { AppData } from '@/models/AppData'
import { assertDefined } from '@/utils/assertDefined'
import { Blog } from '@/models/Blog'
import { GroupInfo } from '@/models/GroupInfo'
export default function generateGroupsInfo (appData: AppData) : GroupInfo[] {
  const loggedIn = assertDefined(appData.loggedIn, 'appData.loggedIn is not defined', 'appData.loggedIn')
  const userDetails = assertDefined(appData.userDetails, 'appData.userDetails is not defined', 'appData.userDetails')
  const blogPosts = assertDefined(appData.blogPosts, 'appData.blogPosts is not defined', 'appData.blogPosts')

  const includeUnpublished = loggedIn && ((appData?.userDetails?.permissions || []).includes('blog_permission') || (userDetails?.permissions || []).includes('admin_permission'))
  const includedBlogPosts = (blogPosts || []).filter((e) => (e.published || includeUnpublished))
  const years = [...new Set(includedBlogPosts.map((e: Blog) => parseInt(e.date.toLocaleString().slice(0, 4))))].sort((a, b) => b - a)
  const newGroupsInfo: GroupInfo[] = years.map((year) => ({ year, title: i18next.t('blog.groupTitle') + ' ' + year, elements: [] }))

  for (let i = 0; i < newGroupsInfo.length; i++) {
    const matchedBlogPosts = includedBlogPosts.filter((e) => parseInt(e.date.toLocaleString().slice(0, 4)) === newGroupsInfo[i].year)
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
      dateText: e.date.toLocaleString().slice(0, 10),
      bgImg: e.frontPicture || e.pictures[0],
      danger: e.published ? undefined : i18next.t('blog.notPublished')
    }))
  }
  return newGroupsInfo
}
