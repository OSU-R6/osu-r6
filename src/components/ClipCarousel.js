import { useEffect, useState } from 'react';
import Carousel from 'react-bootstrap/Carousel';

const ClipGallery = (player) => {

    const [clips, setClips] = useState([])

    const API = process.env.REACT_APP_API_URL

    useEffect(() => {
        getClips()
    }, [])

    const getClips = async () => {
        const clips = await fetch(API + '/clips/GetSpotlight/' + player.player.ign)
        const clipsBody = await clips.json()
        setClips(clipsBody.clips)
    }

    return (
        <>
        { (clips.length > 0) &&
        <>
        <div className='flex justify-center items-center m-4'>
            <div className='w-full'>
                <Carousel slide={false} className=''>
                    {clips.map((video, index) => {
                        return (
                            <Carousel.Item key={index} interval={null}>
                                <video autoPlay muted loop className='bg-osu-shine p-1 video-carousel mt-4'>
                                    <source src={API + video.link} type='video/mp4' />
                                    Your browser does not support the video tag.
                                </video>
                            </Carousel.Item>
                        )
                    })}
                </Carousel>
            </div>
        </div>
        </>
        }
        </>
    )
} 
export default ClipGallery