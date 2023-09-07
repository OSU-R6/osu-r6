import { BsInstagram, BsTwitter, BsTwitch, BsYoutube } from 'react-icons/bs'

const Socials = ({player}) => {
    return (
        <div className='flex flex-row justify-center mt-5 text-xl'>
            {player.twitch && <div className='icon mx-3'><a href={"https://www.twitch.tv/" + player.twitch} target='_blank'><BsTwitch /></a></div>}
            {player.twitter && <div className='icon mx-3'><a href={"https://www.twitter.com/" + player.twitter} target='_blank'><BsTwitter /></a></div>}
            {player.youtube && <div className='icon mx-3'><a href={"https://www.youtube.com/@" + player.youtube} target='_blank'><BsYoutube /></a></div>}
            {player.instagram && <div className='icon mx-3'><a href={"https://www.instagram.com/" + player.instagram} target='_blank'><BsInstagram /></a></div>}
        </div>
    )
}
export default Socials