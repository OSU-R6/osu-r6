import { useEffect, useState } from 'react'
import DataTable from './DataTable'
import { Button } from '@mui/material'
import { Link } from 'react-router-dom'
import FormModal from './FormModal'


const ProspectsAP = () => {

    const [pendingProspects, setPendingProspects] = useState([])
    const [acceptedProspects, setAcceptedProspects] = useState([])
    const [rejectedProspects, setRejectedProspects] = useState([])
    const [ viewModal, setViewModal ] = useState(false)
    const [ data, setData] = useState({})

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
        { field: 'uplay', headerName: 'UPlay', flex: 0, 
            renderCell: (cellValues) => {
                const url = `https://r6.tracker.network/profile/pc/${cellValues.value}`;
                return (
                    <a className="text-osu" href={url} target="_blank" rel="noopener noreferrer" style={{ textDecoration: 'none' }}>
                    {cellValues.value}
                    </a>
                );
            }
        },
        { field: 'discord', headerName: 'Discord', flex: 0 },
        {
            field: 'actions',
            headerName: 'Actions',
            flex: 2,
            renderCell: (params) => (
            <div style={{ display: 'flex', gap: '10px' }}>
                <Button variant="contained" color="osu" size="small" onClick={() => {
                    setData(params.row),
                    setViewModal(true)
                    }}>
                    <div className='text-black'>View</div>
                </Button>
                <Button variant="contained" color="success" size="small" onClick={() => handleButtonClick(params.id, 'accepted')}>
                    <div className='text-black'>Accept</div>
                </Button>
                <Button variant="contained" color="error" size="small" onClick={() => handleButtonClick(params.id, 'rejected')}>
                    <div className='text-black'>Reject</div>
                </Button>
            </div>
            ),
        }
      ]

      const columns=[
        { field: 'firstName', headerName: 'First Name', flex: 0 },
        { field: 'lastName', headerName: 'Last Name', flex: 0 },
        { field: 'uplay', headerName: 'UPlay', flex: 0, 
            renderCell: (cellValues) => {
                return (
                <Link to={`https://r6.tracker.network/profile/pc/${cellValues.id}`}>
                    {cellValues.value}
                </Link>
                );
            }
        },
        { field: 'discord', headerName: 'Discord', flex: 0 },
        {
            field: 'actions',
            headerName: 'Actions',
            flex: 2,
            renderCell: (params) => (
            <div style={{ display: 'flex', gap: '10px' }}>
                <Button variant="contained" color="osu" size="small" onClick={() => {
                    setData(params.row),
                    setViewModal(true)
                    }}>
                    <div className='text-black'>View</div>
                </Button>
                <Button variant="contained" color="osu" size="small" onClick={() => handleButtonClick(params.id, 'pending')}>
                    <div className='text-black'>Re-Open</div>
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
        {viewModal &&
            <FormModal onClose={() => setViewModal(false)} >
                <div className='text-white text-4xl r6-font'>Prospect Overview</div>
                <div className='text-white text-lg'>
                    <div className='flex'>
                        <div className='font-bold mr-2 text-xl text-osu'>Name:</div>
                        {data.firstName} {data.lastName}
                    </div>
                    <div className='flex'>
                        <div className='font-bold mr-2 text-xl text-osu'>Experience:</div>
                        {data.experience}
                    </div>
                    <div className='flex'>
                        <div className='font-bold mr-2 text-xl text-osu'>Notes:</div>
                        {data.notes}
                    </div>
                    <div className='flex'>
                        <div className='font-bold mr-2 text-xl text-osu'>Rank:</div>
                        {data.rank}
                    </div>
                    <div className='flex'>
                        <div className='font-bold mr-2 text-xl text-osu'>Competitiveness:</div>
                        {data.competitiveness}
                    </div>
                    <div className='flex'>
                        <div className='font-bold mr-2 text-xl text-osu'>Role:</div>
                        {data.role}
                    </div>
                    <div className='flex'>
                        <div className='font-bold mr-2 text-xl text-osu'>Commitment:</div>
                        {data.commitment}
                    </div>
                    <div className='flex'>
                        <div className='font-bold mr-2 text-xl text-osu'>Type:</div>
                        {data.type}
                    </div>
                    <div className='flex'>
                        <div className='font-bold mr-2 text-xl text-osu'>Start:</div>
                        {data.start}
                    </div>
                    <div className='flex'>
                        <div className='font-bold mr-2 text-xl text-osu'>Dsicord:</div>
                        {data.discord}
                    </div>
                    <div className='flex'>
                        <div className='font-bold mr-2 text-xl text-osu'>Email:</div>
                        {data.email}
                    </div>
                </div>
                
            </FormModal>
        }
        </>
    )
} 
export default ProspectsAP