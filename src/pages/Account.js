import Banner from '../components/Banner'
import { useEffect, useState } from 'react'
import { Navigate, useNavigate } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { isloggedIn, getUser } from '../redux/selectors'
import ManageSocials from '../components/ManageSocials'
import ManageProfile from '../components/ManageProfile'
import MangeClips from '../components/ManageClips'

const API = process.env.REACT_APP_API_URL

function Account() {

    const [clips, setClips] = useState([])
    const [ player, setPlayer] = useState({})
    
    const loggedIn = useSelector(isloggedIn)
    const user = useSelector(getUser)

    useEffect(() => {
        getProfile()
    }, [user])

    const getProfile = async () => {
        try{
            const profile = await fetch(API + '/users/' + user.data.ign)
            setPlayer(await profile.json())
            const response = await fetch(API + '/users/' + user.data.ign + '/clips', {
                credentials: 'include'
            })
            const responseBody = await response.json()
            setClips(responseBody.clips)
        } catch {
            setClips([])
        }
    }

    return(
        <>
            {loggedIn ? (
                <>
                    <Banner>{user.data.firstName} '{user.data.ign}' {user.data.lastName}</Banner>
                    
                    <ManageProfile player={player} getProfile={getProfile}/>

                    <ManageSocials player={player} getProfile={getProfile}/>

                    <MangeClips clips={clips} getProfile={getProfile}/>
                </>
            ) : ( <Navigate to='/login'/> )}
        </>
    )
} export default Account;