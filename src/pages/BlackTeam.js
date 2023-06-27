import Banner from '../components/Banner'
import PlayerCard from '../components/PlayerCard'
import { useEffect, useState } from 'react'

const API = process.env.REACT_APP_API_URL

function BlackTeam() {
    const [team, setTeam] = useState([])

    useEffect(() => {
        getTeamData()
    }, [])

    const getTeamData = async () => {
        const response = await fetch(API + '/teams/1/roster')
        const responseBody = await response.json()
        const tempTeam = await Promise.all(responseBody.map(async (player) => {
            const profile = await fetch(API + '/users/GetPublicProfile/' + player.ign);
            return profile.json();
        }));
        setTeam(tempTeam);
    }

    return(
        <>
            <Banner>Black Team</Banner>

            <div className='grid grid-cols-12 gap-4 m-4 2xl:grid-cols-5'>
                {team.map( player => {
                        return (
                            <PlayerCard player={player} />
                        )
                })}
            </div>

        </>
    );
} export default BlackTeam;