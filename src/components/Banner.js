import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

function Banner(props) {
    return (
        <div className="py-2 bg-osu-gradient">
            <Row className="bg-osu-black mx-0 justify-text-center">
                <Col md={{ span: 12, offset: 0 }} sm={{ span: 12, offset: 0 }}>{<img src={["/images/banners/" + props.image + ".png"]} className="bg-osu-gradient alumni-banner center-block"/>}</Col>
            </Row>
        </div>
    );
} export default Banner;