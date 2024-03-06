import { useNavigate } from 'react-router-dom';

const API = process.env.REACT_APP_API_URL

const PlayerCard = ({ player, igl, captain }) => {

    const navigate = useNavigate()

    return (
        <div className='col-span-12 sm:col-span-6 lg:col-span-4 xl:col-span-3 2xl:col-span-1 rounded-2xl player-card m-auto w-full' onClick={ async () => {navigate('/player/' + player.ign)}}>
            <div className='flex flex-wrap justify-center'>
                <div className='player-card-bg w-full'>
                    <div className='absolute text-5xl text-white mt-2 ml-4 r6-font text-shadow-osu'>
                        <div className='grid grid-cols-12'>
                        {captain && <div className='col-span-12'>CAPTAIN</div>}
                        {igl && <div className='col-span-12'>IGL</div>}
                        </div>
                    </div>
                    <img className='player-card-image mt-4 m-auto oppacity-100' src={API + player.pfp} onError={(e) => {e.target.src = '/images/placeholder.png'}}/>
                </div>
                <div className='player-car-divider w-full h-1 bg-osu'></div>
                <div className='player-ign text-white r6-font font-semibold w-full text-center text-7xl mb-2 mt-1'>{player.ign}</div>
                {(player.isCoach || player.type === 'active') &&
                <>
                <div className='w-75 text-center mt-2 mb-1 h-px bg-osu'></div>
                <div className='player-ign text-white r6-font font-semibold w-full text-center text-6xl mb-3'>{player.isSubstitute ? <>Substitute</> : player.isCoach ? <>Coach</> : player.role}</div>
                </>
                }
            </div>
        </div>
    )
} 
export default PlayerCard