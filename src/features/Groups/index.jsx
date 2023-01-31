import { useEffect, useState } from 'react'
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
    <div className='d-flex justify-content-center row' id='hanging-icons'>
      <section className='py-5 text-center container'>
        <div className='row py-5'>
          <div className='col-lg-6 col-md-8 mx-auto'>
            <h1 className='fw-light'>{t('groups.title')}</h1>
            <p className='lead text-muted'>{t('groups.intro')}</p>
            <div>
              <Button className='m-1'>{t('groups.primaryButton')}</Button>
              <Button className='m-1' variant='secondary'>{t('groups.secondaryButton')}</Button>
            </div>
          </div>
        </div>
      </section>
      <div className='row w-75 g-1 row-cols-1 row-cols-xxl-2'>
        {groupsInfo && groupsInfo.map((group, index) => (
          <Group key={index} handleClick={handleClick} group={group} groupIndex={index} showGroup={showGroup} />
        ))}

      </div>
    </div>
  )
}
