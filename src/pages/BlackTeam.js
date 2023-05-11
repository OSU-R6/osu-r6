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
                        return (
                            <form onSubmit={ async (e) => { navigate('/player/' + player.ign)}}>
                                <button className="rounded-md bg-osu hover:bg-osu-dark px-10 py-2.5 mt-2.5 text-sm font-semibold text-white shadow-sm" id="privacyToggle" type="submit">{player.firstName} "{player.ign}" {player.lastName}</button>
                            </form>
                        )
                })}
            </div>

        </>
    );
} export default BlackTeam;