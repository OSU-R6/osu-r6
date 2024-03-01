import Banner from "../components/Banner";
import MatchCard from "../components/MatchCard";
import EventCard from "../components/EventCard";
import MiniBanner from '../components/MiniBanner'
import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';

function Home() {

    const API = process.env.REACT_APP_API_URL

    const [ matches, setMatches ] = useState([])
    const [ events, setEvents ] = useState([])

    const navigate = useNavigate()

    useEffect(() => {
        fetch(API + '/matches/upcoming')
            .then(response => response.json())
            .then(data => setMatches(data))
            .catch(err => console.log(err))
        fetch(API + '/events/upcoming')
            .then(response => response.json())
            .then(data => setEvents(data))
            .catch(err => console.log(err))
    }, [])

    const getMatches = async () => { 
        fetch(API + '/matches/upcoming')
            .then(response => response.json())
            .then(data => setMatches(data))
            .catch(err => console.log(err))
    }

    const getEvents = async () => { 
        try{
            const events = await fetch(API + '/events/upcoming')
            const eventsBody = await events.json()
            setEvents(eventsBody)
        } catch (err) {
            console.log("Server Connection Error")
        }
    }

    return(
        <>
            {/* <div>
                <Banner>OREGON STATE</Banner>
                    <div>
                        <img className="bannerImage w-full" src="\images\alumteam2.png"/>
                    </div>
                <Banner>RAINBOW SIX</Banner>
            </div> */}
            {/* <div className="my- text-center">
                <div className="bg-osu-shine banner-text r6-font text-9xl m-auto pb-2 mb-5">Oregon State Rainbow Six</div>
                <img className="bannerImage w-full" src="\images\R6_4.png"/>
            </div> */}

            {/* <div className="mb-5 text-center">
                <div className="text-white banner-sledge-image r6-font text-9xl m-auto pb-2 mb-5">Oregon State Rainbow Six</div>
                <Banner><img className="bannerImage w-full" src="\images\R6_4.png"/></Banner>
            </div> */}

            {/* <div className="m-4 grid grid-cols-12 align-middle items-center">
                <div className="col-span-12 lg:col-span-4 text-center">
                    <div className="bg-osu-shine banner-text r6-font text-9xl m-auto pb-2">Oregon State</div>
                </div>
                <div className="col-span-12 lg:col-span-4">
                    <img className="bannerImage w-full scale-75" src="\images\Sledge_Full_Body.webp"/>
                </div>
                <div className="col-span-12 lg:col-span-4 text-center">
                    <div className="bg-osu-shine banner-text r6-font text-9xl m-auto pb-2">Rainbow Six Siege</div>
                </div>
            </div> */}
            <div className="home-banner">
                
                <div className="m-5 grid grid-cols-12 align-middle items-center">
                    <div className="col-span-12 lg:col-span-6 text-center">
                        <div className="text-white osu-glow r6-font md:text-9xl text-7xl m-auto pb-2 my-4">Oregon State Rainbow Six</div>
                    </div>
                    <div className="col-span-12 lg:col-span-6">
                        <img className="bannerImage osu-glow w-full" src="\images\R6_3.png"/>
                    </div>
                </div>
               
            </div>
            
            {/* <div className="grid grid-cols-12 gap-4 w-75 my-36 mx-auto">
                <div className="col-span-6 text-center"> 
                    <div className="text-white r6-font text-6xl"><span onClick={ async () => {navigate('/about/')}}>About The Program</span></div>
                </div>
            </div> */}
  
            {/* <MiniBanner>Schedule</MiniBanner> */}

            <div className='grid grid-cols-12 gap-4 m-4 w-75 mx-auto'>
                <div className='col-span-12 lg:col-span-6'>
                    <div  className='text-center margin-auto'>
                        <div className='text-white r6-font underline xl:text-6xl lg:text-5xl text-4xl pb-4'>MATCHES</div>
                    </div>
                    <div>
                        {matches.length > 0 ?
                        <>
                        {matches.map(match => {
                            return (
                                <MatchCard match={match}/>
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
                <div className='col-span-12 lg:col-span-6'>
                    <div  className='text-center'>
                        <div className='text-white r6-font underline xl:text-6xl lg:text-5xl text-4xl pb-4'>COMMUNITY EVENTS</div>
                    </div>
                    <div>
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
        </>
    );
} export default Home;