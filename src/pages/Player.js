import { useParams } from 'react-router-dom'
import Carousel from 'react-bootstrap/Carousel';
import Banner from '../components/Banner'
import MiniBanner from '../components/MiniBanner'
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const API = 'http://localhost:8080'

function Player() {
    const params = useParams()
    const [spotlight, setSpotlight] = useState([])
    const [clips, setClips] = useState([])
    const [player, setPlayer] = useState({})

    const navigate = useNavigate()

    useEffect(() => {
        getProfile()
    }, [])

    const getProfile = async () => {
        const profile = await fetch(API + '/users/GetPublicProfile/' + params.player)
        if(profile.status != 200)
            navigate('/404')
        const profileBody = await profile.json()
        setPlayer(profileBody)
        const playerSpotlight = await fetch(API + '/clips/GetSpotlight/' + profileBody.ign)
        const playerSpotlightBody = await playerSpotlight.json()
        setSpotlight(playerSpotlightBody.clips)
        const playerClips = await fetch(API + '/clips/GetPublicClips/' + profileBody.ign)
        const playerClipsBody = await playerClips.json()
        setClips(playerClipsBody.clips)
    }

    return (
        <>
            <Banner>{player.firstName} '{player.ign}' {player.lastName}</Banner>
            { (spotlight.length > 0) &&
            <>
            <div className='flex justify-center items-center m-4'>
                <div className='w-full'>
                    <Carousel slide={false} className=''>
                        {spotlight.map(video => {
                            return (
                                <Carousel.Item interval={null}>
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
            {/* <MiniBanner>BIO</MiniBanner> */}
            </>
            }
            <div className='grid grid-cols-3 gap-3 justify-center m-4 pt-5'>
                <div className='col-span-3 lg:col-span-1 justify-center relative my-auto'>
                    <img className='m-auto' src={API + player.pfp} onError={(e) => {e.target.src = './images/placeholderSquish.png'}}/>
                </div>
                <div className='col-span-3 lg:col-span-2 my-auto'>
                    <div className=' w-full h-full bg-black p-4 rounded text-white relative'>
                        <div className='whitespace-pre-line text-center bio'>
                            {player.bio}
                        </div>
                    </div>
                </div>
            </div>
            {/* <MiniBanner>STATS</MiniBanner>
            <div className='flex justify-center items-center my-5 mx-20 px-20 bio columns-2'>
                <div className='w-full'>
                    <img className='bannerImage' src='\images\Connor.png'/>
                </div>
                <div className='w-full'>
                    <img className='bannerImage' src='\images\Connor.png'/>
                </div>
            </div> */}
            <MiniBanner>CLIPS</MiniBanner>
            <div className='grid grid-cols-12 gap-4 m-4 clips'>
                {clips.map(video => {
                    return (
                        <>
                        <div className='col-span-12 lg:col-span-6 2xl:col-span-4'>
                            <div className='clip-title'>{video.title}</div>
                            <video controls muted loop className='bg-osu-shine p-1 mx-auto m-4 video-player'>
                                <source src={API + video.link} type='video/mp4' />
                                Your browser does not support the video tag.
                            </video>
                        </div>
                        </>
                    )
                })}
            </div>
        </>
    )
}
export default Player;