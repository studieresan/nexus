import Contact from '@/components/Contact.jsx'
import ElementGroup from '@/components/ElementGroup.jsx'
import { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { groupMasters, projectMasters } from '@/utils/predeterminedInformation.jsx'
import { BiReplyAll } from 'react-icons/bi'
import { Button, Spinner } from 'react-bootstrap'
import { AppData } from '@/models/AppData'
import { GroupInfo } from '@/models/GroupInfo'

interface AboutProps {
  appData: AppData
}

export default function About ({ appData }: AboutProps): JSX.Element {
  const { t, i18n } = useTranslation()
  const [groupsInfo, setGroupsInfo] = useState(null)
  useEffect(() => {
    if (!appData.users) return
    // event groups divided based on year
    const years = [...new Set(appData.users.map((e) => e.studsYear))].sort((a, b) => b - a)
    const newGroupsInfo: GroupInfo[] = years.map((year) => ({ year, title: t('about.groupTitle') + ' ' + year, elements: [] }))

    for (let i = 0; i < newGroupsInfo.length; i++) {
      const matchedUsers = appData.users.filter((e) => e.studsYear === newGroupsInfo[i].year)
      const elements = matchedUsers.map((e) => {
        const element = {
          picture: e.info.picture,
          name: `${e.firstName} ${e.lastName}`,
          role: t(e.info.role),
          lg: true,
          vertical: true
        }
        const keys = Object.keys(groupMasters)
        for (let i = 0; i < keys.length; i++) {
          const key = keys[i]
          if (groupMasters[key].masterId === e.id) {
            console.log(t(key + 'Leader'))
            element.role = t(key + 'Leader')
            break
          }
        }

        return element
      })
      newGroupsInfo[i].elements = elements
    }

    setGroupsInfo(newGroupsInfo)
  }, [appData, i18n.language])

  function handleCreateClick () {
    console.log('handleCreate')
  }
  const showTools = (appData?.userDetails?.permissions || []).includes('users_permission') || (appData?.userDetails?.permissions || []).includes('admin_permission')
  if (groupsInfo) {
    return (
      <div className='container-fluid mb-5' id='hanging-icons'>
        <div className='row row-cols-1 justify-content-center'>
          <div className='my-5 col-9'>
            <div>
              <h1 className='fw-light'>{t('about.title')}</h1>
              <p className='lead text-muted'>{t('about.intro')}</p>
              {showTools && (
                <div className='d-flex gap-2'>
                  <Button onClick={() => handleCreateClick()}>{t('about.primaryButton')}</Button>
                </div>
              )}
            </div>
          </div>
          <div className='container-fluid col-9'>
            <div className='row'>
              {groupsInfo && groupsInfo.map((group, groupIndex) => (
                <ElementGroup key={'userGroup' + groupIndex} expandStart={groupIndex === 0} type='contacts' appData={appData} group={group} idx={groupIndex} groupTitle={group.title} elements={group.elements} />
              ))}
            </div>
          </div>
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
