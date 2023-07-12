import PersonAddAltIcon from '@mui/icons-material/PersonAddAlt'
import PeopleAltIcon from '@mui/icons-material/PeopleAlt'
import StadiumIcon from '@mui/icons-material/Stadium'
import EventIcon from '@mui/icons-material/Event'
import SettingsIcon from '@mui/icons-material/Settings'

const AdminNav = ({ activePanel, onStateChange }) => {

    const navData = [
        { icon: <PersonAddAltIcon />, label: 'Invites' },
        { icon: <PeopleAltIcon />, label: 'Users' },
        { icon: <StadiumIcon />, label: 'Matches' },
        { icon: <EventIcon />, label: 'Events' },
    ]

    const activeStyle = "active-nav-selection pl-3"

    return (
        <>
        <div className='col-span-4 sm:col-span-3 md:col-span-2 2xl:col-span-1'>
            <div className='flex py-3 bg-osu'>
                <SettingsIcon className='m-auto text-white my-5 scale-150'/>
            </div>
            {navData.map((item, index) => (
                <button key={index} onClick={e => onStateChange(index)} className={`${activePanel == index && activeStyle} w-full text-left`}>
                    <div className='text-white text-2xl font-bold p-3 w-full flex items-center'>
                        <span className='mr-2 mb-1'>{item.icon}</span>
                        <span>{item.label}</span>
                    </div>
                </button>
            ))}
        </div>
        </>
    )
} 
export default AdminNav