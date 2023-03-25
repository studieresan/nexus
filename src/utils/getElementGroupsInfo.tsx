import { useTranslation } from 'react-i18next';
import { IoPersonSharp } from 'react-icons/io5';
import i18next from 'i18next';
import { AppData } from '@/models/AppData';
import { assertDefined } from '@/utils/assertDefined';
import { Blog } from '@/models/Blog';
import { GroupInfo } from '@/models/GroupInfo';
import { ContactElement } from '@/models/Contact';
import { groupMasters } from './predeterminedInformation';
import { GroupMasters } from '@/models/Group';

export default function getElementGroupsInfo(appData: AppData, contentSourceType: 'blog' | 'event' | 'contact'): GroupInfo[] {

  if (contentSourceType === 'contact') {
    return getContactElementGroupsInfo(appData);
  }

  const loggedIn = assertDefined(appData.loggedIn, 'appData.loggedIn is not defined', 'appData.loggedIn');
  const userDetails = assertDefined(appData.userDetails,'appData.userDetails is not defined','appData.userDetails');
  const sourceData = contentSourceType === 'blog' ? appData.blogPosts : appData.events;
  const permissionKey = contentSourceType === 'blog' ? 'blog_permission' : 'event_permission';
  const contentData = assertDefined(sourceData, `appData.${contentSourceType}Posts is not defined`, `appData.${contentSourceType}Posts`);
  const includeUnpublished = loggedIn && (userDetails?.permissions?.includes(permissionKey) || userDetails?.permissions?.includes('admin_permission')); const includedContent = (contentData || []).filter((e) => e.published || includeUnpublished);
  const years = [...new Set(includedContent.map((e: Blog) => parseInt(e.date.toLocaleString().slice(0, 4))))].sort((a, b) => b - a);
  const newGroupsInfo: GroupInfo[] = years.map((year) => ({year,title: i18next.t(`${contentSourceType}.groupTitle`) + ' ' + year,elements: [],}));

  for (let i = 0; i < newGroupsInfo.length; i++) {
    const matchedContent = includedContent.filter((e) => parseInt(e.date.toLocaleString().slice(0, 4)) === newGroupsInfo[i].year);
    newGroupsInfo[i].elements = matchedContent.map((e) => ({
      id: e.id,
      cardTitle: e.title,
      cornerImg: getCornerImg(e.author?.info?.picture),
      cornerText: `${e.author.firstName} ${e.author.lastName}`,
      dateText: e.date.toLocaleString().slice(0, 10),
      bgImg: e.frontPicture || e.pictures[0],
      danger: e.published ? null : i18next.t(`${contentSourceType}.notPublished`),
    }));
  }
  return newGroupsInfo;
}

function getContactElementGroupsInfo(appData: AppData): GroupInfo[] {
  if (!appData.users) return [];

  const years = [
    ...new Set(appData.users.map((e) => e.studsYear)),
  ].sort((a, b) => b - a);
  const newGroupsInfo: GroupInfo[] = years.map((year) => ({
    year,
    title: i18next.t('about.groupTitle') + ' ' + year,
    elements: [],
  }));

  for (let i = 0; i < newGroupsInfo.length; i++) {
    const matchedUsers = appData.users.filter(
      (e) => e.studsYear === newGroupsInfo[i].year
    );
    newGroupsInfo[i].elements = matchedUsers.map((e) => {
      const element: ContactElement = {
        picture: e.info.picture,
        name: `${e.firstName} ${e.lastName}`,
        phone: e.info.phone,
        email: e.info.email,
        role: i18next.t(e.info.role),
        vertical: true,
        lg: true,
      };

      const keys = (Object.keys(groupMasters) as Array<keyof GroupMasters>);
      for (let i = 0; i < keys.length; i++) {
        const key = keys[i];
        if (groupMasters[key].masterId === e.id) {
          element.role = i18next.t(key + 'Leader');
          break;
        }
      }

      return element;
    });
  }

  return newGroupsInfo;
}

function getCornerImg(picture: string | undefined) {
  return picture ? (
    <div
      className='me-2 ratio ratio-1x1 rounded-circle overflow-hidden'
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


