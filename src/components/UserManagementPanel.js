import { useEffect, useState } from 'react'
import { Navigate } from 'react-router-dom'
import DataTable from './DataTable'

const UserManagementPanel = () => {

    const [users, setUsers] = useState([])

    const API = process.env.REACT_APP_API_URL

    useEffect(() => {
        getUsers()
    }, [])

    const getUsers = async () => {
        const usersResponse = await fetch(API + '/users/', {
            credentials: 'include'
        })
        const usersResponseBody = await usersResponse.json()
        setUsers(usersResponseBody)
    }   

    const columns=[
        { field: 'ign', headerName: 'IGN', flex: 1 },
        { field: 'firstName', headerName: 'First Name', flex: 1 },
        { field: 'lastName', headerName: 'Last Name', flex: 1 },
        { field: 'team', headerName: 'Team', flex: 1 },
        { field: 'is_sub', headerName: 'Sub', flex: 1, valueGetter: (params) => params.row.is_sub ? 'True' : 'False' }
      ]

    return (
        <>
        {users.length > 0 ?
            <DataTable columns={columns} rows={users} />
        :
        <div>
            Error Retrieving User Data
        </div>
        }
        </>
    )
} 
export default UserManagementPanel