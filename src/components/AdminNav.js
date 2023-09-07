import PersonAddAltIcon from '@mui/icons-material/PersonAddAlt'
import PeopleAltIcon from '@mui/icons-material/PeopleAlt'
import Diversity3Icon from '@mui/icons-material/Diversity3'
import StadiumIcon from '@mui/icons-material/Stadium'
import EventIcon from '@mui/icons-material/Event'
import SettingsIcon from '@mui/icons-material/Settings'
import Banner from './Banner'
import { BsFillGearFill } from 'react-icons/bs';


const AdminNav = ({ activePanel, onStateChange }) => {

    const navData = [
        { icon: <PersonAddAltIcon />, label: 'Invites' },
        { icon: <PeopleAltIcon />, label: 'Users' },
        { icon: <Diversity3Icon />, label: 'Teams' },
        { icon: <StadiumIcon />, label: 'Matches' },
        { icon: <EventIcon />, label: 'Events' },
    ]

    const activeStyle = "active-nav-selection pl-3"

    return (
        <>
        <Banner static>
            <div className='text-white'>
                <BsFillGearFill className='m-auto py-2 pt-3'/>
            </div>
        </Banner>
        {navData.map((item, index) => (
            <button key={index} onClick={e => onStateChange(index)} className={`${activePanel == index && activeStyle} w-full text-left`}>
                <div className='text-white text-2xl font-bold p-3 w-full flex items-center'>
                    <span className='mr-2 mb-1'>{item.icon}</span>
                    <span>{item.label}</span>
                </div>
            </button>
        ))}
        </>
    )
} 
export default AdminNav