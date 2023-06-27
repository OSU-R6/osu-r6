import Banner from '../components/Banner'
import MiniBanner from '../components/MiniBanner'
import ErrorMessage from '../components/ErrorMessage'

import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux'
import { isloggedIn, getUser } from '../redux/selectors'
import { Navigate} from 'react-router-dom';

function Admin() {

    const loggedIn = useSelector(isloggedIn)
    const user = useSelector(getUser)

    const API = process.env.REACT_APP_API_URL

    const [ team, setTeam ] = useState("1")
    const [ isSub, setIsSub ] = useState(false)
    const [ invite, setInvite ] = useState("")
    const [ inviteError, setInviteError ] = useState(false)
    const [ activeInvites, setActiveInvites ] = useState([])
    const [ usedInvites, setUsedInvites ] = useState([])

    useEffect(() => {
        getInvites()
    }, [])

    const getInvites = async () => {
        const active = await fetch(API + '/invites/active', {
            credentials: 'include'
        })
        const activeBody = await active.json()
        setActiveInvites(activeBody)
        const inactive = await fetch(API + '/invites/inactive', {
            credentials: 'include'
        })
        const inactiveBody = await inactive.json()
        setUsedInvites(inactiveBody)
    }

    async function inviteHandler() {
        try{
            var is_sub = isSub
            if(team == "4"){
                is_sub = false
            }
            const response = await fetch(API + '/invites/', {
                method: 'POST',
                credentials: 'include',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ team_id: team, is_sub: is_sub })
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

    const copyToClipboard = (contetToCopy) => {
        navigator.clipboard.writeText(contetToCopy)
    }

    return(
        <>
            { loggedIn && user.data.admin ? (
            <>
            <Banner>Admin Panel</Banner>
            <div className='my-4 text-white text-center text-lg'>
                Use this page to manage invites, user accounts, matches and events.
            </div>

            <MiniBanner>Invites</MiniBanner>
            <div className='flex'>
                <form onSubmit={ async (e) => {
                    e.preventDefault()
                    await inviteHandler()
                }} className="flex items-center m-auto my-4">
                    <label className="text-white text-md font-bold px-2" htmlFor="role">Generate User Invite Token</label>
                    <select className="py-1 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none sm:text-sm mx-2" onChange={e => {setTeam(e.target.value)}} id="team_id" defaultValue="1" required>
                        <option value="1">Black Team</option>
                        <option value="2">Orange Team</option>
                        <option value="3">White Team</option>
                        <option value="4">Alumni</option>
                    </select>
                    { team != 4 &&
                    <>
                    <select className="py-1 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none sm:text-sm mx-2" onChange={e => {setIsSub(e.target.value)}} id="is_sub" defaultValue={false} required>
                        <option value={false}>Main Roster</option>
                        <option value={true}>Substitute</option>
                    </select>
                    </>
                    }
                    <button className="rounded-md bg-osu hover:bg-osu-dark px-10 py-1.5 text-sm font-semibold text-white shadow-sm mx-2" type="submit">Generate</button>
                    {inviteError && <ErrorMessage>Unable to Generate Invite</ErrorMessage>}
                </form>
            </div>

            { invite &&
                <div className="flex items-center justify-center mx-4 mb-4">
                    <div className="block py-1 text-white bg-gray-600 rounded px-2 break-all truncate max-w-lg">{invite}</div>
                    <button className="rounded-md px-10 py-1.5 text-sm font-semibold text-osu shadow-sm" onClick={copyToClipboard(invite)}>Copy</button>
                </div>
            }
            
            { usedInvites.length > 0 &&
            <>
            <h1 class="text-white text-center underline">Used Invites</h1>
            <table class="text-white m-auto mb-4">
                <thead>
                    <tr>
                    <th className='px-3'>Creator</th>
                    <th className='px-3'>Token</th>
                    <th className='px-3'>Team</th>
                    <th className='px-3'>Sub</th>
                    <th className='px-3'>Used By</th>
                    </tr>
                </thead>
                <tbody>
                {usedInvites.map(invite => {
                    return (
                        <tr className=''>
                            <td className='px-3'>{invite.creator_id}</td>
                            <td className='px-3 truncate max-w-sm'>{invite.token}</td>
                            <td className='px-3'>{invite.team_id}</td>
                            <td className='px-3'>{invite.is_sub ? <>True</> : <>False</>}</td>
                            <td className='px-3'>{invite.used_by_id}</td>
                        </tr>
                    )
                })}
                </tbody>
            </table>
            </>
            }

            { activeInvites.length > 0 &&
            <>
            <h1 class="text-white text-center underline">Active Invites</h1>
            <table class="text-white m-auto mb-4">
                <thead>
                    <tr>
                    <th className='px-3'>Creator</th>
                    <th className='px-3'>Token</th>
                    <th className='px-3'>Team</th>
                    <th className='px-3'>Sub</th>
                    </tr>
                </thead>
                <tbody>
                {activeInvites.map(invite => {
                    return (
                        <tr className=''>
                            <td className='px-3'>{invite.creator_id}</td>
                            <td className='px-3 truncate max-w-sm'>{invite.token}</td>
                            <td className='px-3'>{invite.team_id}</td>
                            <td className='px-3'>{invite.is_sub ? <>True</> : <>False</>}</td>
                            <td className='px-3'><button className='text-osu' onClick={() => copyToClipboard(invite.token)}>Copy</button></td>
                        </tr>
                    )
                })}
                </tbody>
            </table>
            </>
            }

            <MiniBanner>Users</MiniBanner>
            </>
            ) : ( <Navigate to='/login'/> )}
        </>
    )
} export default Admin;