import { useEffect, useState } from 'react'
import { Navigate } from 'react-router-dom'
import DataTable from './DataTable'

const TeamsAP = () => {

    const [teams, setTeams] = useState([])

    const API = process.env.REACT_APP_API_URL

    useEffect(() => {
        getTeams()
    }, [])

    const getTeams = async () => {
        const response = await fetch(API + '/teams/', {
            credentials: 'include'
        })
        const responseBody = await response.json()
        setTeams(responseBody)
    }   

    const columns=[
        { field: 'name', headerName: 'Name', flex: 1 },
        { field: 'captain', headerName: 'captain', flex: 1 },
        { field: 'igl', headerName: 'IGL', flex: 1 },
        { field: 'coach', headerName: 'Coach', flex: 1 }
      ]

    return (
        <>
        {teams.length > 0 ?
            <DataTable columns={columns} rows={teams} />
        :
        <div>
            Error Retrieving Team Data
        </div>
        }
        </>
    )
} 
export default TeamsAP