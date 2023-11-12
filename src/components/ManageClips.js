import React, { useState, useEffect } from 'react'
import { BsPlusCircle, BsTrash, BsLock, BsUnlock, BsStar, BsStarFill, BsXLg} from 'react-icons/bs'
import { BiEditAlt } from 'react-icons/bi'
import MiniBanner from '../components/MiniBanner'
import ErrorMessage from '../components/ErrorMessage'
import SuccessMessage from '../components/SuccessMessage'
import Confirmation from '../components/Confirmation'
import { set } from 'date-fns'


const ManageClips = (props) => {

    const API = process.env.REACT_APP_API_URL

    const [ serverError, setServerError ] = useState(false)
    const [ titleMissingError, setTitleMissingError ] = useState(false)
    const [ uploadError, setUploadError ] = useState(false)
    
    const [ clipUploadToggle, setClipUploadToggle ] = useState(false)
    const [ compressing, setCompressing ] = useState(false)

    const [ uploadTitle, setUploadTitle ] = useState('')
    const [ upload, setUpload ] = useState(null)
    const [ updateTitle, setUpdateTitle ] = useState()

    const [ actionConfirmation, setActionConfirmation ] = useState(null)

    const inputStyle = 'appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
    const inputErrorStyle = 'appearance-none border-2 border-red-500 rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'

    const publicStyle = 'rounded-md bg-transparent px-2.5 py-2.5 text-xl font-semibold text-green-500 hover:text-red-500 shadow-sm '
    const privateStyle = 'rounded-md bg-transparent px-2.5 py-2.5 text-xl font-semibold text-red-500 hover:text-green-500 shadow-sm'

    const spotlightStyle = 'rounded-md bg-transparent px-2.5 py-2.5 text-xl font-semibold text-osu shadow-sm'
    const notSpotlightStyle = 'rounded-md bg-transparent px-2.5 py-2.5 text-xl font-semibold text-osu hover:text-white shadow-sm'

    useEffect(() => {
        setUploadError(false)
    }, [clipUploadToggle])

    async function uploadHandler(e){
        if(uploadTitle == '') {
            setTitleMissingError(true)
            return
        } else {
            setTitleMissingError(false)
        }
        if(upload == null) {
            setUploadError(true)
            return
        } else {
            setUploadError(false)
        }
        if(!uploadError && !titleMissingError) {
            setCompressing(true)
            const formData = new FormData(e.target);
            const response = await fetch(API + '/clips/', {
                method: 'POST',
                credentials: 'include',
                body: formData
            })
            switch(response.status){
                case 500: {
                    setServerError(true)
                    setCompressing(false)
                    break
                }
                case 400: {
                    setUploadError(true)
                    setCompressing(false)
                    break
                }
                case 201: {
                    setUploadError(false)
                    setCompressing(false)
                    setClipUploadToggle(false)
                    setUploadTitle('')
                    props.getProfile()
                    break
                }
            }
        }
    }

    async function titleUpdateHandler(clip, e) {
        const formData = new FormData(e.target);
        const title = formData.get('title')
        const response = await fetch(API + '/clips/' + clip.id, {
            method: 'PATCH',
            body: JSON.stringify({
                title: title
            }),
            credentials: 'include',
            headers: {
                'Content-type': 'application/json',
            }
        })
        props.getProfile()
    }

    async function spotlightUpdateHandler(clip) {
        const response = await fetch(API + '/clips/' + clip.id, {
            method: 'PATCH',
            body: JSON.stringify({
                spotlight: String(!clip.spotlight)
            }),
            credentials: 'include',
            headers: {
                'Content-type': 'application/json',
            }
        })
        props.getProfile()
    }

    async function privacyUpdateHandler(clip) {
        const response = await fetch(API + '/clips/' + clip.id, {
            method: 'PATCH',
            body: JSON.stringify({
                public: String(!clip.public)
            }),
            credentials: 'include',
            headers: {
                'Content-type': 'application/json',
            }
        })
        props.getProfile()
    }

    async function deleteHandler(clip) {
        const response = await fetch(API + '/clips/' + clip.id, {
            method: 'DELETE',
            credentials: 'include'
        })
        props.getProfile()
    }

    return (
        <>
        {actionConfirmation && 
            <Confirmation 
            content={`delete "${actionConfirmation.title}"`}
            onConfirm={() => {
                deleteHandler(actionConfirmation) 
                setActionConfirmation(null)}
            }
            onCancel={() => {setActionConfirmation(null)}}
            />
        }
        <MiniBanner>Clips</MiniBanner>
        <div className='grid grid-cols-12 gap-4 m-4 mx-5 clips scale-100 lg:scale-75'>
            {props.clips.map((clip, i) => {
                return (
                    <div key={i} className='w-full col-span-12 lg:col-span-6 2xl:col-span-4'>
                        <div className='clip-title'>
                            {updateTitle == i ?
                            <form className='inline-block relative' onSubmit={ async (e) => {
                                e.preventDefault()
                                setUpdateTitle(null)
                                titleUpdateHandler(clip, e)
                            }}>
                                <input className='inline appearance-none border rounded px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline' type='text' name='title' id='title' placeholder={clip.title}/>
                                <button type='submit'></button>
                                {/* <button className='inline rounded-md px-2.5 py-2.5 text-sm font-semibold text-green-500 hover:text-green-700 shadow-sm' id='privacyToggle' type='submit'><BsCheckLg /></button> */}
                                <button className='inline rounded-md px-2.5 py-2.5 text-sm font-semibold text-red-500 hover:text-red-700 shadow-sm absolute top-2 right-0' id='privacyToggle' onClick={ async (e) => {
                                    setUpdateTitle(null)
                                }}><BsXLg /></button>
                            </form>
                            : 
                            <>
                            {clip.title}
                            <button className='rounded-md bg-transparent px-2.5 py-2.5 font-semibold text-white shadow-sm text-xl' onClick={ async (e) => {
                                setUpdateTitle(i)
                            }} ><BiEditAlt /></button>
                            </>
                        }
                        </div>
                        <video muted loop controls className='bg-osu-shine p-1 rounded mx-auto mx-4 my-1 video-player'>
                            <source src={API + clip.link} type='video/mp4' />
                            Your browser does not support the video tag.
                        </video>
                        <div className='block text-xl'>
                            <form className='inline float-right' onSubmit={ async (e) => {
                                e.preventDefault()
                                setActionConfirmation(clip)
                            }}>
                                <button className='rounded-md px-2.5 py-2.5 text-sm font-semibold text-red-500 hover:text-red-700 shadow-sm text-xl' id='privacyToggle' type='submit'><BsTrash /></button>
                            </form>
                            <form className='inline mr-2 float-right' onSubmit={ async (e) => {
                                e.preventDefault()
                                privacyUpdateHandler(clip)
                            }}>
                                <button className={clip.public ? publicStyle : privateStyle} id='privacyToggle' type='submit'>{clip.public ? <BsUnlock /> : <BsLock />}</button>
                            </form>
                            <form className='inline mr-2 float-right' onSubmit={ async (e) => {
                                e.preventDefault()
                                spotlightUpdateHandler(clip)
                            }}>
                                <button className={clip.spotlight ? spotlightStyle : notSpotlightStyle} id='spotlightToggle' type='submit'>{clip.spotlight ? <BsStarFill /> : <BsStar />}</button>
                            </form>
                        </div>
                    </div>
                )
            })}
            <div className='w-full col-span-12 md:col-span-6 lg:col-span-4 2xl:col-span-3 flex'>
                {clipUploadToggle ?
                <form className='w-full my-auto relative' onSubmit={ async (e) => {
                    e.preventDefault()
                    uploadHandler(e)
                }}>
                    <div className='w-full bg-black p-4 text-white relative'>
                        <button className='inline rounded-md px-2.5 py-2.5 text-sm font-semibold text-red-500 hover:text-red-700 shadow-sm absolute top-0 right-0' onClick={ async (e) => {
                            setClipUploadToggle(false)
                        }}><BsXLg /></button>
                        <div className='my-4'>
                            <label className='block text-gray-700 text-white text-sm font-bold mb-2' htmlFor='uploadTitle'>Title</label>
                            <input className={serverError ? inputErrorStyle : inputStyle} value={uploadTitle} onChange={e => {setUploadTitle(e.target.value); setTitleMissingError(false)} } id='uploadTitle' name='title' type='text' placeholder='Title'/>
                            {titleMissingError && <ErrorMessage>Please enter a clip title</ErrorMessage>}
                        </div>
                        <div className='mb-6'>
                            <label className='block text-gray-700 text-white text-sm font-bold mb-2' htmlFor='upload'>Upload</label>
                            <input className={serverError ? inputErrorStyle : inputStyle} onChange={e => {setUpload(e.target.files); setUploadError(false)}} id='upload' name='video' type='file'/>
                            {uploadError && <ErrorMessage>Please select an MP4 file under 10MB</ErrorMessage>}
                            {serverError && <ErrorMessage>Unable to reach server</ErrorMessage>}
                            {compressing && <SuccessMessage>Compressing Video...</SuccessMessage>}
                        </div>
                        <div className='flex justify-center'>
                            <button className='bg-osu hover:bg-osu-dark font-semibold text-white shadow-sm py-2 px-4 rounded inline-flex items-center' type='submit' disabled={compressing}>
                                <svg className='fill-current w-4 h-4 mr-2' xmlns='http://www.w3.org/2000/svg' viewBox='0 0 20 20' transform='matrix(-1,1.2246467991473532e-16,-1.2246467991473532e-16,-1,0,0)'><path d='M13 8V2H7v6H2l8 8 8-8h-5zM0 18h20v2H0v-2z'/></svg>
                                <span>Upload</span>
                            </button>
                        </div>
                    </div>
                </form>                           
                :
                <div className='m-auto py-5'>
                    <button className='rounded-md bg-transperent text-osu hover:text-white font-semibold shadow-sm add-clip-button' onClick={ async (e) => {
                        setClipUploadToggle(true)
                        setUploadError(false)
                    }} ><BsPlusCircle /></button>
                </div>
                }
            </div>
        </div>
        </>
    )
}
export default ManageClips