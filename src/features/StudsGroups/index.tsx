import { useEffect, useRef, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { Button, Spinner } from 'react-bootstrap'
import StudsGroup from './components/StudsGroup.jsx'
import { groupMasters } from '@/utils/predeterminedInformation'
import { AppData } from '@/models/AppData.js'
import { GroupMasters } from '@/models/Group.js'
import { StudsGroupInfo } from '@/models/StudsGroupInfo.js'

interface GroupsProps {
  appData: AppData
}

export default function StudsGroups ({ appData }: GroupsProps): JSX.Element {
  const { t, i18n } = useTranslation()
  const [groupsInfo, setGroupsInfo] = useState<StudsGroupInfo[]>([])
  const [showGroup, setShowGroup] = useState<boolean[]>([])
  // Go through each group and find the master from appData.users and store it in groupsInfo
  useEffect(() => {
    if (appData.users) {
      const newGroupsInfo: StudsGroupInfo[] = (Object.keys(groupMasters) as Array<keyof GroupMasters>).map((key) => {
        const master = (appData.users || []).find(
          (user) =>
            user.firstName === groupMasters[key].masterFirstName &&
            user.lastName === groupMasters[key].masterLastName
        );

        return {
          master,
          name: key,
          title: t(`groups.${key}.title`),
          description: t(`groups.${key}.description`),
          icon: groupMasters[key].icon,
        };
      });

      console.log('groupsInfo', newGroupsInfo);
      setGroupsInfo(newGroupsInfo);
      setShowGroup(showGroup ? [...showGroup] : Array(newGroupsInfo.length).fill(false));
    }
  }, [appData.users, i18n.language]);

  function handleClick (index: number) {
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
      <div className='row row-cols-1 justify-content-center'>
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
        <div className='col-9'>
          <div className='row'>
            {groupsInfo.map((group, index) => (
              <div key={index} className='col-12'>
                <StudsGroup handleClick={handleClick} group={group} groupIndex={index} showGroup={showGroup} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
