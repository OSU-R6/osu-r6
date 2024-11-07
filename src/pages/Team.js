import { useParams } from 'react-router-dom'
import Banner from '../components/Banner'
import PlayerCard from '../components/PlayerCard'
import { useEffect, useState } from 'react'

const API = process.env.REACT_APP_API_URL

function Team() {
    const params = useParams()
    const [team, setTeam] = useState({})
    const [coach, setCoach] = useState(null)
    const [roster, setRoster] = useState([])
    const [isLoading, setIsLoading] = useState(true)

    useEffect( () => {
        setRoster([])
        setCoach(null)
        setTeam({})
        const loadData = async () => {
            await getTeamData()
            await new Promise(resolve => setTimeout(resolve, 2000)); // Wait for 2 seconds
            setIsLoading(false)
        }
        loadData()
    }, [params])

    const getTeamData = async () => {
        try {
            const teamsResponse = await fetch(API + '/teams/' + params.team + '/info')
            const TeamsResponseBody = await teamsResponse.json()
            setTeam(TeamsResponseBody)
            const response = await fetch(API + '/teams/'+ params.team + '/roster')
            const responseBody = await response.json()
            if(responseBody.length > 0){
                const rosterBody = await Promise.all(responseBody.map(async (player) => {
                    const profile = await fetch(API + '/users/' + player.ign)
                    return profile.json()
                }))
                setRoster(rosterBody)
            }
            
            if(TeamsResponseBody.coach_id != null){
                const coachResponse = await fetch(API + '/users/' + TeamsResponseBody.coach_id + '/id')
                const coachResponseBody = await coachResponse.json()
                coachResponseBody.isCoach = true
                setCoach(coachResponseBody)
            }
        } catch (err) {
            setTeam({})
            setCoach(null)
            setRoster([])
        }
    }

    return(
        <>
            {isLoading ?
            <div className='w-full flex'>
                <div className='loader m-auto'/>
            </div>
             :
             <>
            <Banner>{team.name}</Banner>
            <div className='grid grid-cols-12 gap-4 m-4 2xl:grid-cols-5'>
                {roster.length > 0 && roster.map( (player, i) => {
                        if(player.isSubstitute === false){
                            return (
                                <PlayerCard key={i} player={player} igl={player.id === team.igl_id} captain={player.id === team.captain_id}/>
                            )
                        }
                })}
                {roster.length > 0 && roster.map( (player, i) => {
                        if(player.isSubstitute === true){
                            return (
                                <PlayerCard key={i} player={player}/>
                            )
                        }
                })}
                {coach && 
                    <PlayerCard player={coach} />
                }
            </div>
            </>
            }
        </>
    )
} export default Team