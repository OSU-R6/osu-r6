import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

function Coaching() {
    return(
        <>
        <div class="py-2">
            <Row className="bg-osu-black mx-0 justify-text-center">
                <Col md={{ span: 12, offset: 0 }} sm={{ span: 12, offset: 0 }}>{<img src="images/Coaching_Thin.png" className="bg-gradiant alumni-banner center-block"/>}</Col>
            </Row>
        </div>
            <Row className="alum-info bg-osu-black p-5 mx-0">
                <Col md={{ span: 12, offset: 0 }}>{
                    <p>
                        A fake champ that has no idea what he's doing.
                    </p>
                }</Col>
            </Row>
        </>
    );
} export default Coaching;