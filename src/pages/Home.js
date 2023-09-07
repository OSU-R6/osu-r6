import Banner from "../components/Banner";
import MatchCard from "../components/MatchCard";
import EventCard from "../components/EventCard";
import { useEffect, useState } from 'react';

function Home() {

    const API = process.env.REACT_APP_API_URL

    const [ matches, setMatches ] = useState([])
    const [ events, setEvents ] = useState([])

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
            <div>
            <Banner>OREGON STATE</Banner>
            <div>
                <img className="bannerImage" src="\images\AlumTeam2.png"/>
            </div>
            <Banner>RAINBOW SIX</Banner>
            </div>
            <div className='grid grid-cols-12 gap-4 m-4'>
                <div className='col-span-12 lg:col-span-6'>
                    <div  className='text-center margin-auto'>
                        <div className='text-white r6-font text-7xl underline pb-4'>MATCHES</div>
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
                        <div className='text-center text-osu text-5xl r6-font my-4'>
                            No Upcoming Matches
                        </div>
                        }
                    </div>
                </div>
                <div className='col-span-12 lg:col-span-6'>
                    <div  className='text-center'>
                        <div className='text-white r6-font text-7xl underline pb-4'>COMMUNITY EVENTS</div>
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
                        <div className='text-center text-osu text-5xl r6-font my-4'>
                            No Upcoming Community Events
                        </div>
                        }
                    </div>
                </div>

            </div>
        </>
    );
} export default Home;