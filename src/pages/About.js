import Banner from '../components/Banner'

function About() {
    return(
        <>
            <Banner>OSU R6</Banner>
            
            <img className="bannerImage" src="\images\AlumTeam.png"/>
            
            <div className="flex justify-center items-center text-white bg-osu-black py-5 bio">
                <div className="w-full">
                    <div className="r6-font">
                        The Oregon State Rainbow Six team was first founded in the summer of 2019 when Ash "VonSlakken" QuakeLord founded a collegiate summer team with Carl "Sable" Bohme and fellow OSU students Gavin "SkeDoggle" Gutowsky and Connor "SweatyCarrot" Smith as substitutes. By the fall of 2019, with the addition of Nathan "LawfulNeptune" Berres, OSU had a full roster and had its first offical team in collegiate Rainbow Six.
                        <br></br><br></br>
                        In the four years since its founding, Oregon State Rainbow Six has competed in many collegiate leagues including CR6, CEA and the Faceit league sponsored by Ubisoft.
                        <br></br><br></br>
                        The program has varied in size over the years, growing from a team of five, playing without substitutes, to three full rosters.
                    </div>
                </div>
            </div>
        </>
    );
} export default About;