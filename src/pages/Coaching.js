import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Banner from '../components/Banner'

function Coaching() {
    return(
        <>
            <Banner image="coaching"/>
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