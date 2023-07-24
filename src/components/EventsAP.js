import { useEffect, useState } from 'react'
import { format } from 'date-fns'
import DataTable from './DataTable'

const EventsAP = () => {

    const API = process.env.REACT_APP_API_URL

    const [ events, setEvents ] = useState([])

    useEffect(() => {
        getEvents()
    }, [])

    const getEvents = async () => { 
        try{
            const events = await fetch(API + '/events/upcoming')
            const eventsBody = await events.json()
            setEvents(eventsBody)
        } catch (err) {
            setEvents([])
        }
    }

    const eventColumns=[
        { field: 'type', headerName: 'Type', flex: 1 },
        { field: 'description', headerName: 'Description', flex: 1 },
        { field: 'date', headerName: 'Date', flex: 1, valueFormatter: (params) => format(new Date(params.value), 'MM/dd/yyyy hh:mm a')}
    ]

    return (
        <>
            <DataTable columns={eventColumns} rows={events} />
        </>
    )
} 
export default EventsAP