import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

function Banner(props) {
    return (
        <div className="py-2 bg-osu-gradient">
            <Row className="bg-osu-black mx-0">
                <Col>{<img src={["/images/banners/" + props.image + ".png"]} className="bg-osu-gradient banner"/>}</Col>
            </Row>
        </div>
    );
} export default Banner;