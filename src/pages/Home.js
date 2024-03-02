import MatchCard from "../components/MatchCard";
import EventCard from "../components/EventCard";
import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';

function Home() {

    const API = process.env.REACT_APP_API_URL

    const [ matchesUpcoming, setMatchesUpcoming ] = useState([])
    const [ matchesPast, setMatchesPast ] = useState([])
    const [ events, setEvents ] = useState([])

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
    }, [])

    return(
        <>
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

            <div className='grid grid-cols-12 gap-4 m-4 w-75 mx-auto'>
                <div className='col-span-12 lg:col-span-6 xl:col-span-4'>
                    <div  className='text-center margin-auto'>
                        <div className='text-white r6-font underline xl:text-6xl lg:text-5xl text-4xl pb-4'>UPCOMING MATCHES</div>
                    </div>
                    <div>
                        {matchesUpcoming.length > 0 ?
                        <>
                        {matchesUpcoming.map(match => {
                            return (
                                <MatchCard match={match} status={"upcoming"}/>
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
                <div className='col-span-12 lg:col-span-6 xl:col-span-4'>
                    <div  className='text-center margin-auto'>
                        <div className='text-white r6-font underline xl:text-6xl lg:text-5xl text-4xl pb-4'>RECENT MATCHES</div>
                    </div>
                    <div>
                        {matchesPast.length > 0 ?
                        <>
                        {matchesPast.slice(0, 2).map(match => {
                            return (
                                <MatchCard match={match} status={"past"}/>
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
                <div className='col-span-12 xl:col-span-4'>
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