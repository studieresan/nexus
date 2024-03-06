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
import { User, UserRole } from "@/models/User";
import Contact from "@/components/Contact.jsx";

interface ContactProps {
  appData: AppData
  handleModals: ModalManager
}

export default function Contactpage ({ appData, handleModals }: ContactProps): JSX.Element {
  const { t, i18n } = useTranslation()
  const [sales, setSales] = useState<User[] | null>(null);
  const [groupManagers, setGroupManagers] = useState<User[] | null>(null);
  const windowWidth = useWindowWidth();    

  useEffect(() => {
    if (appData.users) {
      const highestStudsYear = Math.max(
        ...(appData.users || []).map((e) => e.studsYear)
      );
      const sales = (appData.users || []).filter(
        (e) =>
          e.studsYear === highestStudsYear &&
          (e.info.role === UserRole.SalesGroup) 
      );
      setSales(sales);

      const groupManagers = (appData.users || []).filter(
        (e) =>
          e.studsYear === highestStudsYear &&
          (e.info.role === UserRole.ItGroupManager || 
           e.info.role === UserRole.SalesGroupManager ||
           e.info.role === UserRole.EventGroupManager ||
           e.info.role === UserRole.InfoGroupManager ||
           e.info.role === UserRole.FinanceGroupManager ||
           e.info.role === UserRole.TravelGroupManager) 
      );
      setGroupManagers(groupManagers);
    }
  }, [appData.users]);

  const imgStyle: CSSProperties = { objectFit: "contain", width: "200px" };

  const salesContacts: ContactElement[] =
    sales?.map((e) => {
      return {
        id: e.id,
        picture: e.info.picture,
        name: `${e.firstName} ${e.lastName}`,
        email: e.info.email,
        role: t(e.info.role),
        vertical: true,
      };
    }) || [];

  const groupManagerContacts: ContactElement[] =
    groupManagers?.map((e) => {
      return {
        id: e.id,
        picture: e.info.picture,
        name: `${e.firstName} ${e.lastName}`,
        email: e.info.email,
        role: t(e.info.role),
        vertical: true,
      };
    }) || [];

  return (
    <div className='container-fluid mb-5' id='hanging-icons'>
      <div className='row row-cols-1 justify-content-center'>
        <div className='mb-5 mt-3 col-11 col-md-9'>
          <div>
            <div className='fw-bold pt-2 fs-1'>{t('contact.salesTitle')}</div>
            <div className={`fs-5`}>
              {t('contact.salesTextP1')}
              <a
                href="mailto:sales@studs.se"
                className="text-decoration-none"
                rel="noopener noreferrer"
                target="_blank"
              > sales@studs.se </a>
              {t('contact.salesTextP2')}
            </div>
            <div className='row row-cols-2 row-cols-md-2 row-cols-xl-3 row-cols-xxxl-5 g-4 py-3'>
              {salesContacts.map((e) => (
                <div style={{maxWidth: "160pt"}}>
                 <Contact key={e.id} element={e}/>
                </div>
              ))}
            </div>
            <div className='fw-bold pt-2 fs-1'>{t('contact.otherTitle')}</div>
            <div className={`fs-5`}>
              {t('contact.otherText')}
            </div>
            <div className='row row-cols-2 row-cols-md-2 row-cols-xl-3 row-cols-xxxl-5 g-4 py-3'>
              {groupManagerContacts.map((e) => (
                <div style={{maxWidth: "160pt"}}>
                 <Contact key={e.id} element={e}/>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
