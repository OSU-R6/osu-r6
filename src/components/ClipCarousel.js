import { useEffect, useState, useRef } from 'react';
import Carousel from 'react-bootstrap/Carousel';

const ClipGallery = (player) => {

    const [clips, setClips] = useState([])
    const [index, setIndex] = useState(0)
    const videoRefs = useRef([]);

    const API = process.env.REACT_APP_API_URL

    useEffect(() => {
        getClips()
        videoRefs.current = videoRefs.current.slice(0, clips.length);
    }, [])

    const getClips = async () => {
        const clips = await fetch(API + '/users/' + player.player.ign + '/spotlight')
        const clipsBody = await clips.json()
        setClips(clipsBody.clips)
    }

    const handleSelect = (selectedIndex, e) => {
        const currentVideoElement = videoRefs.current[index]
        currentVideoElement.pause()
        currentVideoElement.currentTime = 0
        
        setIndex(selectedIndex)

        const nextVideoElement = videoRefs.current[selectedIndex]
        nextVideoElement.play()
    }

    const handleVideoEnd = () => {
        const nextIndex = index + 1 < clips.length ? index + 1 : 0
        setIndex(nextIndex)
        setTimeout(() => {
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
                                <video ref={element => (videoRefs.current[idx] = element)} autoPlay={idx === index && idx === 0} muted onEnded={handleVideoEnd} className='bg-osu-shine p-1 video-carousel mt-4'>
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