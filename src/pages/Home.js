import MatchCard from "../components/MatchCard";
import EventCard from "../components/EventCard";
import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { Announcement, Stream } from "@mui/icons-material";
import StreamEmbed from "../components/StreamEmbed";
import MiniBanner from "../components/MiniBanner";
import AnnouncementCard from "../components/AnnouncementCard";

function Home() {

    const API = process.env.REACT_APP_API_URL

    const [ matchesUpcoming, setMatchesUpcoming ] = useState([])
    const [ matchesPast, setMatchesPast ] = useState([])
    const [ events, setEvents ] = useState([])
    const [ matchesLive, setMatchesLive ] = useState([])
    const [ announcements, setAnnouncements ] = useState([])

    const navigate = useNavigate()

    useEffect(() => {
        fetch(API + '/matches/upcoming')
            .then(response => response.json())
            .then(data => setMatchesUpcoming(data))
            .catch(err => console.log(err))
        fetch(API + '/matches/past')
            .then(response => response.json())
            .then(data => setMatchesPast(data))
            .catch(err => console.log(err))
        fetch(API + '/events/upcoming')
            .then(response => response.json())
            .then(data => setEvents(data))
            .catch(err => console.log(err))
        fetch(API + '/matches/live')
            .then(response => response.json())
            .then(data => setMatchesLive(data))
            .catch(err => console.log(err))
        fetch(API + '/announcements')
            .then(response => response.json())
            .then(data => setAnnouncements(data))
            .catch(err => console.log(err))
    }, [])

    return(
        <>
            <div className="home-banner test-banner">  
                <div className="mx-5 grid grid-cols-12 align-middle items-center h-screen">
                    <div className="col-span-12 xl:col-span-6 text-center">
                        <div className="text-white text-shadow-osu osu-glow r6-font md:text-9xl text-7xl m-auto">Oregon State</div>
                    </div>
                    <div className="col-span-12 xl:col-span-6 text-center">
                        <div className="text-white text-shadow-osu osu-glow r6-font md:text-9xl text-7xl m-auto">Rainbow Six</div>
                    </div>
                </div>      
            </div>

            { matchesLive.length > 0 &&
                <div className="live-match">
                    <div  className='text-center margin-auto my-4'>
                        <div className='text-white r6-font text-shadow-osu underline md:text-6xl text-5xl'>LIVE MATCH</div>
                    </div>
                    {matchesLive.map((match, i) => {
                        if (match.stream_link !== null) {
                            return(
                                <StreamEmbed key={i} match={match} />
                            )
                        }
                    })}
                </div>
            }

            <div className='grid grid-cols-12 gap-4 m-4 mx-auto'>
                <div className='col-span-12 xl:col-span-4 grid grid-cols-12 gap-4'>
                    <div className='col-span-12 lg:col-span-6 xl:col-span-12 mb-4'>
                        <div  className='text-center margin-auto'>
                            <div className='text-white r6-font text-shadow-osu underline md:text-6xl text-5xl'>UPCOMING MATCHES</div>
                        </div>
                        <div>
                            {matchesUpcoming.length > 0 ?
                            <>
                            {matchesUpcoming.slice(0, 3).map((match, i) => {
                                return (
                                    <MatchCard key={i} match={match} pastMatch={false}/>
                                )
                            })}
                            </>
                            :
                            <div className='text-center text-osu r6-font xl:text-5xl lg:text-4xl text-3xl my-4'>
                                No Upcoming Matches
                            </div>
                            }
                        </div>
                    </div>
                    <div className='col-span-12 lg:col-span-6 xl:col-span-12 mb-4'>
                        <div className='text-center margin-auto'>
                            <div className='text-white r6-font text-shadow-osu underline md:text-6xl text-5xl'>RECENT MATCHES</div>
                        </div>
                        <div>
                            {matchesPast.length > 0 ?
                            <>
                            {matchesPast.slice(0, 3).reverse().map((match, i) => {
                                return (
                                    <MatchCard key={i} match={match} pastMatch={true}/>
                                )
                            })}
                            </>
                            :
                            <div className='text-center text-osu r6-font xl:text-5xl lg:text-4xl text-3xl my-4'>
                                No Recent Matches
                            </div>
                            }
                        </div>
                    </div>
                </div>
                <div className='col-span-12 xl:col-span-8 mx-5'>
                    <div className='max-w-screen-xl m-auto mb-5'>
                            {announcements.length > 0 &&
                                <div className='grid grid-cols-12'>
                                    <div className='col-span-12 mx-4'>
                                    <button onClick={async () => {navigate('/announcements')}}><div className='text-white r6-font text-shadow-osu underline md:text-6xl text-5xl'>ANNOUNCEMENTS</div></button>
                                    </div>
                                    {announcements.slice(0, 3).map((announcement, i) => {
                                        return (
                                            <AnnouncementCard key={i} announcement={announcement}/>
                                        )
                                    })}
                                    {announcements.length > 3 &&
                                        <div className='col-span-12 mx-4'>
                                            <button onClick={async () => {navigate('/announcements')}} className='text-osu r6-font md:text-4xl text-3xl'>View More</button>
                                        </div>
                                    }
                                </div>
                            }
                    </div>
                    <div className='col-span-12 max-w-screen-xl m-auto mb-4'>
                        <div  className='mx-4'>
                            <div className='text-white r6-font text-shadow-osu underline md:text-6xl text-5xl'>COMMUNITY EVENTS</div>
                        </div>
                        <div className='flex'>
                            {events.length > 0 ?
                            <>
                            {events.map((event, i) => {
                                return (
                                    <EventCard key={i} event={event}/>
                                )
                            })}
                            </>
                            :
                            <div className='text-center text-osu r6-font xl:text-5xl lg:text-4xl text-3xl my-4'>
                                No Upcoming Community Events
                            </div>
                            }
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
} export default Home;