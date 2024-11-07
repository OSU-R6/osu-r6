import { useEffect, useState } from 'react';

const ClipGallery = (player) => {

    const [clips, setClips] = useState([])

    const API = process.env.REACT_APP_API_URL

    useEffect(() => {
        getClips()
    }, [])

    const getClips = async () => {
        const playerClips = await fetch(API + '/users/' + player.player.ign + '/clips')
        const playerClipsBody = await playerClips.json()
        setClips(playerClipsBody.clips)
    }

    return (
        <>
            <div className='grid grid-cols-12 gap-4 m-4 clips scale-100 lg:scale-75'>
                {clips.map((video, index) => {
                    return (
                        <div key={index} className='w-full col-span-12 lg:col-span-6 2xl:col-span-4'>
                            <div className='clip-title'>{video.title}</div>
                            <video controls muted loop className='bg-osu-shine p-1 mx-auto m-4 video-player'>
                                <source src={video.link} type='video/mp4' />
                                Your browser does not support the video tag.
                            </video>
                        </div>
                    )
                })}
                {/* <div key={15} className='w-full col-span-12 lg:col-span-6 2xl:col-span-4'>
                    <div className='clip-title'>{"video.title"}</div>
                    <iframe
                        src="https://www.youtube.com/embed/mXBOjk90lkQ?si=qwbGPrd1XalO5v6s&amp;controls=1&modestbranding=1&rel=0&autoplay=0&mute=1" 
                        frameborder="0" 
                        allow="autoplay; encrypted-media; fullscreen" 
                        referrerpolicy="strict-origin-when-cross-origin" 
                        allowfullscreen
                        className=' p-1 mx-auto m-4 video-player h-full'>
                    </iframe>
                </div> */}
                    
            </div>
        </>
    )
} 
export default ClipGallery