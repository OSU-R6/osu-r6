import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

function About() {
    return(
        <>
        <div class="py-2">
            <Row className="bg-osu-black mx-0 justify-text-center">
                <Col md={{ span: 12, offset: 0 }} sm={{ span: 12, offset: 0 }}>{<img src="images/OSU-R6_Thin.png" className="bg-gradiant alumni-banner center-block"/>}</Col>
            </Row>
        </div>
            <Row className="alum-info bg-osu-black p-5 mx-0">
                <Col md={{ span: 12, offset: 0 }}>{
                    <p className="pre-wrap">
                        The Oregon State Rainbow Six team was first founded in the summer of 2019 when Ash "VonSlakken" LastName founded a collegiate summer team with Carl "Sable" Bohme and fellow OSU students Gavin "SkeDoggle" Gutowsky and Connor "SweatyCarrot" Smith as substitutes. By the fall of 2019, with the addition of Nathan "LawfulNeptune" Berres, OSU had a full roster and had its first offical team in collegiate Rainbow Six.
                        <br></br><br></br>
                        In the four years since its founding, Oregon State Rainbow Six has competed in many collegiate leagues including CR6, CEA and the Faceit league sponsored by Ubisoft.
                        <br></br><br></br>
                        The program has varied in size over the years, growing from a team of five, playing without substitutes, to three full rosters.
                    </p>
                }</Col>
            </Row>
        </>
    );
} export default About;