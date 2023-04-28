import { useTranslation } from 'react-i18next';
import { IoPersonSharp } from 'react-icons/io5';
import i18next from 'i18next';
import { AppData } from '@/models/AppData';
import { assertDefined } from '@/utils/assertDefined';
import { BlogPost } from '@/models/BlogPost';
import { DynamicYearGroup } from '@/models/DynamicYearGroup';
import { ContactElement } from '@/models/Contact';
import { groupMasters } from './predeterminedInformation';
import { GroupMasters } from '@/models/Group';
import { EventPost } from '@/models/EventPost';
import { Permission } from '@/models/User';

function formatDate(date: Date) {
  const day = String(date.getDate()).padStart(2, '0');
  const month = String(date.getMonth() + 1).padStart(2, '0'); // Months are 0-indexed, so we add 1
  const year = date.getFullYear();

  return `${day}/${month}/${year}`;
}

export default function getDynamicYearGroupsInfo(appData: AppData, contentSourceType: 'blog' | 'events' | 'contact', windowWidth: number): DynamicYearGroup[] {

  if (contentSourceType === 'contact') {
    return getContactElementGroupsInfo(appData, windowWidth);
  }

  const loggedIn = assertDefined(appData.loggedIn, 'appData.loggedIn is not defined', 'appData.loggedIn');
  const userDetails = assertDefined(appData.userDetails,'appData.userDetails is not defined','appData.userDetails');
  const sourceData = contentSourceType === 'blog' ? appData.blogPosts : appData.events;
  const permissionKey = contentSourceType === 'blog' ? Permission.Blog : Permission.Events;
  const contentData = assertDefined(sourceData, `appData.${contentSourceType}Posts is not defined`, `appData.${contentSourceType}Posts`);
  const includeUnpublished = loggedIn && (userDetails?.permissions?.includes(permissionKey) || userDetails?.permissions?.includes(Permission.Admin)); 
  const includedContent = (contentData || []).filter((e) => e.published || includeUnpublished);
  const years = [...new Set(includedContent.map((e: BlogPost | EventPost) => e.studsYear))]
  .filter(year => year !== 1970)
  .sort((a, b) => b - a);
  
  const newGroupsInfo: DynamicYearGroup[] = years.map((year) => ({ year, title: i18next.t(`${contentSourceType}.groupTitle`) + ' ' + year,elements: []}));

  for (let i = 0; i < newGroupsInfo.length; i++) {
    const matchedContent = includedContent.filter((e) => e.studsYear === newGroupsInfo[i].year);
    newGroupsInfo[i].elements = matchedContent.map((e) => {
      return {
        id: e.id,
        cardTitle: e.title,
        cornerImg: getCornerImg(e.author?.info?.picture),
        cornerText: e.author ? `${e.author.firstName} ${e.author.lastName}` : null,
        dateText: formatDate(e.date),
        bgImg: e.frontPicture || e.pictures[0],
        danger: e.published ? null : i18next.t(`${contentSourceType}.notPublished`),
    }
      
    });
  }
  return newGroupsInfo;
}

function getContactElementGroupsInfo(appData: AppData, windowWidth: number): DynamicYearGroup[] {
  if (!appData.users) return [];

  const years = [...new Set(appData.users.map((e) => e.studsYear))]
  .filter(year => year !== 1970)
  .sort((a, b) => b - a);
  const newGroupsInfo: DynamicYearGroup[] = years.map((year) => ({year,title: i18next.t('about.groupTitle') + ' ' + year,elements: [],}));

  for (let i = 0; i < newGroupsInfo.length; i++) {
    const matchedUsers = appData.users.filter((e) => e.studsYear === newGroupsInfo[i].year);
    newGroupsInfo[i].elements = matchedUsers.map((e) => {
      const element: ContactElement = {
        id: e.id,
        picture: e.info.picture,
        name: `${e.firstName} ${e.lastName}`,
        // phone: e.info.phone,
        email: e.info.email,
        role: i18next.t(e.info.role),
        vertical: true,
        lg: windowWidth >= 768
      };

      return element;
    });
  }

  return newGroupsInfo;
}

function getCornerImg(picture: string | undefined) {
  return picture ? (
    <div
      className='me-2 ratio ratio-1x1 bg-white rounded-circle overflow-hidden'
      style={{ width: 50, height: 50 }}
    >
      <img
        src={picture}
        className='card-img-top img-cover'
        alt='alt'
      />
    </div>
  ) : (
    <div
      className='me-2 ratio ratio-1x1 rounded-circle overflow-hidden'
      style={{ width: 50, height: 50 }}
    >
      <IoPersonSharp />
    </div>
  )
}


