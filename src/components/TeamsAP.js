import { useEffect, useState } from 'react'
import { Navigate } from 'react-router-dom'
import DataTable from './DataTable'
import { BsFillPlusCircleFill} from 'react-icons/bs'
import { BiEditAlt } from 'react-icons/bi'
import ErrorMessage from './ErrorMessage'
import SuccessMessage from './SuccessMessage'
import FormModal from './FormModal'
import { Button } from '@mui/material'

const TeamsAP = () => {

    const [ teams, setTeams ] = useState([])
    const [ users, setUsers ] = useState([])
    const [ error, setError ] = useState(false)
    const [ success, setSuccess ] = useState(false)
    const [ createTeamToggle, setCreateTeamToggle ] = useState(false)
    const [ editModal, setEditModal ] = useState(false)
    const [ formData, setFormData ] = useState({
        name: '',
        active: false,
        captain_id: 0,
        igl_id: 0,
        coach_id: 0
      })

    const API = process.env.REACT_APP_API_URL

    useEffect(() => {
        getTeams()
        getUsers()
    }, [])

    const getTeams = async () => {
        const response = await fetch(API + '/teams/all', {
            credentials: 'include'
        })
        const responseBody = await response.json()
        setTeams(responseBody)
    }   

    const getUsers = async () => {
        const usersResponse = await fetch(API + '/users/', {
            credentials: 'include'
        })
        const usersResponseBody = await usersResponse.json()
        setUsers(usersResponseBody)
    }   

    const handleChange = (e) => {
        const { name, value } = e.target
        if (value === '0') {
            setFormData(prevState => ({
              ...prevState,
              [name]: null
            }));
        } else {
            setFormData(prevState => ({
                ...prevState,
                [name]: value
            }))
        }
    }

    const columns=[
        { field: 'name', headerName: 'Name', flex: 1 },
        { field: 'active', headerName: 'Active', flex: 1 },
        { field: 'captain', headerName: 'captain', flex: 1,
        renderCell: (params) => {
            const captain = users.find(user => user.id === params.row.captain_id);
            return captain ? captain.ign : "Not Assigned"
        }},
        { field: 'igl', headerName: 'IGL', flex: 1,
        renderCell: (params) => {
            const igl = users.find(user => user.id === params.row.igl_id);
            return igl ? igl.ign : "Not Assigned"
        }},
        { field: 'coach', headerName: 'Coach', flex: 1,
        renderCell: (params) => {
            const coach = users.find(user => user.id === params.row.coach_id);
            return coach ? coach.ign : "Not Assigned"
        }},
        {
            field: 'actions',
            headerName: 'Actions',
            flex: 1,
            renderCell: (params) => (
            <div style={{ display: 'flex', gap: '10px'}}>
                <Button variant="contained" color="osu" size="small" onClick={() => {
                    setEditModal(true),
                    setFormData(params.row)
                    }}>
                    <div className='text-black scale-150 py-1.5'><BiEditAlt /></div>
                </Button>
            </div>
            ),
        }
    ]

    const createTeamHandler = async () => {
        try{
            const response = await fetch(API + '/teams/', {
                method: 'POST',
                credentials: 'include',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ name: formData.name, active: formData.active})
            })
            if(response.status == 201){
                setError(false)
                setSuccess(true)
                getTeams()
            } else {
                setError(true)
                setSuccess(false)
            }
        } catch {
            setError(true)
            setSuccess(false)
        }
    }

    async function editTeamHandler(id) {
        try{
            const response = await fetch(API + '/teams/' + id, {
                method: 'PATCH',
                body: JSON.stringify(formData),
                credentials: 'include',
                headers: {
                    'Content-type': 'application/json',
                }
            })
            getTeams()
        } catch {
            console.log('Error Editing Match')
        }
    }

    const toggleTeamCreate = () => {
        setCreateTeamToggle(!createTeamToggle)
        setError(false)
        setSuccess(false)
    }

    return (
        <>
        {teams.length > 0 ?
        <div className='m-4'>
            <div className="text-white text-5xl lg:text-6xl r6-font my-2">
                <span>Teams</span>
                <button onClick={toggleTeamCreate} className='flex text-white hover:text-osu float-right'>
                    <span className=''>{<BsFillPlusCircleFill/>}</span>
                </button>
                </div>
            <DataTable columns={columns} rows={teams} />
        </div>
        :
        <div>
            Error Retrieving Team Data
        </div>
        }
        {createTeamToggle &&
            <FormModal onClose={toggleTeamCreate}>
                <div className='text-white text-4xl r6-font'>Create Team</div>
                <form onSubmit={ async (e) => {
                    e.preventDefault()
                    await createTeamHandler()
                }} className="my-4 col-span-12 md:col-span-6 xl:col-span-4 2xl:col-span-3">
                    <div className='grid grid-cols-3 my-2'>
                        <label className="col-span-1 text-white text-md font-bold px-2">Name *</label>
                        <input className='col-span-2 rounded-md p-1' type='text' placeholder='Team Name' name="name" value={formData.name} onChange={handleChange} required></input>
                    </div>
                    <div className='grid grid-cols-3 my-2'>
                        <label className="text-white text-md font-bold px-2 col-span-1">Status *</label>
                        <select className="col-span-2 rounded-md p-1 w-full" name="active" value={formData.active} onChange={handleChange} required>
                            <option value={false}>Inactive</option>
                            <option value={true}>Active</option>
                        </select>
                    </div>
                    <button className="rounded-md bg-osu hover:bg-osu-dark px-10 py-1.5 text-sm font-semibold text-white shadow-sm mt-4" type="submit">Create</button>
                    {error && <ErrorMessage>Unable to Create Team</ErrorMessage>}
                    {success && <SuccessMessage>Team Created</SuccessMessage>}
                </form>
            </FormModal>
        }
        { editModal &&
            <FormModal onClose={() => setEditModal(false)}>
                <div className='text-white text-4xl r6-font'>Edit Team</div>
                <form onSubmit={ async (e) => {
                    e.preventDefault()
                    await editTeamHandler(formData.id)
                }} className="my-4 col-span-12 md:col-span-6 xl:col-span-4 2xl:col-span-3">
                    <div className='grid grid-cols-3 my-2'>
                        <label className="col-span-1 text-white text-md font-bold px-2">Name *</label>
                        <input className='col-span-2 rounded-md p-1' type='text' placeholder='Team Name' name="name" value={formData.name} onChange={handleChange} required></input>
                    </div>
                    <div className='grid grid-cols-3 my-2'>
                        <label className="text-white text-md font-bold px-2 col-span-1">Status *</label>
                        <select className="col-span-2 rounded-md p-1 w-full" name="active" value={formData.active} onChange={handleChange} required>
                            <option value={false}>Inactive</option>
                            <option value={true}>Active</option>
                        </select>
                    </div>
                    <div className='grid grid-cols-3 my-2'>
                        <label className="text-white text-md font-bold px-2 col-span-1">Captain</label>
                        <select className="col-span-2 rounded-md p-1 w-full" name='captain_id' value={formData.captain_id} onChange={handleChange}>
                            <option key='0' value='0'>Not Assigned</option>
                            {users.filter(user => user.team_id === formData.id).map((user) => (
                                <option key={user.id} value={user.id}>{user.ign}</option>
                            ))}
                        </select>
                    </div>
                    <div className='grid grid-cols-3 my-2'>
                        <label className="text-white text-md font-bold px-2 col-span-1">IGL</label>
                        <select className="col-span-2 rounded-md p-1 w-full" name='igl_id' value={formData.igl_id} onChange={handleChange}>
                            <option key='0' value='0'>Not Assigned</option>
                            {users.filter(user => user.team_id === formData.id).map((user) => (
                                <option key={user.id} value={user.id}>{user.ign}</option>
                            ))}
                        </select>
                    </div>
                    <div className='grid grid-cols-3 my-2'>
                        <label className="text-white text-md font-bold px-2 col-span-1">Coach</label>
                        <select className="col-span-2 rounded-md p-1 w-full" name='coach_id' value={formData.coach_id} onChange={handleChange}>
                            <option key='0' value='0'>Not Assigned</option>
                            {users.map((user) => (
                                <option key={user.id} value={user.id}>{user.ign}</option>
                            ))}
                        </select>
                    </div>
                    <button className="rounded-md bg-osu hover:bg-osu-dark px-10 py-1.5 text-sm font-semibold text-white shadow-sm mt-4" type="submit">Save</button>
                    {error && <ErrorMessage>Unable to Update Team</ErrorMessage>}
                    {success && <SuccessMessage>Changes Saved</SuccessMessage>}
                </form>
            </FormModal>
        }
        </>
    )
} 
export default TeamsAP