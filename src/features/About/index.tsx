import Contact from '@/components/Contact.jsx'
import ElementGroup from '@/components/ElementGroup.jsx'
import { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { groupMasters, projectMasters } from '@/utils/predeterminedInformation.jsx'
import { BiReplyAll } from 'react-icons/bi'
import { Button, Spinner } from 'react-bootstrap'
import { AppData } from '@/models/AppData'
import { GroupInfo } from '@/models/GroupInfo'
import generateGroupsInfo from '@/utils/getElementGroupsInfo'

interface AboutProps {
  appData: AppData
}

export default function About ({ appData }: AboutProps): JSX.Element {
  const { t, i18n } = useTranslation()
  const [groupsInfo, setGroupsInfo] = useState<GroupInfo[]>([])
  useEffect(() => {
    if (!appData.users) return
    // event groups divided based on year
    setGroupsInfo(generateGroupsInfo(appData, 'contact'))
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
              {groupsInfo.map((group, groupIndex) => (
                <ElementGroup key={'userGroup' + groupIndex} expandStart={groupIndex === 0} type='contacts' appData={appData} idx={groupIndex} groupTitle={group.title} elements={group.elements} showTools={showTools}/>
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
