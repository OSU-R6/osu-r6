import * as React from 'react'
import { useEffect, useState } from 'react'
import { format, set } from 'date-fns'
import DataTable from './DataTable'
import { BsFillPlusCircleFill, BsTrash } from 'react-icons/bs'
import { BiEditAlt } from 'react-icons/bi'
import ErrorMessage from './ErrorMessage'
import { Button } from '@mui/material'
import FormModal from './FormModal'
import Confirmation from './Confirmation'


const AnnouncementsAP = () => {

    const API = process.env.REACT_APP_API_URL

    const initialFormData = {
        title: null,
        body: null,
        team_id: null,
    }
  
    const [ announcements, setAnnouncements ] = useState([])
    const [ teams, setTeams ] = useState([])
    const [ formData, setFormData] = useState(initialFormData)
    const [ error, setError ] = useState(false)
    const [ editModal, setEditModal ] = useState(false)
    const [ createModal, setCreateModal ] = useState(false)
    const [ actionConfirmation, setActionConfirmation ] = useState(null)

    useEffect(() => {
        getAnnouncements()
        getTeams()
    }, [])

    const getAnnouncements = async () => { 
        try{
            await fetch(API + '/announcements')
                .then(response => response.json())
                .then(data => setAnnouncements(data))
        } catch (err) {
            setAnnouncements([])
        }
    }

    const getTeams = async () => {
        try{
            await fetch(API + '/teams/all', {
                credentials: 'include'
            })
            .then(response => response.json())
            .then(data => setTeams(data))
        } catch {
            setTeams([])
        }
    }  

    const announcementColumns=[
        { field: 'title', headerName: 'Title', flex: 1 },
        { field: 'body', headerName: 'Content', flex: 1 },
        { field: 'author', headerName: 'Author', flex: 1,
            renderCell: (params) => {return params.row.User.ign}
        },
        { field: 'team_id', headerName: 'Team Association', flex: 1, 
            renderCell: (params) => {
                const team = teams.find(team => team.id === params.row.team_id);
                return team ? team.name : "Unassociated"
            }
        },
        { field: 'createdAt', headerName: 'Date', flex: 1, valueFormatter: (params) => format(new Date(params.value), 'MM/dd/yyyy hh:mm a')},
        {
            field: 'actions',
            headerName: 'Actions',
            flex: 1,
            renderCell: (params) => (
            <div style={{ display: 'flex', gap: '10px'}}>
                <Button variant="contained" color="osu" size="small" onClick={() => {
                    setFormData(params.row),
                    toggleAnnouncementEdit()
                    }}>
                    <div className='text-black scale-150 py-1.5'><BiEditAlt /></div>
                </Button>,
                <Button variant="contained" color="error" size="small" onClick={() => {
                    setActionConfirmation(params.row)
                    }}>
                    <div className='text-black scale-125'><BsTrash/></div>
                </Button>
            </div>
            ),
        }
    ]

    async function createAnnouncementHandler() {
        try{
            const response = await fetch(API + '/announcements/', {
                method: 'POST',
                body: JSON.stringify(formData),
                credentials: 'include',
                headers: {
                    'Content-Type': 'application/json'
                }
            })
            if(response.status == 201){
                setError(false)
                setCreateModal(false)
                getAnnouncements()
            } else {
                setError(true)
            }
        } catch {
            setError(true)
        }
    }

    async function editAnnouncementHandler() {
        try{
            const response = await fetch(API + '/announcements/' + formData.id, {
                method: 'PATCH',
                body: JSON.stringify(formData),
                credentials: 'include',
                headers: {
                    'Content-type': 'application/json',
                }
            })
            setEditModal(false)
            getAnnouncements()
        } catch {
            setError(true)
        }
    }

    async function deleteAnnouncementHandler(id) {
        try{
            const response = await fetch(API + '/announcements/' + id, {
                method: 'DELETE',
                credentials: 'include'
            })
            getAnnouncements()
        } catch {
            setError(true)
        }
    }

    const toggleAnnouncementCreate = () => {
        setFormData(initialFormData)
        setCreateModal(!editModal)
        setError(false)
    }

    const toggleAnnouncementEdit = () => {
        setEditModal(!editModal)
        setError(false)
    }

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
                <span>Announcements</span>
                <button onClick={() => toggleAnnouncementCreate()} className='flex text-white hover:text-osu float-right'>
                    <span className=''>{<BsFillPlusCircleFill/>}</span>
                </button>
            </div>
            {announcements.length > 0 ?
                <DataTable columns={announcementColumns} rows={announcements} /> 
                :
                <div className='text-white text-2xl r6-font my-4'>No Announcements Found</div>
            }
        </div>
        {createModal &&
            <FormModal onClose={() => setCreateModal(false)} >
                <div className='text-white text-4xl r6-font'>New Announcement</div>
                <form onSubmit={ async (e) => {
                    e.preventDefault()
                    await createAnnouncementHandler()
                }} className="my-4 col-span-12 md:col-span-6 xl:col-span-4 2xl:col-span-3 announcement-form">
                    <div className='grid grid-cols-3 my-2'>
                        <label className="col-span-3 text-white text-md font-bold">Title *</label>
                        <textarea className='col-span-3 rounded-md p-1 w-full' maxlength='255' type='text' name="title" value={formData.title} onChange={handleChange} required></textarea>
                    </div>
                    <div className='grid grid-cols-3 my-2'>
                        <label className="col-span-3 text-white text-md font-bold" >Content</label>
                        <textarea className='col-span-3 rounded-md p-1' rows="15" cols="80" type='text' placeholder='Content' name="body"  value={formData.body} onChange={handleChange} ></textarea>
                    </div>
                    <div className='grid grid-cols-3 my-2'>
                        <label className="text-white text-md font-bold col-span-3">Team Association (If Applicable)</label>
                        <select className="col-span-3 rounded-md p-1 w-full" name="team_id" value={formData.team_id} onChange={handleChange}>
                            <option value=''>Select Team</option>
                            {teams.map((team) => (
                                <option key={team.id} value={team.id}>{team.name}</option>
                            ))}
                        </select>
                    </div>
                    <button className="rounded-md bg-osu hover:bg-osu-dark px-10 py-1.5 text-sm font-semibold text-white shadow-sm mt-4" type="submit">Save</button>
                    {error && <ErrorMessage>Unable to Edit Announcement</ErrorMessage>}
                </form>
            </FormModal>
        }
        {editModal &&
            <FormModal onClose={() => setEditModal(false)} >
                <div className='text-white text-4xl r6-font'>Edit Announcement</div>
                <form onSubmit={ async (e) => {
                    e.preventDefault()
                    await editAnnouncementHandler()
                }} className="my-4 col-span-12 md:col-span-6 xl:col-span-4 2xl:col-span-3 announcement-form">
                    <div className='grid grid-cols-3 my-2'>
                        <label className="col-span-3 text-white text-md font-bold">Title *</label>
                        <textarea className='col-span-3 rounded-md p-1 w-full' maxlength='255' type='text' name="title" value={formData.title} onChange={handleChange} required></textarea>
                    </div>
                    <div className='grid grid-cols-3 my-2'>
                        <label className="col-span-3 text-white text-md font-bold" >Content</label>
                        <textarea className='col-span-3 rounded-md p-1' rows="15" cols="80" type='text' placeholder='Content' name="body"  value={formData.body} onChange={handleChange} ></textarea>
                    </div>
                    <button className="rounded-md bg-osu hover:bg-osu-dark px-10 py-1.5 text-sm font-semibold text-white shadow-sm mt-4" type="submit">Save</button>
                    {error && <ErrorMessage>Unable to Edit Announcement</ErrorMessage>}
                </form>
            </FormModal>
        }
        {actionConfirmation && 
                <Confirmation 
                content={`delete announcement "${actionConfirmation.title}"`}
                onConfirm={() => {
                    deleteAnnouncementHandler(actionConfirmation.id) 
                    setActionConfirmation(null)}
                }
                onCancel={() => {setActionConfirmation(null)}}
                />
            }
        </>
    )
} 
export default AnnouncementsAP