import { useNavigate } from 'react-router-dom';

const API = process.env.REACT_APP_API_URL

const AnnouncementCard = ({ announcement }) => {

    const navigate = useNavigate()

    const dateObj = new Date(announcement.createdAt);
    announcement.timeOnly = dateObj.toLocaleTimeString('en-US', {
        hour: 'numeric',
        minute: '2-digit',
        hour12: true
    })
    announcement.dateOnly = dateObj.toLocaleDateString('en-US', {
        month: 'short',
        day: '2-digit',
        year: 'numeric'
    })

    return (
        <div className='col-span-12 mx-4 my-6'>
            <button onClick={ async () => {navigate('/announcement/' + announcement.id)}}><div className='text-white text-4xl r6-font text-left'>{announcement.title}</div></button>
            <div className='text-osu text-3xl r6-font'><button onClick={ async () => {navigate('/player/' + announcement.User.ign)}}>{announcement.User.ign}</button> - {announcement.dateOnly}</div>
            {(announcement.body && announcement.body.length > 200) ?
                <div className='text-white text-xl'>{announcement.body.substring(0, 200)}... <button className='text-osu text-lg' onClick={ async () => {navigate('/announcement/' + announcement.id)}}>(Read More)</button></div>
            :
                <div className='text-white text-xl'>{announcement.body}</div>
            }
        </div>
    )
} 
export default AnnouncementCard