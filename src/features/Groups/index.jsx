import { useEffect, useRef, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { Button } from 'react-bootstrap'
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

  return (
    <div className='d-flex vstack justify-content-center align-items-center' id='hanging-icons'>
      <div className='py-5 w-75'>
        <div className='py-5'>
          <div>
            <h1 className='fw-light'>{t('groups.title')}</h1>
            <p className='lead text-muted'>{t('groups.intro')}</p>
            <div className='d-flex gap-2'>
              <Button>{t('groups.primaryButton')}</Button>
              <Button variant='secondary'>{t('groups.secondaryButton')}</Button>
            </div>
          </div>
        </div>
      </div>
      <div className='row g-1 w-75 row-cols-1 row-cols-xxl-2'>
        {groupsInfo && groupsInfo.map((group, index) => (
          <Group key={index} handleClick={handleClick} group={group} groupIndex={index} showGroup={showGroup} />
        ))}

      </div>
    </div>
  )
}
