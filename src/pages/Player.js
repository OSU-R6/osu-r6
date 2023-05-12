import { useParams } from 'react-router-dom'
import Row from 'react-bootstrap/Row';
import Carousel from 'react-bootstrap/Carousel';
import Banner from '../components/Banner'
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
            <Banner>{player.ign}</Banner>
            <Carousel slide={false} className="m-4">
                {clips.map(video => {
                    return (  
                        <Carousel.Item interval={null}>
                        <video autoPlay muted loop className="bg-osu-shine p-1 video-carousel mt-4">
                            <source src={'http://localhost:8001' + video.link} type="video/mp4" />
                            Your browser does not support the video tag.
                        </video>
                        </Carousel.Item>
                    )
                })}   
            </Carousel>                    
            <Row className='p-4 m-0'>
                {clips.map(video => {
                    return (  
                        <video autoPlay muted loop className="bg-osu-shine p-1 mx-auto m-4 video-player">
                            <source src={'http://localhost:8001' + video.link} type="video/mp4" />
                            Your browser does not support the video tag.
                        </video>
                    )
                })}
            </Row>
        </>
    )
}
export default Player;