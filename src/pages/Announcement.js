import { useParams } from 'react-router-dom'
import Banner from '../components/Banner'
import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'

const API = process.env.REACT_APP_API_URL

function Announcement() {
    const params = useParams()
    const [announcement, setAnnouncement] = useState({})
    const navigate = useNavigate()

    useEffect(() => {
        getAnnouncement()
    }, [])

    const getAnnouncement = async () => {
        try {
            fetch(API + '/announcements/' + params.announcement)
                .then(response => response.json())
                .then(data => setAnnouncement(data))
                .catch(err => console.log(err))
        } catch (err) {
            setAnnouncement({})
        }
    }

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

    return(
        <>
            <Banner>Announcements</Banner>
            {announcement != {} &&
            <div className='grid grid-cols-12 gap-4 m-5 2xl:grid-cols-5'>
                <div className='col-span-12 md:col-span-6'>
                    <div className='bg-black p-5 rounded-lg'>
                        <div className='text-white text-6xl r6-font mb-2'>{announcement.title}</div>
                        {announcement.User &&
                        <div className='text-osu text-4xl r6-font mb-4'><button onClick={ async () => {navigate('/player/' + announcement.User.ign)}}>{announcement.User.ign} ({announcement.User.firstName})</button> - {announcement.dateOnly}</div>
                        }
                        <div className='text-white text-xl'>{announcement.body}</div>
                    </div>
                </div>
            </div>
            }
        </>
    )
} export default Announcement