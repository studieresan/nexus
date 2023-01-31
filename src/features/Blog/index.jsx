import { useEffect, useState } from 'react'
import { Spinner } from 'react-bootstrap'
import { useTranslation } from 'react-i18next'
import BlogGroup from './components/BlogGroup.jsx'
import BlogIntro from './components/BlogIntro.jsx'
export default function Blog ({ appData, handleModals }) {
  const { t, i18n } = useTranslation()
  const [showGroup, setShowGroup] = useState(null)
  const [groupsInfo, setGroupsInfo] = useState(null)

  useEffect(() => {
    if (appData.blogPosts && groupsInfo) {
      setShowGroup(showGroup ? [...showGroup] : Array(groupsInfo.length).fill(true))
    }
  }, [appData.blogPosts, groupsInfo])

  useEffect(() => {
    if (appData.blogPosts) {
      const years = [...new Set(appData.blogPosts.map((e) => parseInt(e.date.slice(0, 4))))].sort((a, b) => b - a).reverse()
      setGroupsInfo(years.map((year) => ({ year, title: t('blog.groupTitle') + ' ' + year })))
    }
  }, [appData.blogPosts, i18n.language])

  function handleClick (groupIndex) {
    const newShowGroup = [...showGroup]
    newShowGroup[groupIndex] = !newShowGroup[groupIndex]
    setShowGroup(newShowGroup)
  }
  if (groupsInfo && showGroup) {
    return (
      <div className='d-flex row justify-content-center'>
        <BlogIntro />
        <div className='w-75'>
          {groupsInfo && showGroup && groupsInfo.map((group, groupIndex) => (
            <BlogGroup key={`group-${groupIndex}`} appData={appData} showGroup={showGroup} setShowGroup={setShowGroup} group={group} groupIndex={groupIndex} handleClick={handleClick} handleModals={handleModals} />
          ))}
        </div>
      </div>
    )
  } else {
    return (
      <div className='d-flex justify-content-center align-items-center vh-100'>
        <div className='w-80 d-flex'>
          <Spinner variant='primary' animation='grow' role='status' style={{ width: 75, height: 75 }}>
            <span className='visually-hidden'>Loading...</span>
          </Spinner>
        </div>
      </div>
    )
  }
}
