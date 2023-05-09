import { useParams } from 'react-router-dom'
import Row from 'react-bootstrap/Row';
import Carousel from 'react-bootstrap/Carousel';
import Banner from '../components/Banner'
import NotFound from './NotFound'
import { useEffect, useState } from 'react';



function Player() {
    const {player} = useParams()
    const [clips, setClips] = useState([])

    useEffect(() => {
        getClips()
    }, [])

    const getClips = async () => {
        const response = await fetch('http://localhost:8001' + '/clips/GetPublicClips/' + player)
        const responseBody = await response.json()
        setClips(responseBody.clips)
    }

    return (
        <>
            <Banner>{player}</Banner>
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