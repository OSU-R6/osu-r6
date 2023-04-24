import {
    useParams
} from 'react-router-dom'
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Carousel from 'react-bootstrap/Carousel';
import Banner from '../components/Banner'
import NotFound from './NotFound'
import players from '../data/players.json'

// const players = {
//     sweatycarrot: {
//         name: "SweatyCarrot",
//         video: "/videos/sweatycarrot.mp4"
//     },
//     soupzeit: {
//         name: "Soupzeit",
//         video: "/videos/soupzeit.mp4"
//     }
// }

const sourceData = players;

function handleSelect() {
    var vid = document.getElementById("vid");
    vid.currentTime = 5;
  };

function Player() {
    const {playerName} = useParams()
    console.log(sourceData.players.find(player => player.name === playerName))
    const playerData = sourceData.players[1]
    return playerData ? (
        <>
            <Banner image={playerData.name}/>
            {/* <Carousel slide={false}>
                <Carousel.Item interval={7000} onSlide={handleSelect}>

                    <video id="vid" width="100%" autoPlay muted loop>
                        <source src={playerData.videos[0]} type="video/mp4" />
                        Your browser does not support the video tag.
                    </video>
                </Carousel.Item>
                <Carousel.Item interval={8000}>
                    <video width="100%" autoPlay muted loop>
                        <source src={playerData.videos[1]} type="video/mp4" />
                        Your browser does not support the video tag.
                    </video>
                </Carousel.Item>
                <Carousel.Item>
                    <video width="100%" autoPlay muted loop>
                        <source src={playerData.videos[2]} type="video/mp4" />
                        Your browser does not support the video tag.
                    </video>
                </Carousel.Item>
            </Carousel> */}
            <Row className='p-4 m-0'>
                {playerData.videos.map(video => ( 
                    <video width="100%" autoPlay muted loop>
                        <source src={video} type="video/mp4" />
                        Your browser does not support the video tag.
                    </video>
                ))}
                {/* <video id="vid" width="100%" autoPlay muted loop>
                    <source src={playerData.videos[0]} type="video/mp4" />
                    Your browser does not support the video tag.
                </video> */}
            </Row>
        </>
    ): <NotFound />
}
export default Player;