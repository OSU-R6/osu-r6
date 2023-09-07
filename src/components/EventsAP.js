import { useEffect, useState } from 'react'
import { format } from 'date-fns'
import DataTable from './DataTable'
import { BsFillPlusCircleFill, BsFillArrowUpCircleFill } from 'react-icons/bs'
import ErrorMessage from './ErrorMessage'
import SuccessMessage from './SuccessMessage'

const EventsAP = () => {

    const API = process.env.REACT_APP_API_URL

    const [ upcomingEvents, setUpcomingEvents ] = useState([])
    const [ pastEvents, setPastEvents ] = useState([])
    const [ error, setError ] = useState(false)
    const [ date, setDate ] = useState(null)
    const [ time, setTime ] = useState(null)
    const [ title, setTitle ] = useState(null)
    const [ type, setType ] = useState("10-man")
    const [ description, setDescription ] = useState(null)
    const [ success, setSuccess ] = useState(false)
    const [ eventToggle, setEventToggle ] = useState(false)

    useEffect(() => {
        getEvents()
    }, [])

    const getEvents = async () => { 
        try{
            const upcomingEvents = await fetch(API + '/events/upcoming')
            const upcomingEventsBody = await upcomingEvents.json()
            setUpcomingEvents(upcomingEventsBody)
            const pastEvents = await fetch(API + '/events/past')
            const pastEventsBody = await pastEvents.json()
            setPastEvents(pastEventsBody)
        } catch (err) {
            setUpcomingEvents([])
            setPastEvents([])
        }
    }

    async function createEventHandler() {
        try{
            const dateTime = new Date(date + 'T' + time)
            const sqlDateTime = format(dateTime, "yyyy-MM-dd HH:mm:ss")
            const response = await fetch(API + '/events/', {
                method: 'POST',
                credentials: 'include',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ date: sqlDateTime, title: title, type: type, description: description})
            })
            if(response.status == 201){
                setError(false)
                setSuccess(true)
                getEvents()
            } else {
                setError(true)
                setSuccess(false)
            }
        } catch {
            setError(true)
            setSuccess(false)
        }
    }

    const eventColumns=[
        { field: 'title', headerName: 'Title', flex: 1 },
        { field: 'type', headerName: 'Type', flex: 1 },
        { field: 'description', headerName: 'Description', flex: 1 },
        { field: 'date', headerName: 'Date', flex: 1, valueFormatter: (params) => format(new Date(params.value), 'MM/dd/yyyy hh:mm a')}
    ]

    const toggleEventCreate = () => {
        setEventToggle(!eventToggle)
        setError(false)
        setSuccess(false)
    }

    return (
        <>
            <div className='m-4 grid grid-cols-12'>
                <div className="text-white text-6xl r6-font my-2 col-span-12">
                    <div className='flex'>
                        <button onClick={toggleEventCreate} className='flex text-osu hover:text-white'>
                            <span className='mr-3'>Create Event</span>
                            <span className='scale-75'>{eventToggle ? <BsFillArrowUpCircleFill/> : <BsFillPlusCircleFill/>}</span>
                        </button>
                    </div>
                </div>
                {eventToggle &&
                <form onSubmit={ async (e) => {
                    e.preventDefault()
                    await createEventHandler()
                }} className="my-4 col-span-12 md:col-span-6 xl:col-span-4 2xl:col-span-3">
                    <div className='grid grid-cols-3 my-2'>
                        <label className="text-white text-md font-bold px-2 col-span-1" htmlFor="event-date">Date *</label>
                        <input className='col-span-2 rounded-md p-1' type='date' id='event-date' onChange={e => {setDate(e.target.value)}} required></input>
                    </div>
                    <div className='grid grid-cols-3 my-2'>
                        <label className="text-white text-md font-bold px-2 col-span-1" htmlFor="event-date">Time *</label>
                        <input className='col-span-2 rounded-md p-1' type='time' id='event-time' onChange={e => {setTime(e.target.value)}} required></input>
                    </div>
                    <div className='grid grid-cols-3 my-2'>
                        <label className="col-span-1 text-white text-md font-bold px-2" htmlFor="event-title">Title *</label>
                        <input className='col-span-2 rounded-md p-1' type='text' placeholder='Title' id="event-title" onChange={e => {setTitle(e.target.value)}} required></input>
                    </div>
                    <div className='grid grid-cols-3 my-2'>
                        <label className="text-white text-md font-bold px-2 col-span-1" htmlFor="event-team">Type *</label>
                        <select className="col-span-2 rounded-md p-1 w-full" id="event-team" onChange={e => {setType(e.target.value)}} defaultValue="10-man" required>
                            <option value="10-man">10-Man</option>
                            <option value="tryout">Tryouts</option>
                            <option value="workshop">Workshop</option>
                            <option value="other">Other</option>
                        </select>
                    </div>
                    <div className='grid grid-cols-3 my-2'>
                        <label className="col-span-1 text-white text-md font-bold px-2" htmlFor="event-description">Description</label>
                        <input className='col-span-2 rounded-md p-1' type='text' placeholder='Description' id="event-description" onChange={e => {setDescription(e.target.value)}} ></input>
                    </div>
                    <button className="rounded-md bg-osu hover:bg-osu-dark px-10 py-1.5 text-sm font-semibold text-white shadow-sm my-4" type="submit">Create</button>
                    {error && <ErrorMessage>Unable to Create Event</ErrorMessage>}
                    {success && <SuccessMessage>Event Created</SuccessMessage>}
                </form>
                }
            </div>
            <div className='m-4'>
                <div className="text-white text-6xl r6-font my-2">Upcoming Events</div>
                {upcomingEvents.length > 0 ?
                <DataTable columns={eventColumns} rows={upcomingEvents} />
                :
                <div className='text-white text-xl'>
                    No Upcoming Events
                </div>
                }   
            </div>
            <div className='m-4'>
                <div className="text-white text-6xl r6-font my-2">Past Events</div>
                {pastEvents.length > 0 ?
                <DataTable columns={eventColumns} rows={pastEvents} />
                :
                <div className='text-white text-xl'>
                    No Past Events
                </div>
                } 
            </div>
        </>
    )
} 
export default EventsAP