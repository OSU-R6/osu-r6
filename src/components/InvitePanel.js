import { useEffect, useState } from 'react'
import { IconButton, Tooltip } from '@mui/material'
import FileCopyIcon from '@mui/icons-material/FileCopy'
import DataTable from './DataTable'

const InvitePanel = () => {

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
        { field: 'creator', headerName: 'Creator', flex: 1, valueGetter: (params) => params.row.Creator?.ign || '' },
        { field: 'token', headerName: 'Token', flex: 1 },
        { field: 'team', headerName: 'Team', flex: 1, valueGetter: (params) => params.row.Team?.name || '' },
        { field: 'is_sub', headerName: 'Sub', flex: 1, renderCell: (params) => params.value ? 'True' : 'False' },
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
        { field: 'creator', headerName: 'Creator', flex: 1, valueGetter: (params) => params.row.Creator?.ign || '' },
        { field: 'team', headerName: 'Team', flex: 1, valueGetter: (params) => params.row.Team?.name || '' },
        { field: 'is_sub', headerName: 'Sub', flex: 1, renderCell: (params) => params.value ? 'True' : 'False' },
        { field: 'used_by', headerName: 'Used By', flex: 1, valueGetter: (params) => params.row.InvitedUser?.ign || '' }
    ]

    return (
        <>
        <div className="text-white text-center text-6xl r6-font">Generate Invites</div>
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
            <div className='m-4'>
                <div className="text-white text-center text-6xl r6-font">Used Invites</div>
                <DataTable columns={inactiveColumns} rows={usedInvites} />
            </div>
            </>
            }

            { activeInvites.length > 0 &&
            <>
            <div className='m-4'>
                <div className="text-white text-center text-6xl r6-font">Active Invites</div>
                <DataTable columns={activeColumns} rows={activeInvites} />
            </div>
            </>
            }
        </>
    )
} 
export default InvitePanel