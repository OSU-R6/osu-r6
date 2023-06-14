import { useNavigate } from 'react-router-dom';

const API = process.env.REACT_APP_API_URL

const PlayerCard = ({ player }) => {

    const navigate = useNavigate()
    console.log(player.ign)

    return (
        <div className='col-span-12 sm:col-span-6 lg:col-span-4 xl:col-span-3 2xl:col-span-1 rounded-2xl hover:bg-zinc-950 player-card' onClick={ async () => {navigate('/player/' + player.ign)}}>
            <div className='flex flex-wrap justify-center'>
                <div className='player-role text-white r6-font font-semibold w-full text-center text-6xl mt-4'>{player.role}</div>
                <img className='m-auto player-card-image my-4' src={API + player.pfp} onError={(e) => {e.target.src = './images/placeholderSquish.png'}}/>
                <div className='player-ign text-white r6-font font-semibold w-full text-center text-7xl mb-4'>{player.ign}</div>
            </div>
        </div>
    )
} 
export default PlayerCard