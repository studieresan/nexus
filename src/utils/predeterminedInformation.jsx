import { AiFillSchedule, AiOutlineFundProjectionScreen } from 'react-icons/ai'
import { BsBuilding } from 'react-icons/bs'
import { FiSend } from 'react-icons/fi'
import { GiProcessor, GiReceiveMoney } from 'react-icons/gi'
import { GoPencil } from 'react-icons/go'
import { MdTravelExplore } from 'react-icons/md'
import { RiTeamFill } from 'react-icons/ri'

export const groupsPredeterminedInfo = {
  economy: {
    masterFirstName: 'William',
    masterLastName: 'Nilsson',
    icon: <GiReceiveMoney style={{ backgroundColor: 'white' }} />
  },
  event: {
    masterFirstName: 'Hanna',
    masterLastName: 'Peters',
    icon: <AiFillSchedule style={{ backgroundColor: 'white' }} />

  },
  info: {
    masterFirstName: 'Tania',
    masterLastName: 'Sayyah',
    icon: <GoPencil style={{ backgroundColor: 'white' }} />
  },
  it: {
    masterFirstName: 'Gustav',
    masterLastName: 'Ekner',
    icon: <GiProcessor style={{ backgroundColor: 'white' }} />
  },
  travel: {
    masterFirstName: 'Emmy',
    masterLastName: 'Yin',
    icon: <MdTravelExplore style={{ backgroundColor: 'white' }} />
  },
  sales: {
    masterFirstName: 'Tobias',
    masterLastName: 'Vinsa',
    icon: <BsBuilding style={{ backgroundColor: 'white' }} />
  }
}

export const homepagePredeterminedOverlayGroups = [
  { name: 'project', icon: <AiOutlineFundProjectionScreen style={{ backgroundColor: 'transparent' }} /> },
  { name: 'events', icon: <RiTeamFill style={{ backgroundColor: 'transparent' }} /> },
  { name: 'contact', icon: <FiSend style={{ backgroundColor: 'transparent' }} /> }
]

export const salesMaster = {
  firstName: 'Tobias',
  lastName: 'Vinsa',
  email: 'tobias-v@studs.se',
  phone: '+46 76-162 82 20'
}

export const projectMasters = [
  {
    firstName: 'Marcus',
    lastName: 'Nordstedt',
    email: 'marcus@studs.se'
  },
  {
    firstName: 'Daniel',
    lastName: 'Grünler',
    email: 'daniel-g@studs.se'
  }
]
