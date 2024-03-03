import { useEffect, useState } from 'react'
import { Navigate } from 'react-router-dom'
import DataTable from './DataTable'
import { Button } from '@mui/material'
import FormModal from './FormModal'
import ErrorMessage from './ErrorMessage'
import { BiEditAlt } from 'react-icons/bi'

const UsersAP = () => {

    const [users, setUsers] = useState([])
    const [teams, setTeams] = useState([])
    const [error, setError] = useState(false)
    const [editModal, setEditModal] = useState(false)
    const [formData, setFormData] = useState({})

    const API = process.env.REACT_APP_API_URL

    useEffect(() => {
        getUsers()
        getTeams()
    }, [])

    const getUsers = async () => {
        const usersResponse = await fetch(API + '/users/', {
            credentials: 'include'
        })
        const usersResponseBody = await usersResponse.json()
        setUsers(usersResponseBody)
    }   

    const getTeams = async () => {
        const response = await fetch(API + '/teams/all', {
            credentials: 'include'
        })
        const responseBody = await response.json()
        setTeams(responseBody)
    } 

    async function editUserHandler() {
        try{
            if(formData.type !== 'active'){
                formData.team_id = null
                formData.role = null
                formData.isSubstitute = null
            }
            const response = await fetch(API + '/users/' + formData.id, {
                method: 'PATCH',
                body: JSON.stringify({
                    team_id: formData.team_id,
                    type: formData.type,
                    role: formData.role,
                    isSubstitute: formData.isSubstitute
                }),
                credentials: 'include',
                headers: {
                    'Content-type': 'application/json',
                }
            })
            if(response.status !== 200){
                setError(true)
            } else {
                setEditModal(false)
                getUsers()
            }
        } catch {
            console.log('Error Editing User')
        }
    }

    const handleChange = (e) => {
        const { name, value } = e.target
        setFormData(prevState => ({
          ...prevState,
          [name]: value
        }))
    }

    const columns=[
        { field: 'ign', headerName: 'IGN', flex: 1 },
        { field: 'firstName', headerName: 'First Name', flex: 1 },
        { field: 'lastName', headerName: 'Last Name', flex: 1 },
        { field: 'type', headerName: 'Type', flex: 1 },
        { field: 'team', headerName: 'Team', flex: 1, valueGetter: (params) => params.row.team?.name || ''},
        { field: 'isSubstitute', headerName: 'Substitute', flex: 1},
        { field: 'role', headerName: 'Role', flex: 1 },
        {
            field: 'actions',
            headerName: 'Actions',
            flex: 1,
            renderCell: (params) => (
            <div style={{ display: 'flex', gap: '10px'}}>
                <Button variant="contained" color="osu" size="small" onClick={() => {
                    setEditModal(true),
                    setError(false),
                    setFormData(params.row)
                    }}>
                    <div className='text-black scale-150 py-1.5'><BiEditAlt /></div>
                </Button>
            </div>
            ),
        }
      ]

    return (
        <>
        <div className='m-4'>
            {users.length > 0 ?
            <div className='m-4'>
                <div className="text-white text-5xl lg:text-6xl r6-font my-2">Users</div>
                <DataTable columns={columns} rows={users} />
            </div>
            :
            <div>
                Error Retrieving User Data
            </div>
            }
        </div>
        {editModal &&
            <FormModal onClose={() => setEditModal(false)}>
                <div className='text-white text-4xl r6-font'>Edit User</div>
                    <form onSubmit={ async (e) => {
                        e.preventDefault()
                        await editUserHandler()
                    }} className="my-4 col-span-12 md:col-span-6 xl:col-span-4 2xl:col-span-3">
                        <div className='grid grid-cols-3 my-2'>
                            <label className="text-white text-md font-bold px-2 col-span-1">Status *</label>
                            <select className="col-span-2 rounded-md p-1 w-full" name="type" value={formData.type} onChange={handleChange} required>
                                <option value="">Select Option</option>
                                <option value="active">Active</option>
                                <option value="inactive">Inactive</option>
                                <option value="community">Community</option>
                                <option value="alumni">Alumni</option>
                            </select>
                        </div>
                        {formData.type === 'active' &&
                        <>
                        <div className='grid grid-cols-3 my-2'>
                            <label className="text-white text-md font-bold px-2 col-span-1">Team *</label>
                            <select className="col-span-2 rounded-md p-1 w-full" name="team_id" value={formData.team_id} onChange={handleChange} required>
                                <option value="">Select Option</option>
                                {teams.map((team) => (
                                    <option key={team.id} value={team.id}>{team.name}</option>
                                ))}
                            </select>
                        </div>
                        <div className='grid grid-cols-3 my-2'>
                            <label className="text-white text-md font-bold px-2 col-span-1">Substitute *</label>
                            <select className="col-span-2 rounded-md p-1 w-full" name="isSubstitute" value={formData.isSubstitute} onChange={handleChange} required>
                                <option value="">Select Option</option>
                                <option value={false}>Main Roster</option>
                                <option value={true}>Substitute</option>
                            </select>
                        </div>
                        <div className='grid grid-cols-3 my-2'>
                            <label className="text-white text-md font-bold px-2 col-span-1">Role *</label>
                            <select className="col-span-2 rounded-md p-1 w-full" name="role" value={formData.role} onChange={handleChange} required>
                                <option value="">Select Option</option>
                                <option value="Entry">Enrtry</option>
                                <option value="Support">Support</option>
                                <option value="Flex">Flex</option>
                            </select>
                        </div>
                        </>
                        }
                        <button className="rounded-md bg-osu hover:bg-osu-dark px-10 py-1.5 text-sm font-semibold text-white shadow-sm mt-4" type="submit">Edit</button>
                        {error && <ErrorMessage>Active players must have a team, substitute status and role.</ErrorMessage>}
                    </form>
            </FormModal>
        }
        </>
    )
} 
export default UsersAP