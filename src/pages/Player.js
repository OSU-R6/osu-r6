import { useParams } from 'react-router-dom'
import Banner from '../components/Banner'
import MiniBanner from '../components/MiniBanner'
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import PlayerBio from '../components/PlayerBio';
import ClipGallery from '../components/ClipGallery';
import ClipCarousel from '../components/ClipCarousel';

const API = process.env.REACT_APP_API_URL

function Player() {
    const params = useParams()
    const [player, setPlayer] = useState({})
    const [galleryKey, setGalleryKey] = useState(0)
    const [carouselKey, setCarouselKey] = useState(1)

    const navigate = useNavigate()

    useEffect(() => {
        getProfile()
    }, [])

    const getProfile = async () => {
        const profile = await fetch(API + '/users/' + params.player)
        if(profile.status != 200)
            navigate('/404')
        const profileBody = await profile.json()
        setPlayer(profileBody)
        setGalleryKey(prevKey => prevKey + 2)
        setCarouselKey(prevKey => prevKey + 2)
    }

    return (
        <>
            <Banner>{player.firstName} '{player.ign}' {player.lastName}</Banner>
            <ClipCarousel key={carouselKey} player={player}/>
            <PlayerBio player={player}/>
            <MiniBanner>CLIPS</MiniBanner>
            <ClipGallery key={galleryKey} player={player}/>
        </>
    )
}
export default Player;