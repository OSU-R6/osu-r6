import * as React from 'react'
import { useEffect, useState } from 'react'
import { format } from 'date-fns'
import DataTable from './DataTable'
import { BsFillPlusCircleFill, BsFillArrowUpCircleFill } from 'react-icons/bs'
import ErrorMessage from './ErrorMessage'
import SuccessMessage from './SuccessMessage'


const MatchesAP = () => {

    const API = process.env.REACT_APP_API_URL

    const [ matches, setMatches ] = useState([])
    const [ pastMatches, setPastMatches ] = useState([])
    const [ teams, setTeams ] = useState([])
    const [ team, setTeam ] = useState(1)
    const [ date, setDate ] = useState(null)
    const [ time, setTime ] = useState(null)
    const [ opponent, setOpponent ] = useState("")
    const [ description, setDescription ] = useState(null)
    const [ stream, setStream ] = useState(null)
    const [ error, setError ] = useState(false)
    const [ success, setSuccess ] = useState(false)
    const [ matchToggle, setMatchToggle ] = useState(false)

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

    async function createMatchHandler() {
        try{
            const dateTime = new Date(date + 'T' + time)
            const sqlDateTime = format(dateTime, "yyyy-MM-dd HH:mm:ss")
            const response = await fetch(API + '/matches/', {
                method: 'POST',
                credentials: 'include',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ date: sqlDateTime, team_id: team, opponent: opponent, description: description, stream_link: stream})
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

    const matchColumns=[
        { field: 'team', headerName: 'Team', flex: 1, valueGetter: (params) => params.row.Team?.name || '' },
        { field: 'opponent', headerName: 'Opponent', flex: 1 },
        { field: 'date', headerName: 'Date', flex: 1, valueFormatter: (params) => format(new Date(params.value), 'MM/dd/yyyy hh:mm a')},
        { field: 'stream_link', headerName: 'Stream', flex: 1}
    ]

    const pastMatchColumns=[
        { field: 'team', headerName: 'Team', flex: 1, valueGetter: (params) => params.row.Team?.name || '' },
        { field: 'opponent', headerName: 'Opponent', flex: 1 },
        { field: 'description', headerName: 'Description', flex: 1, hidden: true},
        { field: 'date', headerName: 'Date', flex: 1, type: 'dateTime', valueFormatter: (params) => format(new Date(params.value), 'MM/dd/yyyy')},
        { field: 'vod_link', headerName: 'VOD', flex: 1},
        { field: 'team_score', headerName: 'OSU Score', flex: 1},
        { field: 'opponent_score', headerName: 'OP Score', flex: 1},
    ]

    const toggleMatchCreate = () => {
        setMatchToggle(!matchToggle)
        setError(false)
        setSuccess(false)
    }

    return (
        <>
            <div className='m-4 grid grid-cols-12'>
                <div className="text-white text-6xl r6-font my-2 col-span-12">
                    <div className='flex'>
                        
                        <button onClick={toggleMatchCreate} className='flex text-osu hover:text-white'>
                            <span className='mr-3'>Create Match</span>
                            <span className='scale-75'>{matchToggle ? <BsFillArrowUpCircleFill/> : <BsFillPlusCircleFill/>}</span>
                        </button>
                    </div>
                </div>
                {matchToggle &&
                <form onSubmit={ async (e) => {
                    e.preventDefault()
                    await createMatchHandler()
                }} className="my-4 col-span-12 md:col-span-6 xl:col-span-4 2xl:col-span-3">
                    <div className='grid grid-cols-3 my-2'>
                        <label className="text-white text-md font-bold px-2 col-span-1" htmlFor="match-date">Date *</label>
                        <input className='col-span-2 rounded-md p-1' type='date' id='match-date' onChange={e => {setDate(e.target.value)}} required></input>
                    </div>
                    <div className='grid grid-cols-3 my-2'>
                        <label className="text-white text-md font-bold px-2 col-span-1" htmlFor="match-date">Time *</label>
                        <input className='col-span-2 rounded-md p-1' type='time' id='match-time' onChange={e => {setTime(e.target.value)}} required></input>
                    </div>
                    <div className='grid grid-cols-3 my-2'>
                        <label className="text-white text-md font-bold px-2 col-span-1" htmlFor="match-team">Team *</label>
                        <select className="col-span-2 rounded-md p-1 w-full" id="match-team" onChange={e => {setTeam(e.target.value)}} defaultValue="1" required>
                            {teams.map((team) => (
                                <option key={team.id} value={team.id}>{team.name}</option>
                            ))}
                        </select>
                    </div>
                    <div className='grid grid-cols-3 my-2'>
                        <label className="col-span-1 text-white text-md font-bold px-2" htmlFor="match-opponent">Opponent *</label>
                        <input className='col-span-2 rounded-md p-1' type='text' placeholder='Opponent' id="match-opponent" value={opponent} onChange={e => {setOpponent(e.target.value)}} required></input>
                    </div>
                    <div className='grid grid-cols-3 my-2'>
                        <label className="col-span-1 text-white text-md font-bold px-2" htmlFor="match-description">Description</label>
                        <input className='col-span-2 rounded-md p-1' type='text' placeholder='Description' id="match-opponent" onChange={e => {setDescription(e.target.value)}} ></input>
                    </div>
                    <div className='grid grid-cols-3 my-2'>
                        <label className="col-span-1 text-white text-md font-bold px-2" htmlFor="match-description">Stream Link</label>
                        <input className='col-span-2 rounded-md p-1' type='text' placeholder='Stream Link' id="match-stream" onChange={e => {setStream(e.target.value)}} ></input>
                    </div>
                    <button className="rounded-md bg-osu hover:bg-osu-dark px-10 py-1.5 text-sm font-semibold text-white shadow-sm my-4" type="submit">Create</button>
                    {error && <ErrorMessage>Unable to Create Match</ErrorMessage>}
                    {success && <SuccessMessage>Match Created</SuccessMessage>}
                </form>
                }
            </div>
            <div className='m-4'>
                <div className="text-white text-6xl r6-font my-2">Upcoming Matches</div>
                {matches.length > 0 ?
                <DataTable columns={matchColumns} rows={matches}/>
                :
                <div className='text-white text-xl'>
                    No Upcoming Matches
                </div>
                } 
            </div>
            <div className='m-4'>
                <div className="text-white text-6xl r6-font my-2">Past Matches</div>
                {pastMatches.length > 0 ?
                <DataTable columns={pastMatchColumns} rows={pastMatches}/>
                :
                <div className='text-white text-xl'>
                    No Past Matches
                </div>
                } 
            </div>
        </>
    )
} 
export default MatchesAP