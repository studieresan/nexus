import { GroupIcons, GroupMasters } from '@/models/Group'
import { AiFillSchedule, AiOutlineFundProjectionScreen } from 'react-icons/ai'
import { BsBuilding } from 'react-icons/bs'
import { FiSend } from 'react-icons/fi'
import { GiProcessor, GiReceiveMoney } from 'react-icons/gi'
import { GoPencil } from 'react-icons/go'
import { MdTravelExplore } from 'react-icons/md'
import { RiTeamFill } from 'react-icons/ri'

export const groupMasters: GroupMasters = {
  economy: {
    masterId: '6318c75168f1c00016841e2d',
    masterFirstName: 'William',
    masterLastName: 'Nilsson',
    icon: <GiReceiveMoney style={{ backgroundColor: 'white' }} />
  },
  event: {
    masterId: '6318c76f68f1c00016841e2e',
    masterFirstName: 'Hanna',
    masterLastName: 'Peters',
    icon: <AiFillSchedule style={{ backgroundColor: 'white' }} />

  },
  info: {
    masterId: '6318c78a68f1c00016841e2f',
    masterFirstName: 'Tania',
    masterLastName: 'Sayyah',
    icon: <GoPencil style={{ backgroundColor: 'white' }} />
  },
  it: {
    masterId: '6318a80c3ef1f5366b6bd9fe',
    masterFirstName: 'Gustav',
    masterLastName: 'Ekner',
    icon: <GiProcessor style={{ backgroundColor: 'white' }} />
  },
  travel: {
    masterId: '6318c8b668f1c00016841e30',
    masterFirstName: 'Emmy',
    masterLastName: 'Yin',
    icon: <MdTravelExplore style={{ backgroundColor: 'white' }} />
  },
  sales: {
    masterId: '6318c8d868f1c00016841e31',
    masterFirstName: 'Tobias',
    masterLastName: 'Vinsa',
    icon: <BsBuilding style={{ backgroundColor: 'white' }} />
  }
}

export const salesMaster = {
  id: '6318c8d868f1c00016841e31',
  firstName: 'Tobias',
  lastName: 'Vinsa',
  email: 'tobias-v@studs.se',
  phone: '+46 76-162 82 20'
}

export const projectMasters = [
  {
    id: '6318b1ef77039b0016c4259d',
    firstName: 'Marcus',
    lastName: 'Nordstedt',
    email: 'marcus@studs.se'
  },
  {
    id: '6318b20977039b0016c4259e', 
    firstName: 'Daniel',
    lastName: 'Grünler',
    email: 'daniel-g@studs.se'
  }
]
