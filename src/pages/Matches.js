import Banner from '../components/Banner'
import MatchCard from '../components/MatchCard'
import { useEffect, useState } from 'react'

const API = process.env.REACT_APP_API_URL

function Matches() {
    const [matchesUpcoming, setMatchesUpcoming] = useState({})
    const [matchesPast, setMatchesPast] = useState({})
    const [matchesLive, setMatchesLive] = useState({})

    useEffect(() => {
        fetch(API + '/matches/upcoming')
            .then(response => response.json())
            .then(data => setMatchesUpcoming(data))
            .catch(err => console.log(err))
        fetch(API + '/matches/past')
            .then(response => response.json())
            .then(data => setMatchesPast(data))
            .catch(err => console.log(err))
        fetch(API + '/matches/live')
            .then(response => response.json())
            .then(data => setMatchesLive(data))
            .catch(err => console.log(err))
    }, [])

    return(
        <>
            <Banner>Matches</Banner>
            <div className='grid grid-cols-12 gap-4 m-5'>
                    <div className='col-span-12 lg:col-span-6 2xl:col-span-4'>
                    {matchesUpcoming.length > 0 ? matchesUpcoming.map( (match, i) => {
                        return (
                            <MatchCard key={i} match={match} pastMatch={false} />
                        )
                    })
                    :
                    <div className='text-white text-4xl r6-font text-center mt-5'>Upcoming Matches TBA</div>
                    }
                    </div>
                    <div className='col-span-12 lg:col-span-6 2xl:col-span-8 grid grid-cols-12'>
                        {matchesPast.length > 0 && matchesPast.map( (match, i) => {
                            return (
                                <div className='col-span-12 xl:col-span-6 2xl:col-span-4'>
                                <MatchCard key={i} match={match} pastMatch={true} />
                                </div>
                            )
                        })}
                    </div>
            </div>
        </>
    )
} export default Matches