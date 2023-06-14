import Banner from '../components/Banner'
import PlayerCard from '../components/PlayerCard';
import { useEffect, useState } from 'react'

const API = process.env.REACT_APP_API_URL

function Alumni() {
    const [alumni, setAlumni] = useState([])

    useEffect(() => {
        getAlumniData()
    }, [])

    const getAlumniData = async () => {
        const response = await fetch(API + '/users/alumni')
        const responseBody = await response.json()
        const tempTeam = await Promise.all(responseBody.map(async (player) => {
            const profile = await fetch(API + '/users/GetPublicProfile/' + player.ign);
            return profile.json();
        }));
        setAlumni(tempTeam);
    }

    return(
        <>
            <Banner>ALUMNI</Banner>

            <div className='grid grid-cols-12 gap-4 m-4 2xl:grid-cols-5'>
                {alumni.map( player => {
                        return (
                            <PlayerCard player={player} />
                        )
                })}
            </div>

        </>
    );
} export default Alumni;