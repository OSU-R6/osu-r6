import { useEffect, useState } from 'react'
import Banner from '../components/Banner'
import PlayerCard from '../components/PlayerCard'

const Community = () => {
    const [ community, setCommunity ] = useState([])

    const API = process.env.REACT_APP_API_URL

    useEffect(() => {
        getCommunity()
    }, [])

    const getCommunity = async () => {
        const response = await fetch(API + '/users/list/community')
        const responseBody = await response.json()
        if(responseBody.length > 0){
            const roster = await Promise.all(responseBody.map(async (player) => {
                const profile = await fetch(API + '/users/' + player.ign)
                return profile.json()
            }))
            setCommunity(roster)
        }
    }

    return (
        <>
            <Banner>Community</Banner>
            {community.length > 0 &&
            <>
            <div className='grid grid-cols-12 gap-4 m-4 2xl:grid-cols-5'>
                {community.map( (player, i) => {
                        return (
                            <PlayerCard key={i} player={player} />
                        )
                })}
            </div>
            </>
            }
        </>
    )
}
export default Community;