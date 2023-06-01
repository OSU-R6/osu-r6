import Banner from '../components/Banner'
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

function Alumni() {
    const [alumni, setAlumni] = useState([])

    const navigate = useNavigate()

    useEffect(() => {
        getAlumniData()
    }, [])

    const getAlumniData = async () => {
        const response = await fetch('http://localhost:8001/users/alumni')
        const responseBody = await response.json()
        const tempTeam = await Promise.all(responseBody.map(async (player) => {
            const profile = await fetch('http://localhost:8001/users/GetPublicProfile/' + player.ign);
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
                            <div className='col-span-12 sm:col-span-6 lg:col-span-4 xl:col-span-3 2xl:col-span-1 rounded-2xl border border-white hover:bg-neutral-950' onClick={ async () => {navigate('/player/' + player.ign)}}>
                                <div className='flex flex-wrap justify-center player-banner'>
                                    <div className='player-role text-white r6-font font-semibold w-full text-center text-6xl mt-4'>Entry</div>
                                    <img className='m-auto player-banner-image my-4' src={'http://localhost:8001' + player.pfp} onError={(e) => {e.target.src = './images/placeholderSquish.png'}}/>
                                    <div className='player-ign text-white r6-font font-semibold w-full text-center text-7xl mb-4'>{player.ign}</div>
                                </div>
                            </div>
                        )
                })}
            </div>

        </>
    );
} export default Alumni;