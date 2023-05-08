import Banner from '../components/Banner'
import { useEffect, useState } from 'react';

function BlackTeam() {
    const [team, setTeam] = useState([])

    useEffect(() => {
        getTeam()
    }, [])

    const getTeam = async () => {
        const response = await fetch('http://localhost:8001/users/active')
        setTeam(await response.json())
    }

    return(
        <>
            <Banner>Black Team</Banner>

            <div>
                {team.map(player => {
                        return <a href={"/player/" + player.ign}>{player.firstName} "{player.ign}" {player.lastName}</a>;
                })}
            </div>

        </>
    );
} export default BlackTeam;