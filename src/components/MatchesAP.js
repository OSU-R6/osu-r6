import * as React from 'react'
import { useEffect, useState } from 'react'
import { format, set } from 'date-fns'
import DataTable from './DataTable'
import { BsFillPlusCircleFill, BsTrash } from 'react-icons/bs'
import { BiEditAlt } from 'react-icons/bi'
import ErrorMessage from './ErrorMessage'
import SuccessMessage from './SuccessMessage'
import { Button } from '@mui/material'
import FormModal from './FormModal'
import Confirmation from './Confirmation'


const MatchesAP = () => {

    const API = process.env.REACT_APP_API_URL

    const [ matches, setMatches ] = useState([])
    const [ pastMatches, setPastMatches ] = useState([])
    const [ teams, setTeams ] = useState([])
    const [ error, setError ] = useState(false)
    const [ success, setSuccess ] = useState(false)
    const [ matchToggle, setMatchToggle ] = useState(false)
    const [ editModal, setEditModal ] = useState(false)
    const [ actionConfirmation, setActionConfirmation ] = useState(null)
    const [ formData, setFormData] = useState({
        team_id: 1,
        date: null,
        time: null,
        opponent: '',
        description: '',
        stream_link: '',
        vod_link: '',
        team_score: 0,
        opponent_score: 0
      });

    useEffect(() => {
        getMatches()
        getTeams()
    }, [])

    const getMatches = async () => { 
        try{
            const matches = await fetch(API + '/matches/upcoming')
            const matchesBody = await matches.json()
            setMatches(matchesBody)
        } catch (err) {
            setMatches([])
        }
        try{
            const pastMatches = await fetch(API + '/matches/past')
            const pastMatchesBody = await pastMatches.json()
            setPastMatches(pastMatchesBody)
        }
        catch (err) {
            setPastMatches([])
        }
    }

    const getTeams = async () => {
        const response = await fetch(API + '/teams/', {
            credentials: 'include'
        })
        const responseBody = await response.json()
        setTeams(responseBody)
    }

    const handleChange = (e) => {
        const { name, value } = e.target
        setFormData(prevState => ({
          ...prevState,
          [name]: value
        }))
    }

    async function createMatchHandler() {
        try{
            const dateTime = new Date(formData.date + 'T' + formData.time)
            const sqlDateTime = format(dateTime, "yyyy-MM-dd HH:mm:ss")
            const response = await fetch(API + '/matches/', {
                method: 'POST',
                credentials: 'include',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ date: sqlDateTime, team_id: formData.team_id, opponent: formData.opponent, description: formData.description, stream_link: formData.stream_link})
            })
            if(response.status == 201){
                setError(false)
                setSuccess(true)
                getMatches()
            } else {
                setError(true)
                setSuccess(false)
            }
        } catch {
            setError(true)
            setSuccess(false)
        }
    }

    async function editMatchHandler() {
        try{
            const dateTime = new Date(formData.date + 'T' + formData.time)
            const sqlDateTime = format(dateTime, "yyyy-MM-dd HH:mm:ss")
            formData.date = sqlDateTime
            const response = await fetch(API + '/matches/' + formData.id, {
                method: 'PATCH',
                body: JSON.stringify(formData),
                credentials: 'include',
                headers: {
                    'Content-type': 'application/json',
                }
            })
            setEditModal(false)
            getMatches()
        } catch {
            console.log('Error Editing Match')
        }
    }

    async function deleteMatchHandler(id) {
        try{
            const response = await fetch(API + '/matches/' + id, {
                method: 'DELETE',
                credentials: 'include'
            })
            getMatches()
        } catch {
            console.log('Error Deleting Match')
        }
    }

    const matchColumns=[
        { field: 'team', headerName: 'Team', flex: 1, valueGetter: (params) => params.row.Team?.name || '' },
        { field: 'opponent', headerName: 'Opponent', flex: 1 },
        { field: 'date', headerName: 'Date', flex: 1, valueFormatter: (params) => format(new Date(params.value), 'MM/dd/yyyy hh:mm a')},
        { field: 'stream_link', headerName: 'Stream', flex: 1},
        {
            field: 'actions',
            headerName: 'Actions',
            flex: 1,
            renderCell: (params) => (
            <div style={{ display: 'flex', gap: '10px'}}>
                <Button variant="contained" color="osu" size="small" onClick={() => {
                    setEditModal(true),
                    params.row.time = format(new Date(params.row.date), 'HH:mm'),
                    params.row.date = format(new Date(params.row.date), 'yyyy-MM-dd'),
                    setFormData(params.row),
                    console.log(params.row)
                    }}>
                    <div className='text-black scale-150 py-1.5'><BiEditAlt /></div>
                </Button>,
                <Button variant="contained" color="error" size="small" onClick={() => {
                    console.log(params.row)
                    setActionConfirmation(params.row)
                    }}>
                    <div className='text-black scale-125'><BsTrash/></div>
                </Button>
            </div>
            ),
        }
    ]

    const pastMatchColumns=[
        { field: 'team', headerName: 'Team', flex: 1, valueGetter: (params) => params.row.Team?.name || '' },
        { field: 'opponent', headerName: 'Opponent', flex: 1 },
        { field: 'description', headerName: 'Description', flex: 1, hidden: true},
        { field: 'date', headerName: 'Date', flex: 1, type: 'dateTime', editable: true, valueFormatter: (params) => format(new Date(params.value), 'MM/dd/yyyy')},
        { field: 'vod_link', headerName: 'VOD', flex: 1, editable: true,},
        { field: 'team_score', headerName: 'OSU Score', flex: 1},
        { field: 'opponent_score', headerName: 'OP Score', flex: 1},
        {
            field: 'actions',
            headerName: 'Actions',
            flex: 1,
            renderCell: (params) => (
            <div style={{ display: 'flex', gap: '10px'}}>
                <Button variant="contained" color="osu" size="small" onClick={() => {
                    setEditModal(true),
                    params.row.time = format(new Date(params.row.date), 'HH:mm'),
                    params.row.date = format(new Date(params.row.date), 'yyyy-MM-dd'),
                    setFormData(params.row),
                    console.log(params.row)
                    }}>
                    <div className='text-black scale-150 py-1.5'><BiEditAlt /></div>
                </Button>
            </div>
            ),
        }
    ]

    const toggleMatchCreate = () => {
        setMatchToggle(!matchToggle)
        setError(false)
        setSuccess(false)
    }

    return (
        <>
            <div className='m-4'>
                <div className="text-white text-5xl lg:text-6xl r6-font my-2">
                    <span>Upcoming Matches</span>
                    <button onClick={toggleMatchCreate} className='flex text-white hover:text-osu float-right'>
                        <span className=''>{<BsFillPlusCircleFill/>}</span>
                    </button>
                </div>
                {<DataTable columns={matchColumns} rows={matches}/>} 
            </div>
            <div className='m-4'>
                <div className="text-white text-5xl lg:text-6xl r6-font my-2">Past Matches</div>
                {<DataTable columns={pastMatchColumns} rows={pastMatches}/>} 
            </div>

            {actionConfirmation && 
                <Confirmation 
                content={`delete match vs "${actionConfirmation.opponent}" on ${format(new Date(actionConfirmation.date), 'MM/dd/yyyy')}`}
                onConfirm={() => {
                    deleteMatchHandler(actionConfirmation.id) 
                    setActionConfirmation(null)}
                }
                onCancel={() => {setActionConfirmation(null)}}
                />
            }

            {matchToggle &&
            <FormModal onClose={() => setMatchToggle(false)}>
                <div className='text-white text-4xl r6-font'>Create Match</div>
                <form onSubmit={ async (e) => {
                    e.preventDefault()
                    await createMatchHandler()
                }} className="my-4 col-span-12 md:col-span-6 xl:col-span-4 2xl:col-span-3">
                    <div className='grid grid-cols-3 my-2'>
                        <label className="text-white text-md font-bold px-2 col-span-1">Date *</label>
                        <input className='col-span-2 rounded-md p-1' type='date' name='date' onChange={handleChange} required></input>
                    </div>
                    <div className='grid grid-cols-3 my-2'>
                        <label className="text-white text-md font-bold px-2 col-span-1">Time *</label>
                        <input className='col-span-2 rounded-md p-1' type='time' name='time' onChange={handleChange} required></input>
                    </div>
                    <div className='grid grid-cols-3 my-2'>
                        <label className="text-white text-md font-bold px-2 col-span-1">Team *</label>
                        <select className="col-span-2 rounded-md p-1 w-full" name="team_id" value={formData.team_id} onChange={handleChange} required>
                            {teams.map((team) => (
                                <option key={team.id} value={team.id}>{team.name}</option>
                            ))}
                        </select>
                    </div>
                    <div className='grid grid-cols-3 my-2'>
                        <label className="col-span-1 text-white text-md font-bold px-2">Opponent *</label>
                        <input className='col-span-2 rounded-md p-1' type='text' placeholder='Opponent' name="opponent" value={formData.opponent} onChange={handleChange} required></input>
                    </div>
                    <div className='grid grid-cols-3 my-2'>
                        <label className="col-span-1 text-white text-md font-bold px-2">Description</label>
                        <input className='col-span-2 rounded-md p-1' type='text' placeholder='Description' name="description" value={formData.description} onChange={handleChange} ></input>
                    </div>
                    <div className='grid grid-cols-3 my-2'>
                        <label className="col-span-1 text-white text-md font-bold px-2">Stream Link</label>
                        <input className='col-span-2 rounded-md p-1' type='text' placeholder='Stream Link' name="stream_link" value={formData.stream_link} onChange={handleChange} ></input>
                    </div>
                    <button className="rounded-md bg-osu hover:bg-osu-dark px-10 py-1.5 text-sm font-semibold text-white shadow-sm mt-4" type="submit">Create</button>
                    {error && <ErrorMessage>Unable to Create Match</ErrorMessage>}
                    {success && <SuccessMessage>Match Created</SuccessMessage>}
                </form>
            </FormModal>
            }

            { editModal &&
                <FormModal onClose={() => setEditModal(false)}>
                    <div className='text-white text-4xl r6-font'>Edit Match</div>
                    <form onSubmit={ async (e) => {
                        e.preventDefault()
                        await editMatchHandler()
                    }} className="my-4 col-span-12 md:col-span-6 xl:col-span-4 2xl:col-span-3">
                        <div className='grid grid-cols-3 my-2'>
                            <label className="text-white text-md font-bold px-2 col-span-1">Date *</label>
                            <input className='col-span-2 rounded-md p-1' type='date' name='date' value={formData.date} onChange={handleChange} required></input>
                        </div>
                        <div className='grid grid-cols-3 my-2'>
                            <label className="text-white text-md font-bold px-2 col-span-1">Time *</label>
                            <input className='col-span-2 rounded-md p-1' type='time' name='time' value={formData.time} onChange={handleChange} required></input>
                        </div>
                        <div className='grid grid-cols-3 my-2'>
                            <label className="text-white text-md font-bold px-2 col-span-1">Team *</label>
                            <select className="col-span-2 rounded-md p-1 w-full" name='team_id' value={formData.team_id} onChange={handleChange} required>
                                {teams.map((team) => (
                                    <option key={team.id} value={team.id}>{team.name}</option>
                                ))}
                            </select>
                        </div>
                        <div className='grid grid-cols-3 my-2'>
                            <label className="col-span-1 text-white text-md font-bold px-2">Opponent *</label>
                            <input className='col-span-2 rounded-md p-1' type='text' placeholder='Opponent' name='opponent' value={formData.opponent} onChange={handleChange} required></input>
                        </div>
                        <div className='grid grid-cols-3 my-2'>
                            <label className="col-span-1 text-white text-md font-bold px-2">Description</label>
                            <input className='col-span-2 rounded-md p-1' type='text' placeholder='Description' name='description' value={formData.description} onChange={handleChange} ></input>
                        </div>
                        <div className='grid grid-cols-3 my-2'>
                            <label className="col-span-1 text-white text-md font-bold px-2">Stream Link</label>
                            <input className='col-span-2 rounded-md p-1' type='text' placeholder='Stream Link' name='stream_link' value={formData.stream_link} onChange={handleChange} ></input>
                        </div>
                        <div className='grid grid-cols-3 my-2'>
                            <label className="col-span-1 text-white text-md font-bold px-2">VOD Link</label>
                            <input className='col-span-2 rounded-md p-1' type='text' placeholder='Vod Link' name='vod_link' value={formData.vod_link} onChange={handleChange} ></input>
                        </div>
                        <div className='grid grid-cols-3 my-2'>
                            <label className="col-span-1 text-white text-md font-bold px-2">Team Score</label>
                            <input className='col-span-2 rounded-md p-1' type='text' placeholder='Team Score' name='team_score' value={formData.team_score} onChange={handleChange} ></input>
                        </div>
                        <div className='grid grid-cols-3 my-2'>
                            <label className="col-span-1 text-white text-md font-bold px-2">Opponent Score</label>
                            <input className='col-span-2 rounded-md p-1' type='text' placeholder='Opponent Score' name='opponent_score' value={formData.opponent_score} onChange={handleChange} ></input>
                        </div>            
                        <button className="rounded-md bg-osu hover:bg-osu-dark px-10 py-1.5 text-sm font-semibold text-white shadow-sm mt-4" type="submit">Update</button>
                        {success && 
                            <button className="rounded-md bg-osu hover:bg-osu-dark px-10 py-1.5 text-sm font-semibold text-white shadow-sm mt-4 float-right" onClick={e => {
                                setEditModal(false),
                                setSuccess(false),
                                setError(false)                            
                            }}>Close</button>
                        }
                        {error && <ErrorMessage>Unable to Edit Match</ErrorMessage>}
                        {success && <SuccessMessage>Match Edited</SuccessMessage>}
                    </form>
                </FormModal>
            }
        </>
    )
} 
export default MatchesAP