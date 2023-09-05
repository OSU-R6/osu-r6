import { useParams } from 'react-router-dom'
import Banner from '../components/Banner'
import PlayerCard from '../components/PlayerCard'
import { useEffect, useState } from 'react'

const API = process.env.REACT_APP_API_URL

function Team() {
    const params = useParams()
    const [team, setTeam] = useState({})
    const [roster, setRoster] = useState([])

    useEffect(() => {
        getTeamData()
    }, [])

    const getTeamData = async () => {
        const teamsResponse = await fetch(API + '/teams/' + params.team + '/info')
        const TeamsResponseBody = await teamsResponse.json()
        setTeam(TeamsResponseBody)
        const response = await fetch(API + '/teams/'+ params.team + '/roster')
        const responseBody = await response.json()
        if(responseBody.length > 0){
            const roster = await Promise.all(responseBody.map(async (player) => {
                const profile = await fetch(API + '/users/' + player.ign)
                return profile.json()
            }))
            setRoster(roster)
        }
    }

    return(
        <>
            <Banner>{team.name}</Banner>
            <div className='grid grid-cols-12 gap-4 m-4 2xl:grid-cols-5'>
                {roster.length > 0 && roster.map( player => {
                        return (
                            <PlayerCard player={player} />
                        )
                })}
            </div>
        </>
    )
} export default Team