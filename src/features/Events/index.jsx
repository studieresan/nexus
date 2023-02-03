import { useEffect, useState } from 'react'
import { Button } from 'react-bootstrap'
import { useTranslation } from 'react-i18next'
import { BsPinMap } from 'react-icons/bs'
import { IoPersonSharp } from 'react-icons/io5'
import GroupOfCards from '../../components/CardGroup.jsx'
export default function Events ({ appData, handleModals }) {
  const { t, i18n } = useTranslation()
  const [groupsInfo, setGroupsInfo] = useState(null)
  const cornerIcon = <BsPinMap size={10} />
  useEffect(() => {
    if (appData.events) {
      console.log('entered')
      // event groups divided based on year
      const years = [...new Set(appData.events.map((e) => parseInt(e.date.getFullYear())))].sort((a, b) => b - a)
      const newGroupsInfo = years.map((year) => ({ year, title: t('event.groupTitle') + ' ' + year }))
      for (let i = 0; i < newGroupsInfo.length; i++) {
        const matchedBlogPosts = appData.events.filter((e) => parseInt(e.date.getFullYear()) === newGroupsInfo[i].year)
        const elements = matchedBlogPosts.map((e) => ({
          id: e.id,
          cardTitle: e.company.name,
          cornerImg:
          e.location
            ? (
              <div className='me-2 ratio ratio-1x1' style={{ width: 25, height: 25 }}>
                <BsPinMap />
              </div>
              )
            : (
              <div />
              ),

          cornerText: e.location,
          dateText: e.date.toISOString().slice(0, 10),
          bgImg: e.pictures[0]
        }))
        newGroupsInfo[i].elements = elements
      }

      setGroupsInfo(newGroupsInfo)
    }
  }, [appData])

  function handleClickCard (id) {
    console.log('clicked card', id)
  }

  function handleClickEdit (id) {
    console.log('clicked edit', id)
  }

  async function handleConfirmDelete ({ modal, data }) {
    console.log('clicked delete', data)
  }

  async function handleClickDelete (id) {
    console.log('clicked delete', id)
  }

  return (
    <div className='container-fluid mb-5' id='hanging-icons'>
      <div className='row row-cols-1 col-12 justify-content-center'>
        <div className='my-5 col-9'>
          <div>
            <h1 className='fw-light'>{t('events.title')}</h1>
            <p className='lead text-muted'>{t('events.intro')}</p>
            <div className='d-flex gap-2'>
              <Button>{t('events.primaryButton')}</Button>
              <Button variant='secondary'>{t('events.secondaryButton')}</Button>
            </div>
          </div>
        </div>
        <div className='container-fluid col-9'>
          <div className='row'>
            {groupsInfo && appData.events && groupsInfo.map((group, groupIndex) => {
              return (
                <div key={`group-${groupIndex}`} className='mb-2'>
                  <GroupOfCards appData={appData} group={group} idx={groupIndex} groupTitle={group.title} elements={group.elements} handleClickCard={handleClickCard} handleClickEdit={handleClickEdit} handleClickDelete={handleClickDelete} />
                </div>
              )
            })}
          </div>
        </div>
      </div>
    </div>
  )
}
