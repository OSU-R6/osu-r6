import Banner from '../components/Banner'
import ErrorMessage from '../components/ErrorMessage'

import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux'
import { isloggedIn, getUser } from '../redux/selectors'
import { Navigate} from 'react-router-dom';

function Admin() {

    const loggedIn = useSelector(isloggedIn)
    const user = useSelector(getUser)

    const API = process.env.REACT_APP_API_URL

    const [ team, setTeam ] = useState("black")
    const [ invite, setInvite ] = useState("")
    const [ inviteError, setInviteError ] = useState(false)

    useEffect(() => {
    }, [])

    async function inviteHandler() {
        try{
            const response = await fetch(API + '/invites/', {
                method: 'POST',
                credentials: 'include',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ team: team })
            })
            if(response.status == 201){
                const responseBody = await response.json()
                setInvite(responseBody.success)
                setInviteError(false)
            } else {
                setInviteError(true)
            }
        } catch {
            setInviteError(true)
        }
    }

    const copyToClipboard = (invite) => {
        navigator.clipboard.writeText(invite)
    }

    return(
        <>
            { loggedIn && user.data.admin ? (
            <>
            <Banner>Admin Panel</Banner>

            <div>
                <form onSubmit={ async (e) => {
                    e.preventDefault()
                    await inviteHandler()
                }} className="flex items-center m-4">
                    <label className="text-white text-md font-bold px-2" htmlFor="role">Generate User Invite Token</label>
                    <select className="py-1 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none sm:text-sm mx-2" onChange={e => {setTeam(e.target.value)}} id="team" defaultValue="black" required>
                        <option value="black">Black Team</option>
                        <option value="orange">Orange Team</option>
                        <option value="alumni">Alumni</option>
                    </select>
                    <button className="rounded-md bg-osu hover:bg-osu-dark px-10 py-1.5 text-sm font-semibold text-white shadow-sm mx-2" type="submit">Generate</button>
                    {inviteError && <ErrorMessage>Unable to Generate Invite</ErrorMessage>}
                </form>
            </div>

            { invite &&
                <div className="flex items-center mx-4">
                    <div className="block py-1 text-white bg-gray-600 rounded px-2 break-all">{invite}</div>
                    <button className="rounded-md px-10 py-1.5 text-sm font-semibold text-osu shadow-sm" onClick={copyToClipboard(invite)}>Copy</button>
                </div>
            }

            </>
            ) : ( <Navigate to='/login'/> )}
        </>
    )
} export default Admin;