import Banner from '../components/Banner'
import PlayerCard from '../components/PlayerCard'
import { useEffect, useState } from 'react'

function BlackTeam() {
    const [team, setTeam] = useState([])

    useEffect(() => {
        getTeamData()
    }, [])

    const getTeamData = async () => {
        const response = await fetch('http://localhost:8001/users/active')
        const responseBody = await response.json()
        const tempTeam = await Promise.all(responseBody.map(async (player) => {
            const profile = await fetch('http://localhost:8001/users/GetPublicProfile/' + player.ign);
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