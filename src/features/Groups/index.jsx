import { useEffect, useRef, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { Button, Spinner } from 'react-bootstrap'
import Group from './components/Group.jsx'
import { groupsPredeterminedInfo } from '@/utils/predeterminedInformation.jsx'

export default function Groups ({ appData }) {
  const { t, i18n } = useTranslation()
  const [groupsInfo, setGroupsInfo] = useState(null)
  const [showGroup, setShowGroup] = useState(null)
  // Go through each group and find the master from appData.users and store it in groupsInfo
  useEffect(() => {
    if (appData.users) {
      const groupsInfo = []
      Object.keys(groupsPredeterminedInfo).forEach(group => {
        const master = appData.users.find(user => user.firstName === groupsPredeterminedInfo[group].masterFirstName && user.lastName === groupsPredeterminedInfo[group].masterLastName)
        groupsInfo.push({ master, title: t(`groups.${group}.title`), description: t(`groups.${group}.description`), icon: groupsPredeterminedInfo[group].icon })
      })
      console.log('groupsInfo', groupsInfo)
      setGroupsInfo(groupsInfo)
      setShowGroup(showGroup ? [...showGroup] : Array(groupsInfo.length).fill(false))
    }
  }, [appData.users, i18n.language])

  function handleClick (index) {
    const newShowGroupMasterInfo = [...showGroup]
    newShowGroupMasterInfo[index] = !newShowGroupMasterInfo[index]
    setShowGroup(newShowGroupMasterInfo)
  }

  if (!groupsInfo) {
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

  return (
    <div className='container-fluid mb-5' id='hanging-icons'>
      <div className='row row-cols-1 col-12 justify-content-center'>
        <div className='my-5 col-9'>
          <div>
            <h1 className='fw-light'>{t('groups.title')}</h1>
            <p className='lead text-muted'>{t('groups.intro')}</p>
            {/* <div className='d-flex gap-2'>
              <Button>{t('groups.primaryButton')}</Button>
              <Button variant='secondary'>{t('groups.secondaryButton')}</Button>
            </div> */}
          </div>
        </div>
        <div className='container-fluid col-9'>
          <div className='row'>
            {groupsInfo.map((group, index) => (
              <div key={index} className='col-12'>
                <Group handleClick={handleClick} group={group} groupIndex={index} showGroup={showGroup} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
