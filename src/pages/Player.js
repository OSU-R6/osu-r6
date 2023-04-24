import {
    useParams
} from 'react-router-dom'
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Carousel from 'react-bootstrap/Carousel';
import Banner from '../components/Banner'
import NotFound from './NotFound'
import players from '../data/players.json'


const playersData = players;

function Player() {
    const {player} = useParams()
    var index = playersData.players.findIndex(function(x){
        return x.name === player
      });
    const playerData = playersData.players[index]
    return playerData ? (
        <>
            <Banner image={playerData.name}/>
            <Carousel slide={false} className="m-4">
                {playerData.videos.map(video => ( 
                    <Carousel.Item interval={null}>
                    <video autoPlay muted loop className="bg-osu-gradient p-1 video-carousel mt-4">
                        <source src={video} type="video/mp4" />
                        Your browser does not support the video tag.
                    </video>
                    </Carousel.Item>
                ))}
    
            </Carousel>
                    

            <Row className='p-4 m-0'>
                {playerData.videos.map(video => ( 
                    <video autoPlay muted loop className="bg-osu-gradient p-1 mx-auto m-4 video-player">
                        <source src={video} type="video/mp4" />
                        Your browser does not support the video tag.
                    </video>
                ))}
            </Row>
        </>
    ): <NotFound />
}
export default Player;