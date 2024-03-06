import { useEffect, useState } from 'react'
import DataTable from './DataTable'
import { Button } from '@mui/material'
import { Link } from 'react-router-dom'


const ProspectsAP = () => {

    const [pendingProspects, setPendingProspects] = useState([])
    const [acceptedProspects, setAcceptedProspects] = useState([])
    const [rejectedProspects, setRejectedProspects] = useState([])

    const API = process.env.REACT_APP_API_URL

    async function handleButtonClick(id, status) {
        const response = await fetch(API + '/prospects/' + id, {
            method: 'PATCH',
            body: JSON.stringify({
                status: status
            }),
            credentials: 'include',
            headers: {
                'Content-type': 'application/json',
            }
        })
        getProspects()
    }

    useEffect(() => {
        getProspects()
    }, [])

    const getProspects = async () => {
        const pendingResponse = await fetch(API + '/prospects/pending', {
            credentials: 'include'
        })
        const pendingResponseBody = await pendingResponse.json()
        setPendingProspects(pendingResponseBody)
        const acceptedResponse = await fetch(API + '/prospects/accepted', {
            credentials: 'include'
        })
        const acceptedResponseBody = await acceptedResponse.json()
        setAcceptedProspects(acceptedResponseBody)
        const rejectedResponse = await fetch(API + '/prospects/rejected', {
            credentials: 'include'
        })
        const rejectedResponseBody = await rejectedResponse.json()
        setRejectedProspects(rejectedResponseBody)

    }   

    const pendingColumns=[
        { field: 'firstName', headerName: 'First Name', flex: 0 },
        { field: 'lastName', headerName: 'Last Name', flex: 0, hide: true },
        { field: 'email', headerName: 'Email', flex: 1 },
        { field: 'rank', headerName: 'Rank', flex: 1 },
        { field: 'competitiveness', headerName: 'Competitiveness', flex: 1 },
        { field: 'commitment', headerName: 'Weekly Time (hrs)', flex: 1, hide: true },
        { field: 'role', headerName: 'Role', flex: 0 },
        { field: 'uplay', headerName: 'UPlay', flex: 1, 
            renderCell: (cellValues) => {
                const url = `https://r6.tracker.network/profile/pc/${cellValues.value}`;
                return (
                    <a className="text-osu" href={url} target="_blank" rel="noopener noreferrer" style={{ textDecoration: 'none' }}>
                    {cellValues.value}
                    </a>
                );
            }
        },
        { field: 'discord', headerName: 'Discord', flex: 1 },
        { field: 'experience', headerName: 'Experience', flex: 2 },
        { field: 'type', headerName: 'Status', flex: 0, hide: true },
        { field: 'start', headerName: 'Start', flex: 0, hide: true },
        { field: 'note', headerName: 'Note', flex: 1, hidden: true },  
        {
            field: 'actions',
            headerName: 'Actions',
            flex: 2,
            renderCell: (params) => (
            <div style={{ display: 'flex', gap: '10px' }}>
                <Button variant="contained" color="success" size="small" onClick={() => handleButtonClick(params.id, 'accepted')}>
                    <div className='text-black'>Accept</div>
                </Button>
                <Button variant="contained" color="error" size="small" onClick={() => handleButtonClick(params.id, 'rejected')}>
                    <div className='text-black'>Reject</div>
                </Button>
            </div>
            ),
        },
      ]

      const columns=[
        { field: 'firstName', headerName: 'First Name', flex: 1 },
        { field: 'lastName', headerName: 'Last Name', flex: 1 },
        { field: 'email', headerName: 'Email', flex: 1},
        { field: 'rank', headerName: 'Rank', flex: 1 },
        { field: 'role', headerName: 'Role', flex: 1 },
        { field: 'uplay', headerName: 'UPlay', flex: 1, 
            renderCell: (cellValues) => {
                return (
                <Link to={`https://r6.tracker.network/profile/pc/${cellValues.id}`}>
                    {cellValues.value}
                </Link>
                );
            }
        },
        { field: 'discord', headerName: 'Discord', flex: 1 },
        { field: 'experience', headerName: 'Experience', flex: 1 },
        { field: 'start', headerName: 'Start', flex: 1},
        { field: 'note', headerName: 'Note', flex: 1 },
        {
            field: 'actions',
            headerName: 'Actions',
            flex: 1,
            renderCell: (params) => (
            <div style={{ display: 'flex', gap: '10px' }}>
                <Button variant="contained" color="osu" size="small" onClick={() => handleButtonClick(params.id, 'pending')}>
                    <div className='text-black'>Pending</div>
                </Button>
            </div>
            ),
        },
      ]

    return (
        <>
        <div className='m-4'>
            <div className="text-white xl:text-6xl text-5xl r6-font my-2">Pending Prospects</div>
            {pendingProspects.length > 0 ?
                <DataTable columns={pendingColumns} rows={pendingProspects} />
                :
                <div className='text-white text-2xl r6-font my-4'>No Pending Prospects</div>
            }
        </div>
        <div className='m-4'>
        {acceptedProspects.length > 0 &&
            <>
            <div className="text-white xl:text-6xl text-5xl r6-font my-2">Accepted Prospects</div>
            <DataTable columns={columns} rows={acceptedProspects} />
            </>
        }
        </div>
        <div className='m-4'>
        {rejectedProspects.length > 0 &&
            <>
            <div className="text-white xl:text-6xl text-5xl r6-font my-2">Rejected Prospects</div>
            <DataTable columns={columns} rows={rejectedProspects} />
            </>
        }
        </div>
        </>
    )
} 
export default ProspectsAP