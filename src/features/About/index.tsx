import Contact from '@/components/Contact.jsx'
import ElementGroup from '@/components/ElementGroup.jsx'
import { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { groupMasters, projectMasters } from '@/utils/predeterminedInformation.jsx'
import { BiReplyAll } from 'react-icons/bi'
import { Button, Spinner } from 'react-bootstrap'
import { AppData } from '@/models/AppData'
import { DynamicYearGroup } from '@/models/DynamicYearGroup'
import generateGroupsInfo from '@/utils/getDynamicYearGroupsInfo'
import WaveDivider from '@/components/WaveDivider'
import { Permission } from '@/models/User'
import { useWindowWidth } from '@/hooks/useWindowWidth'
import { getButtonSize, getDescriptionSize, getTitleSize } from '@/utils/fontSizing'
import { ModalManager } from '@/models/Modal'

interface AboutProps {
  appData: AppData
  handleModals: ModalManager
}

export default function About ({ appData, handleModals }: AboutProps): JSX.Element {
  const { t, i18n } = useTranslation()
  const [groupsInfo, setGroupsInfo] = useState<DynamicYearGroup[]>([])
  const windowWidth = useWindowWidth();

  useEffect(() => {
    if (!appData.users) return
    // event groups divided based on year
    setGroupsInfo(generateGroupsInfo(appData, 'contact', windowWidth))
  }, [appData, i18n.language, windowWidth])

  useEffect(() => {
    console.log('groupsInfo', groupsInfo);
  }, [groupsInfo])
    

  function handleCreateClick () {
    handleModals.on({
      name: 'UserModal',
      id: 'UserModal-Edit',
      user: {},
      mode: 'edit',
    })
  }
  const toolsToShow = (appData?.userDetails?.permissions || []).includes(Permission.Admin) ? { edit: true, delete: true } : { edit: false, delete: false }

  if (groupsInfo) {
    return (
      <div className='container-fluid mb-5' id='hanging-icons'>
        <div className='row row-cols-1 justify-content-center'>
          <div className='mb-5 mt-3 col-11 col-md-9'>
            <div>
              <div className='fw-bold pt-2 fs-1'>{t('about.title')}</div>
              <div className={`fs-5`}>{t('about.intro')}</div>
              {toolsToShow.edit && (
                <div className='d-flex gap-2 mt-3'>
                  <Button className='studs-bg' size={getButtonSize(windowWidth)} onClick={() => handleCreateClick()}>{t('about.primaryButton')}</Button>
                </div>
              )}
            </div>
          </div>
          <div className='container-fluid col-11 col-md-9'>
            <div className='row'>
              {groupsInfo.map((group, groupIndex) => (
                <ElementGroup key={'userGroup' + groupIndex} expandStart={groupIndex === 0} type='contacts' appData={appData} idx={groupIndex} groupTitle={group.title} elements={group.elements} toolsToShow={toolsToShow}/>
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
