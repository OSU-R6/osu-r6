import Socials from './Socials'

const PlayerBio = ({ player }) => {

    const API = process.env.REACT_APP_API_URL

    return (
        <>
            <div className='grid grid-cols-3 gap-3 justify-center py-2 scale-100 lg:scale-75'>
                <div className='col-span-3 lg:col-span-1 justify-center relative my-2 px-4'>
                    <img className='m-auto' src={API + player.pfp} onError={(e) => {e.target.src = '/images/placeholder.png'}}/>
                </div>
                <div className='col-span-3 lg:col-span-2 my-auto py-4'>
                    <div className='text-osu text-7xl font-bold r6-font flex mb-4'>
                        <span className='m-auto'>{player.firstName + " " + player.lastName}</span>
                    </div>
                    <div className=' w-full h-full bg-black rounded text-white text-xl relative'>
                        <div className='whitespace-pre-line text-center bio'>
                            {player.bio}
                        </div>
                    </div>
                    <Socials player={player}/>
                </div>
            </div>
        </>
    )
} 
export default PlayerBio