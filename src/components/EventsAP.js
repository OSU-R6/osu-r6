import { useEffect, useState } from 'react'
import { format, set } from 'date-fns'
import DataTable from './DataTable'
import { BsFillPlusCircleFill, BsTrash } from 'react-icons/bs'
import { BiEditAlt } from 'react-icons/bi'
import ErrorMessage from './ErrorMessage'
import FormModal from './FormModal'
import Confirmation from './Confirmation'
import { Button } from '@mui/material'

const EventsAP = () => {

    const API = process.env.REACT_APP_API_URL

    const [ upcomingEvents, setUpcomingEvents ] = useState([])
    const [ pastEvents, setPastEvents ] = useState([])
    const [ error, setError ] = useState(false)
    const [ createModal, setCreateModal ] = useState(false)
    const [ editModal, setEditModal ] = useState(false)
    const [ formData, setFormData] = useState({})
    const [ actionConfirmation, setActionConfirmation] = useState(null)

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
            const dateTime = new Date(formData.date + 'T' + formData.time)
            const sqlDateTime = format(dateTime, "yyyy-MM-dd HH:mm:ss")
            const response = await fetch(API + '/events/', {
                method: 'POST',
                credentials: 'include',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ date: sqlDateTime, title: formData.title, type: formData.type, description: formData.description})
            })
            if(response.status == 201){
                setError(false)
                setCreateModal(false)
                getEvents()
            } else {
                setError(true)
            }
        } catch {
            setError(true)
        }
    }

    async function editEventHandler() {
        try{
            const dateTime = new Date(formData.date + 'T' + formData.time)
            const sqlDateTime = format(dateTime, "yyyy-MM-dd HH:mm:ss")
            formData.date = sqlDateTime
            const response = await fetch(API + '/events/' + formData.id, {
                method: 'PATCH',
                body: JSON.stringify(formData),
                credentials: 'include',
                headers: {
                    'Content-type': 'application/json',
                }
            })
            setEditModal(false)
            getEvents()
        } catch {
            console.log('Error Editing Match')
        }
    }

    async function deleteEventHandler(id) {
        try{
            const response = await fetch(API + '/events/' + id, {
                method: 'DELETE',
                credentials: 'include'
            })
            getEvents()
        } catch {
            console.log('Error Deleting Match')
        }
    }

    const eventColumns=[
        { field: 'title', headerName: 'Title', flex: 1 },
        { field: 'type', headerName: 'Type', flex: 1 },
        { field: 'description', headerName: 'Description', flex: 1 },
        { field: 'date', headerName: 'Date', flex: 1, valueFormatter: (params) => format(new Date(params.value), 'MM/dd/yyyy hh:mm a')},
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

    const handleChange = (e) => {
        const { name, value } = e.target
        setFormData(prevState => ({
          ...prevState,
          [name]: value
        }))
    }

    return (
        <>
            <div className='m-4'>
                <div className="text-white text-5xl lg:text-6xl r6-font my-2">
                    <span>Upcoming Events</span>
                    <button onClick={() => setCreateModal(true)} className='flex text-white hover:text-osu float-right'>
                        <span className=''>{<BsFillPlusCircleFill/>}</span>
                    </button>
                </div>
                {<DataTable columns={eventColumns} rows={upcomingEvents} />} 
            </div>
            <div className='m-4'>
                <div className="text-white text-6xl r6-font my-2">Past Events</div>
                {<DataTable columns={eventColumns} rows={pastEvents} />} 
            </div>
            {actionConfirmation && 
                <Confirmation 
                content={`delete event "${actionConfirmation.title}" on ${format(new Date(actionConfirmation.date), 'MM/dd/yyyy')}`}
                onConfirm={() => {
                    deleteEventHandler(actionConfirmation.id) 
                    setActionConfirmation(null)}
                }
                onCancel={() => {setActionConfirmation(null)}}
                />
            }
            { createModal &&
                <FormModal onClose={() => setCreateModal(false)}>
                    <div className='text-white text-4xl r6-font'>Add Match</div>
                    <form onSubmit={ async (e) => {
                        e.preventDefault()
                        await createEventHandler()
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
                            <label className="col-span-1 text-white text-md font-bold px-2">Title *</label>
                            <input className='col-span-2 rounded-md p-1' type='text' name="title" value={formData.title} onChange={handleChange} required></input>
                        </div>
                        <div className='grid grid-cols-3 my-2'>
                            <label className="text-white text-md font-bold px-2 col-span-1">Type *</label>
                            <select className="col-span-2 rounded-md p-1 w-full" name="type" value={formData.type} onChange={handleChange} defaultValue="10-man" required>
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
                        <button className="rounded-md bg-osu hover:bg-osu-dark px-10 py-1.5 text-sm font-semibold text-white shadow-sm mt-4" type="submit">Create</button>
                        {error && <ErrorMessage>Unable to Create Event</ErrorMessage>}
                    </form>
                </FormModal>
            }
            { editModal &&
                <FormModal onClose={() => setEditModal(false)}>
                    <div className='text-white text-4xl r6-font'>Edit Match</div>
                    <form onSubmit={ async (e) => {
                        e.preventDefault()
                        await editEventHandler()
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
                            <label className="col-span-1 text-white text-md font-bold px-2">Title *</label>
                            <input className='col-span-2 rounded-md p-1' type='text' name="title" value={formData.title} onChange={handleChange} required></input>
                        </div>
                        <div className='grid grid-cols-3 my-2'>
                            <label className="text-white text-md font-bold px-2 col-span-1">Type *</label>
                            <select className="col-span-2 rounded-md p-1 w-full" name="type" value={formData.type} onChange={handleChange} defaultValue="10-man" required>
                                <option value="10-man">10-Man</option>
                                <option value="tryout">Tryouts</option>
                                <option value="workshop">Workshop</option>
                                <option value="other">Other</option>
                            </select>
                        </div>
                        <div className='grid grid-cols-3 my-2'>
                            <label className="col-span-1 text-white text-md font-bold px-2" >Description</label>
                            <input className='col-span-2 rounded-md p-1' type='text' placeholder='Description' name="description"  value={formData.description} onChange={handleChange} ></input>
                        </div>
                        <button className="rounded-md bg-osu hover:bg-osu-dark px-10 py-1.5 text-sm font-semibold text-white shadow-sm mt-4" type="submit">Save</button>
                        {error && <ErrorMessage>Unable to Edit Event</ErrorMessage>}
                    </form>
                </FormModal>
            }
        </>
    )
} 
export default EventsAP