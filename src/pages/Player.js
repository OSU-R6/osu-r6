import { useParams } from 'react-router-dom'
import Row from 'react-bootstrap/Row';
import Carousel from 'react-bootstrap/Carousel';
import Banner from '../components/Banner'
import MiniBanner from '../components/MiniBanner'
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';


function Player() {
    const params = useParams()
    const [clips, setClips] = useState([])
    const [player, setPlayer] = useState({})

    const navigate = useNavigate()

    useEffect(() => {
        getProfile()
    }, [])

    const getProfile = async () => {
        const profile = await fetch('http://localhost:8001' + '/users/GetPublicProfile/' + params.player)
        if(profile.status != 200)
            navigate('/404')
        const profileBody = await profile.json()
        setPlayer(profileBody)
        const playerClips = await fetch('http://localhost:8001' + '/clips/GetPublicClips/' + profileBody.ign)
        const playerClipsBody = await playerClips.json()
        setClips(playerClipsBody.clips)
    }

    return (
        <>
            <Banner>{player.firstName} '{player.ign}' {player.lastName}</Banner>
            <div className='flex justify-center items-center m-4'>
                <div className='w-full'>
                    <Carousel slide={false} className=''>
                        {clips.map(video => {
                            return (  
                                <Carousel.Item interval={null}>
                                <video autoPlay muted loop className='bg-osu-shine p-1 video-carousel mt-4'>
                                    <source src={'http://localhost:8001' + video.link} type='video/mp4' />
                                    Your browser does not support the video tag.
                                </video>
                                </Carousel.Item>
                            )
                        })}   
                    </Carousel>  
                </div>
            </div>
            <MiniBanner>BIO</MiniBanner>
            <div className='flex justify-center items-center my-5 grid grid-cols-6 gap-3 bio'>
                <div className='w-full col-span-6 xl:col-start-0 xl:col-span-2'>
                    <img className='bannerImage' src='\images\Connor.png'/>
                </div>
                <div className='w-full col-span-6 xl:col-start-4 xl-span-3 preformatted'>
                    <p className='pre-wrap'>
                        {player.bio}
                    </p>
                </div>
            </div>
            <MiniBanner>STATS</MiniBanner>
            <div className='flex justify-center items-center my-5 mx-20 px-20 bio columns-2'>
                <div className='w-full'>
                    <img className='bannerImage' src='\images\Connor.png'/>
                </div>
                <div className='w-full'>
                    <img className='bannerImage' src='\images\Connor.png'/>
                </div>
            </div>
            <MiniBanner>CLIPS</MiniBanner>                   
            <Row className='p-4 m-0'>
                {clips.map(video => {
                    return (  
                        <>
                        <div className='clip-title'>{video.title}</div>
                        <video controls muted loop className='bg-osu-shine p-1 mx-auto m-4 video-player'>
                            <source src={'http://localhost:8001' + video.link} type='video/mp4' />
                            Your browser does not support the video tag.
                        </video>
                        </>
                    )
                })}
            </Row>
        </>
    )
}
export default Player;