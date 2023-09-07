import { useEffect, useState } from 'react'
import { IconButton, Tooltip } from '@mui/material'
import FileCopyIcon from '@mui/icons-material/FileCopy'
import DataTable from './DataTable'
import ErrorMessage from './ErrorMessage'

const InvitesAP = () => {

    const API = process.env.REACT_APP_API_URL

    const [ team, setTeam ] = useState("1")
    const [ type, setType ] = useState("active")
    const [ invite, setInvite ] = useState("")
    const [ inviteError, setInviteError ] = useState(false)
    const [ activeInvites, setActiveInvites ] = useState([])
    const [ usedInvites, setUsedInvites ] = useState([])
    const [ teams, setTeams ] = useState([])

    useEffect(() => {
        getInvites()
        getTeams()
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

    const getTeams = async () => {
        const response = await fetch(API + '/teams/all', {
            credentials: 'include'
        })
        const responseBody = await response.json()
        setTeams(responseBody)
    }

    async function inviteHandler() {
        try{
            const response = await fetch(API + '/invites/', {
                method: 'POST',
                credentials: 'include',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ type: type, team_id: team})
            })
            if(response.status == 201){
                const responseBody = await response.json()
                setInvite(responseBody.success)
                setInviteError(false)
                getInvites()
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

    const activeColumns = [
        { field: 'creator', headerName: 'Creator', flex: 2, valueGetter: (params) => params.row.inviter?.ign || '' },
        { field: 'token', headerName: 'Token', flex: 3 },
        { field: 'type', headerName: 'Type', flex: 1 },
        { field: 'team', headerName: 'Team', flex: 2, valueGetter: (params) => params.row.team?.name || '' },
        {
            field: 'copy',
            headerName: 'Copy Token',
            flex: 1,
            renderCell: (params) => (
              <Tooltip title="Copy">
                <IconButton size="small" onClick={() => copyToClipboard(params.row.token)}>
                  <FileCopyIcon />
                </IconButton>
              </Tooltip>
            )
        }
    ]

    const inactiveColumns = [
        { field: 'creator', headerName: 'Creator', flex: 2, valueGetter: (params) => params.row.inviter?.ign || '' },
        { field: 'type', headerName: 'Type', flex: 1 },
        { field: 'team', headerName: 'Team', flex: 2, valueGetter: (params) => params.row.team?.name || '' },
        { field: 'used_by', headerName: 'Used By', flex: 2, valueGetter: (params) => params.row.invitee?.ign || '' }
    ]

    return (
        <>
        <div className='flex my-4'>
            <form onSubmit={ async (e) => {
                e.preventDefault()
                await inviteHandler()
            }} className="flex items-center m-auto my-4">
                <label className="text-white text-md font-bold px-2" htmlFor="role">Generate User Invite Token</label>
                <select className="py-1 px-3 bg-black text-white rounded-md shadow-sm focus:outline-none sm:text-sm mx-2 invite-team-select" onChange={e => {setType(e.target.value)}} id="invite_type" defaultValue="active" required>
                    <option value="active">Active Player</option>
                    <option value="inactive">Comp Veteran</option>
                    <option value="community">Community Member</option>
                    <option value="alumni">Alumni</option>
                </select>
                { type == 'active' &&
                <select className="py-1 px-3 bg-black text-white rounded-md shadow-sm focus:outline-none sm:text-sm mx-2 invite-team-select" onChange={e => {setTeam(e.target.value)}} id="invite_team_id" defaultValue="1" required>
                    {teams.map((team) => (
                        <option key={team.id} value={team.id}>{team.name}</option>
                    ))}
                </select>
                }
                <button className="rounded-md bg-osu hover:bg-osu-dark px-10 py-1.5 text-sm font-semibold text-white shadow-sm mx-2" type="submit">Generate</button>
                {inviteError && <ErrorMessage>Unable to Generate Invite</ErrorMessage>}
            </form>
        </div>

        { invite &&
            <div className="flex items-center justify-center my-4">
                <div className="block py-1 text-white bg-gray-600 rounded px-2 break-all truncate max-w-lg">{invite}</div>
                <button className="rounded-md px-10 py-1.5 text-sm font-semibold text-osu shadow-sm" onClick={copyToClipboard(invite)}>Copy</button>
            </div>
        }

        { activeInvites.length > 0 &&
        <>
        <div className='my-4'>
            <div className="text-white text-center text-6xl r6-font">Active Invites</div>
            <DataTable columns={activeColumns} rows={activeInvites} />
        </div>
        </>
        }
        
        { usedInvites.length > 0 &&
        <>
        <div className='my-4'>
            <div className="text-white text-center text-6xl r6-font">Used Invites</div>
            <DataTable columns={inactiveColumns} rows={usedInvites} />
        </div>
        </>
        }
        </>
    )
} 
export default InvitesAP