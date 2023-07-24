import { useEffect, useState } from 'react'
import { format } from 'date-fns'
import DataTable from './DataTable'

const MatchesAP = () => {

    const API = process.env.REACT_APP_API_URL

    const [ matches, setMatches ] = useState([])

    useEffect(() => {
        getMatches()
    }, [])

    const getMatches = async () => { 
        try{
            const matches = await fetch(API + '/matches/upcoming')
            const matchesBody = await matches.json()
            setMatches(matchesBody)
        } catch (err) {
            setMatches([])
        }
    }

    const matchColumns=[
        { field: 'team', headerName: 'Team', flex: 1, valueGetter: (params) => params.row.Team?.name || '' },
        { field: 'opponent', headerName: 'Opponent', flex: 1 },
        { field: 'date', headerName: 'Date', flex: 1, valueFormatter: (params) => format(new Date(params.value), 'MM/dd/yyyy hh:mm a')},
        { field: 'stream_link', headerName: 'Stream', flex: 1}
    ]

    return (
        <>
            <DataTable columns={matchColumns} rows={matches} />
        </>
    )
} 
export default MatchesAP