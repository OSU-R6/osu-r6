import Banner from '../components/Banner'
import { useEffect, useState } from 'react';

function Alumni() {
    const [alumni, setAlumni] = useState([])

    useEffect(() => {
        getAlumni()
    }, [])

    const getAlumni = async () => {
        const response = await fetch('http://localhost:8001/users/alumni')
        setAlumni(await response.json())
    }

    return(
        <>
            <Banner>ALUMNI</Banner>

            <div>
                {alumni.map(player => {
                        return <a href={"/player/" + player.ign}>{player.firstName} "{player.ign}" {player.lastName}</a>;
                })}
            </div>

        </>
    );
} export default Alumni;