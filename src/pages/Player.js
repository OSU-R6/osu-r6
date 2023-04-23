import {
    useParams
} from 'react-router-dom'
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Banner from '../components/Banner'
import NotFound from './NotFound'

const players = {
    player1: {
        name: "Conner",
        video: "/videos/conner_3k.mp4"
    },
    soupzeit: {
        name: "Soupzeit",
        video: "/videos/soup.mp4"
    }
}

function Player() {
    const { player } = useParams()
    const playerData = players[player]
    return playerData ? (
        <>
            <Banner image={playerData.name}/>
            {/* <Row className="alum-info bg-osu-black p-5 mx-0">
                <Col md={{ span: 12, offset: 0 }}>{
                    <p className="pre-wrap">
                        {playerData.name}
                    </p>
                }</Col>
            </Row> */}
            <Row className='p-4 m-0'>
                <video autoPlay muted loop>
                    <source src={playerData.video} type="video/mp4" />
                    Your browser does not support the video tag.
                </video>
            </Row>
        </>
    ): <NotFound />
}
export default Player;