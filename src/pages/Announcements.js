import Banner from '../components/Banner'
import AnnouncementCard from '../components/AnnouncementCard'
import { useEffect, useState } from 'react'

const API = process.env.REACT_APP_API_URL

function Announcements() {
    const [announcements, setAnnouncements] = useState({})

    useEffect(() => {
        getAnnouncements()
    }, [])

    const getAnnouncements = async () => {
        try {
            fetch(API + '/announcements')
                .then(response => response.json())
                .then(data => setAnnouncements(data))
                .catch(err => console.log(err))
        } catch (err) {
            setAnnouncements({})
        }
    }

    return(
        <>
            <Banner>Announcements</Banner>
            <div className='grid grid-cols-12 gap-4 m-5 2xl:grid-cols-5'>
                {announcements.length > 0 && announcements.map( (announcement, i) => {
                    return (
                        <AnnouncementCard key={i} announcement={announcement} />
                    )
                })}
            </div>
        </>
    )
} export default Announcements