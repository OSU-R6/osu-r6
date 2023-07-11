const PlayerBio = ({ player }) => {

    const API = process.env.REACT_APP_API_URL

    return (
        <>
            <div className='grid grid-cols-3 gap-3 justify-center m-4 pt-5'>
                <div className='col-span-3 lg:col-span-1 justify-center relative my-auto'>
                    <img className='m-auto' src={API + player.pfp} onError={(e) => {e.target.src = '/images/placeholderSquish.png'}}/>
                </div>
                <div className='col-span-3 lg:col-span-2 my-auto'>
                    <div className=' w-full h-full bg-black p-4 rounded text-white relative'>
                        <div className='whitespace-pre-line text-center bio'>
                            {player.bio}
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
} 
export default PlayerBio