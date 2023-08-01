import { useEffect, useState } from 'react'
import { Navigate } from 'react-router-dom'
import DataTable from './DataTable'
import { BsFillPlusCircleFill, BsFillArrowUpCircleFill } from 'react-icons/bs'
import ErrorMessage from './ErrorMessage'
import SuccessMessage from './SuccessMessage'

const TeamsAP = () => {

    const [ teams, setTeams ] = useState([])
    const [ active, setActive ] = useState(false)
    const [ name, setName ] = useState(null)
    const [ error, setError ] = useState(false)
    const [ success, setSuccess ] = useState(false)
    const [ createTeamToggle, setCreateTeamToggle ] = useState(false)

    const API = process.env.REACT_APP_API_URL

    useEffect(() => {
        getTeams()
    }, [])

    const getTeams = async () => {
        const response = await fetch(API + '/teams/all', {
            credentials: 'include'
        })
        const responseBody = await response.json()
        setTeams(responseBody)
    }   

    const columns=[
        { field: 'name', headerName: 'Name', flex: 1 },
        { field: 'active', headerName: 'Active', flex: 1 },
        { field: 'captain', headerName: 'captain', flex: 1 },
        { field: 'igl', headerName: 'IGL', flex: 1 },
        { field: 'coach', headerName: 'Coach', flex: 1 }
    ]

    const createTeamHandler = async () => {
        try{
            const response = await fetch(API + '/teams/', {
                method: 'POST',
                credentials: 'include',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ name: name, active: active})
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

    const toggleTeamCreate = () => {
        setCreateTeamToggle(!createTeamToggle)
        setError(false)
        setSuccess(false)
    }

    return (
        <>
        <div className='m-4 grid grid-cols-12'>
            <div className="text-white text-6xl r6-font my-2 col-span-12">
                <div className='flex'>
                    <button onClick={toggleTeamCreate} className='flex text-osu hover:text-white'>
                        <span className='mr-3'>Create Team</span>
                        <span className='scale-75'>{createTeamToggle ? <BsFillArrowUpCircleFill/> : <BsFillPlusCircleFill/>}</span>
                    </button>
                </div>
            </div>
            {createTeamToggle &&
            <form onSubmit={ async (e) => {
                e.preventDefault()
                await createTeamHandler()
            }} className="my-4 col-span-12 md:col-span-6 xl:col-span-4 2xl:col-span-3">
                <div className='grid grid-cols-3 my-2'>
                    <label className="col-span-1 text-white text-md font-bold px-2" htmlFor="team-name">Name *</label>
                    <input className='col-span-2 rounded-md p-1' type='text' placeholder='Team Name' id="team-name" onChange={e => {setName(e.target.value)}} required></input>
                </div>
                <div className='grid grid-cols-3 my-2'>
                    <label className="text-white text-md font-bold px-2 col-span-1" htmlFor="team-status">Status *</label>
                    <select className="col-span-2 rounded-md p-1 w-full" id="team-status" onChange={e => {setActive(e.target.value)}} defaultValue={false} required>
                        <option value={false}>Inactive</option>
                        <option value={true}>Active</option>
                    </select>
                </div>
                <button className="rounded-md bg-osu hover:bg-osu-dark px-10 py-1.5 text-sm font-semibold text-white shadow-sm my-4" type="submit">Create</button>
                {error && <ErrorMessage>Unable to Create Team</ErrorMessage>}
                {success && <SuccessMessage>Team Created</SuccessMessage>}
            </form>
            }
        </div>
        {teams.length > 0 ?
        <div className='m-4'>
            <DataTable columns={columns} rows={teams} />
        </div>
        :
        <div>
            Error Retrieving Team Data
        </div>
        }
        </>
    )
} 
export default TeamsAP