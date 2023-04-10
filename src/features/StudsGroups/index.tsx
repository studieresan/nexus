import { useEffect, useRef, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { Button, Spinner } from 'react-bootstrap'
import StudsGroup from './components/StudsGroup.jsx'
import { groupMasters } from '@/utils/predeterminedInformation'
import { AppData } from '@/models/AppData.js'
import { GroupMasters } from '@/models/Group.js'
import { StudsGroupInfo } from '@/models/StudsGroupInfo.js'
import { UserRole } from '@/models/User.js'
import { AiFillSchedule } from 'react-icons/ai'
import { GiProcessor, GiReceiveMoney } from 'react-icons/gi'
import { GoPencil } from 'react-icons/go'
import { MdTravelExplore } from 'react-icons/md'
import { BsBuildings } from 'react-icons/bs'
import { getDescriptionSize } from '@/utils/fontSizing.js'
import { useWindowWidth } from '@/hooks/useWindowWidth.js'

interface GroupsProps {
  appData: AppData
}

export default function StudsGroups({ appData }: GroupsProps): JSX.Element {
  const { t, i18n } = useTranslation()
  const [groupsInfo, setGroupsInfo] = useState<StudsGroupInfo[]>([])
  const [showGroup, setShowGroup] = useState<boolean[]>([])
  const windowWidth = useWindowWidth();
  // Go through each group and find the master from appData.users and store it in groupsInfo
  useEffect(() => {
    if (appData.users) {
      const managerTypes = [UserRole.EventGroupManager, UserRole.FinanceGroupManager, UserRole.InfoGroupManager, UserRole.ItGroupManager, UserRole.TravelGroupManager, UserRole.SalesGroupManager]
      const icons: { [key: string]: JSX.Element } = {
        [UserRole.EventGroupManager]: <AiFillSchedule style={{ backgroundColor: 'white' }} />,
        [UserRole.FinanceGroupManager]: <GiReceiveMoney style={{ backgroundColor: 'white' }} />,
        [UserRole.InfoGroupManager]: <GoPencil style={{ backgroundColor: 'white' }} />,
        [UserRole.ItGroupManager]: <GiProcessor style={{ backgroundColor: 'white' }} />,
        [UserRole.TravelGroupManager]: <MdTravelExplore style={{ backgroundColor: 'white' }} />,
        [UserRole.SalesGroupManager]: <BsBuildings style={{ backgroundColor: 'white' }} />
      }
      const highestStudsYear = Math.max(...appData.users.map((user) => user.studsYear))
      const managers = appData.users.filter((user) => managerTypes.includes(user.info.role) && user.studsYear === highestStudsYear)

      const newGroupsInfo: StudsGroupInfo[] = managerTypes.map((managerType) => {
        const manager = managers.find((manager) => manager.info.role === managerType)

        return {
          manager,
          name: managerType,
          title: t(`groups.${managerType}.title`),
          description: t(`groups.${managerType}.description`),
          icon: icons[managerType]
        };
      });

      console.log('groupsInfo', newGroupsInfo);
      setGroupsInfo(newGroupsInfo);
      setShowGroup(showGroup ? [...showGroup] : Array(newGroupsInfo.length).fill(false));
    }
  }, [appData.users, i18n.language]);

  function handleClick(index: number) {
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
        <div className='mb-5 mt-3 col-11 col-sm-9'>
          <div>
            <div className='fw-bold py-2 fs-1 display-5'>{t('groups.title')}</div>
            <div className={`fw-light ${getDescriptionSize(windowWidth)}`}>{t('groups.intro')}</div>
            {/* <div className='d-flex gap-2'>
              <Button>{t('groups.primaryButton')}</Button>
              <Button variant='secondary'>{t('groups.secondaryButton')}</Button>
            </div> */}
          </div>
        </div>
        <div className='col-11 col-sm-9'>
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
