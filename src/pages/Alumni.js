import Banner from '../components/Banner'
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

function Alumni() {
    const [alumni, setAlumni] = useState([])

    const navigate = useNavigate()

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
                        return (
                            <form onSubmit={ async (e) => { navigate('/player/' + player.ign)}}>
                                <button className="rounded-md bg-osu hover:bg-osu-dark px-10 py-2.5 mt-2.5 text-sm font-semibold text-white shadow-sm" id="privacyToggle" type="submit">{player.firstName} "{player.ign}" {player.lastName}</button>
                            </form>
                        )
                })}
            </div>

        </>
    );
} export default Alumni;