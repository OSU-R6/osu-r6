import { useEffect, useState } from 'react';
import Carousel from 'react-bootstrap/Carousel';

const ClipGallery = (player) => {

    const [clips, setClips] = useState([])
    const [index, setIndex] = useState(0)

    const API = process.env.REACT_APP_API_URL

    useEffect(() => {
        getClips()
    }, [])

    const getClips = async () => {
        const clips = await fetch(API + '/users/' + player.player.ign + '/spotlight')
        const clipsBody = await clips.json()
        setClips(clipsBody.clips)
    }

    const handleSelect = (selectedIndex, e) => {
        setIndex(selectedIndex);
    };

    const handleVideoEnd = () => {
        const nextIndex = index + 1 < clips.length ? index + 1 : 0
        setIndex(nextIndex)
        setTimeout(() => {
            console.log('playing next video')
            const videos = document.querySelectorAll('.video-carousel');
            if (videos[nextIndex]) {
                videos[nextIndex].play().catch(err => console.error("Video play failed:", err))
            }
            }, 0)
    }

    return (
        <>
        { (clips.length > 0) &&
        <>
        <div className='flex justify-center items-center my-4 lg:mx-4'>
            <div className='w-full'>
                <Carousel activeIndex={index} onSelect={handleSelect} interval={null}>
                    {clips.map((video, idx) => {
                        return (
                            <Carousel.Item key={idx}>
                                <video autoPlay muted onEnded={handleVideoEnd} className='bg-osu-shine p-1 video-carousel mt-4'>
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