import Banner from '../components/Banner'
import MiniBanner from '../components/MiniBanner'
import { useEffect, useState } from 'react';
import { Navigate, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux'
import { isloggedIn, getUser } from '../redux/selectors'
import { BsTrash, BsLock, BsUnlock, BsXLg, BsCheckLg, BsPlusLg, BsPlusCircle, BsStar, BsStarFill } from 'react-icons/bs';
import { BiEditAlt } from 'react-icons/bi';
import ErrorMessage from '../components/ErrorMessage'
import SuccessMessage from '../components/SuccessMessage'

const API = process.env.REACT_APP_API_URL

function Alumni() {

    const [clips, setClips] = useState([])

    const [ serverError, setServerError ] = useState(false)
    const [ titleError, setTitleError ] = useState(false)
    const [ uploadError, setUploadError ] = useState(false)
    const [ pfpUploadError, setPfpUploadError ] = useState(false)
    const [ clipUploadToggle, setClipUploadToggle ] = useState(false)
    const [ pfpUploadToggle, setPfpUploadToggle ] = useState(false)
    const [ bioUpdateError, setBioUpdateError ] = useState(false)

    const [ uploadTitle, setUploadTitle ] = useState('')
    const [ upload, setUpload ] = useState(null)
    const [ pfpUpload, setPfpUpload ] = useState(null)
    const [ bio, setBio ] = useState('')
    const [ updateBio, setUpdateBio ] = useState(false)
    const [ updateTitle, setUpdateTitle ] = useState()
    const [ player, setPlayer] = useState({})
    const [ profileImage, setProfileImage] = useState(null)

    const loggedIn = useSelector(isloggedIn)
    const user = useSelector(getUser)
    const navigate = useNavigate()

    const inputStyle = 'appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
    const inputErrorStyle = 'appearance-none border-2 border-red-500 rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'

    const bioInputStyle = 'rounded w-full py-2 text-gray-700 resize-none bg-black text-white h-80 focus:text-black focus:outline-none'

    const publicStyle = 'rounded-md bg-transparent px-2.5 py-2.5 text-sm font-semibold text-green-500 hover:text-red-500 shadow-sm'
    const privateStyle = 'rounded-md bg-transparent px-2.5 py-2.5 text-sm font-semibold text-red-500 hover:text-green-500 shadow-sm'

    const spotlightStyle = 'rounded-md bg-transparent px-2.5 py-2.5 text-sm font-semibold text-osu shadow-sm'
    const notSpotlightStyle = 'rounded-md bg-transparent px-2.5 py-2.5 text-sm font-semibold text-osu hover:text-white shadow-sm'

    useEffect(() => {
        getProfile()
    }, [])

    useEffect(() => {
        setUploadError(false)
    }, [clipUploadToggle]);

    const getProfile = async () => {
        try{
            const profile = await fetch(API + '/users/GetPublicProfile/' + user.data.ign)
            setPlayer(await profile.json())
            setBio(player.bio)
            const response = await fetch(API + '/clips/GetPrivateClips', {
                credentials: 'include'
            })
            const responseBody = await response.json()
            setClips(responseBody.clips)
        } catch {
            setClips([])
        }
    }

    async function uploadHandler(e){
        if(uploadTitle == '') setTitleError(true)
        else setTitleError(false)
        if(upload == null) setUploadError(true)
        else setUploadError(false)
        if(!uploadError && !titleError) {
            const formData = new FormData(e.target);
            const response = await fetch(API + '/clips/', {
                method: 'POST',
                credentials: 'include',
                body: formData
            })
            switch(response.status){
                case 500: {
                    setServerError(true)
                    break
                }
                case 400: {
                    setUploadError(true)
                    break
                }
                case 201: {
                    setUploadError(false)
                    setClipUploadToggle(false)
                    setUploadTitle('')
                    getProfile()
                    break
                }
            }
        }
    }

    async function pfpUploadHandler(e) {
        if(pfpUpload == null) {
            setPfpUploadError(true)
        } else {
            const formData = new FormData(e.target);
            const response = await fetch(API + '/users/pfp', {
                method: 'POST',
                credentials: 'include',
                body: formData
            })
            switch(response.status){
                case 500: {
                    setServerError(true)
                    setPfpUploadError(false)
                    break
                }
                case 400: {
                    setServerError(false)
                    setPfpUploadError(true)
                    break
                }
                case 201: {
                    setServerError(false)
                    setPfpUploadError(false)
                    setPfpUploadToggle(false)
                    getProfile()
                    break
                }
            }
        }
    }

    async function titleUpdateHandler(clip, e) {
        const formData = new FormData(e.target);
        const title = formData.get('title')
        const response = await fetch(API + '/clips/UpdateTitle/' + clip.id, {
            method: 'PATCH',
            body: JSON.stringify({
                title: title
            }),
            credentials: 'include',
            headers: {
                'Content-type': 'application/json',
            }
        })
        if(response.status != 201){
            setBioUpdateError(true)
        }
        getProfile()
    }

    async function bioUpdateHandler(e) {
        const formData = new FormData(e.target);
        const bio = formData.get('bio')
        const response = await fetch(API + '/users/UpdateBio', {
            method: 'PATCH',
            body: JSON.stringify({
                bio: bio
            }),
            credentials: 'include',
            headers: {
                'Content-type': 'application/json',
            }
        })
        getProfile()
    }

    async function spotlightUpdateHandler(clip) {
        const response = await fetch(API + '/clips/ToggleSpotlight/' + clip.id, {
            method: 'PATCH',
            credentials: 'include'
        })
        getProfile()
    }

    async function privacyUpdateHandler(clip) {
        const response = await fetch(API + '/clips/TogglePrivacy/' + clip.id, {
            method: 'PATCH',
            credentials: 'include'
        })
        getProfile()
    }

    async function deleteHandler(clip) {
        const response = await fetch(API + '/clips/' + clip.id, {
            method: 'DELETE',
            credentials: 'include'
        })
        getProfile()
    }

    return(
        <>
            {loggedIn ? (
                <>
                    <Banner>{user.data.firstName} '{user.data.ign}' {user.data.lastName}</Banner>
                    
                    <div className='grid grid-cols-3 gap-3 justify-center m-4'>
                        {/* Profile Image */}
                        <div className='col-span-3 lg:col-span-1 justify-center relative my-auto'>
                            { pfpUploadToggle ?
                            <div className='flex justify-center w-full'>
                                <form className='px-8 pt-6 pb-8 relative' onSubmit={ async (e) => {
                                    e.preventDefault()
                                    pfpUploadHandler(e)
                                }}>
                                    <button className='inline rounded-md px-2.5 py-2.5 text-sm font-semibold text-red-500 hover:text-red-700 shadow-sm absolute top-0 right-0' onClick={ async (e) => {
                                        setPfpUploadToggle(false)
                                    }}><BsXLg /></button>
                                    <div className='mb-6'>
                                        <label className='block text-gray-700 text-white text-sm font-bold mb-2' htmlFor='upload'>Upload Profile Image</label>
                                        <input className={pfpUploadError ? inputErrorStyle : inputStyle} onChange={e => {setPfpUpload(e.target.files); setPfpUploadError(false)}} id='upload' name='image' type='file'/>
                                        <p className='mt-1 text-sm text-gray-500' id='file_input_help'>PNG or JPG</p>
                                        {pfpUploadError && <ErrorMessage>Please select a PNG or JPG file</ErrorMessage>}
                                        {serverError && <ErrorMessage>Unable to reach server</ErrorMessage>}
                                    </div>
                                    <div className='flex justify-center'>
                                        <button className='bg-osu hover:bg-osu-dark font-semibold text-white shadow-sm py-2 px-4 rounded inline-flex items-center' type='submit'>
                                            <svg className='fill-current w-4 h-4 mr-2' xmlns='http://www.w3.org/2000/svg' viewBox='0 0 20 20' transform='matrix(-1,1.2246467991473532e-16,-1.2246467991473532e-16,-1,0,0)'><path d='M13 8V2H7v6H2l8 8 8-8h-5zM0 18h20v2H0v-2z'/></svg>
                                            <span>Upload</span>
                                        </button>
                                    </div>
                                </form>
                            </div>
                            :
                            <>
                            <img className='m-auto' src={API + player.pfp} onError={(e) => {e.target.src = './images/placeholderSquish.png'}}/>
                            <div className='flex'>
                                <button className='rounded-md bg-transparent px-2.5 py-2.5 text-sm font-semibold shadow-sm scale-150 text-osu hover:text-white mx-auto my-2' onClick={ async (e) => {
                                    setPfpUploadToggle(true)
                                }} ><span className='flex'><div className='my-auto'><BiEditAlt /></div> Edit</span></button>
                            </div>
                            </>
                            }
                        </div>

                        {/* User Bio */}
                        <div className='col-span-3 lg:col-span-2 my-auto'>
                            <div className=' w-full h-full bg-black p-4 rounded text-white relative'>
                                <div className='clip-title pb-4'>
                                    {player.firstName} '{player.ign}' {player.lastName}
                                </div>  
                                { updateBio ?
                                <form className='relative flex flex-wrap justify-center' onSubmit={ async (e) => {
                                    e.preventDefault()
                                    setUpdateBio(false)
                                    bioUpdateHandler(e)
                                }}>
                                    <div className='mb-4 w-full border border-white rounded py-2 px-3'>
                                        <textarea className={bioUpdateError || serverError ? inputErrorStyle : bioInputStyle} value={bio} onChange={e => setBio(e.target.value) } id='bio' name='bio' placeholder={player.bio}/>
                                        <button className='inline rounded-md px-2.5 py-2.5 text-sm font-semibold text-red-500 hover:text-red-700 shadow-sm absolute top-0 right-0' onClick={ async (e) => {
                                            setUpdateBio(false)
                                            setBio(player.bio)
                                        }}><BsXLg /></button>
                                    </div>
                                    <div className='w-full'>
                                        <button className='rounded-md bg-osu hover:bg-osu-dark px-10 py-2.5 text-sm font-semibold text-white shadow-sm float-right' type='submit'>Update</button>
                                    </div>
                                </form>
                                :
                                <>
                                <div className='flex'>
                                    <button className='bg-transparent font-semibold text-osu shadow-sm mx-auto mb-2' onClick={ async (e) => {
                                        setUpdateBio(true)
                                    }} ><span className='flex'><div className='my-auto'><BiEditAlt /></div> Edit</span></button>
                                </div>
                                <div className='whitespace-pre-line text-center'>
                                    {player.bio}
                                </div>
                                </>
                                }
                            </div>
                        </div>
                    </div>

                    {/* User Clip Management */}
                    <MiniBanner>Clips</MiniBanner>
                    <div className='grid grid-cols-12 gap-4 m-4 clips'>
                        {clips.map((clip, i) => {
                            return (
                                <div className='w-full col-span-12 md:col-span-6 lg:col-span-4 2xl:col-span-3'>
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
                                        <button className='rounded-md bg-transparent px-2.5 py-2.5 text-sm font-semibold text-white shadow-sm' onClick={ async (e) => {
                                            setUpdateTitle(i)
                                        }} ><BiEditAlt /></button>
                                        </>
                                    }
                                    </div>
                                    <video muted loop controls className='bg-osu-shine p-1 rounded mx-auto mx-4 my-1 video-player'>
                                        <source src={API + clip.link} type='video/mp4' />
                                        Your browser does not support the video tag.
                                    </video>
                                    <div className='block'>
                                        <form className='inline float-right' onSubmit={ async (e) => {
                                            e.preventDefault()
                                            deleteHandler(clip)
                                        }}>
                                            <button className='rounded-md px-2.5 py-2.5 text-sm font-semibold text-red-500 hover:text-red-700 shadow-sm' id='privacyToggle' type='submit'><BsTrash /></button>
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
                                            <button className={clip.spotlight ? spotlightStyle : notSpotlightStyle} id='privacyToggle' type='submit'>{clip.spotlight ? <BsStarFill /> : <BsStar />}</button>
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
                                        <input className={serverError ? inputErrorStyle : inputStyle} value={uploadTitle} onChange={e => {setUploadTitle(e.target.value); setTitleError(false)} } id='uploadTitle' name='title' type='text' placeholder='Title'/>
                                        {titleError && <ErrorMessage>Please enter a clip title</ErrorMessage>}
                                    </div>
                                    <div className='mb-6'>
                                        <label className='block text-gray-700 text-white text-sm font-bold mb-2' htmlFor='upload'>Upload</label>
                                        <input className={serverError ? inputErrorStyle : inputStyle} onChange={e => {setUpload(e.target.files); setUploadError(false)}} id='upload' name='video' type='file'/>
                                        {uploadError && <ErrorMessage>Please select an MP4 file under 10MB</ErrorMessage>}
                                        {serverError && <ErrorMessage>Unable to reach server</ErrorMessage>}
                                    </div>
                                    <div className='flex justify-center'>
                                        <button className='bg-osu hover:bg-osu-dark font-semibold text-white shadow-sm py-2 px-4 rounded inline-flex items-center' type='submit'>
                                            <svg className='fill-current w-4 h-4 mr-2' xmlns='http://www.w3.org/2000/svg' viewBox='0 0 20 20' transform='matrix(-1,1.2246467991473532e-16,-1.2246467991473532e-16,-1,0,0)'><path d='M13 8V2H7v6H2l8 8 8-8h-5zM0 18h20v2H0v-2z'/></svg>
                                            <span>Upload</span>
                                        </button>
                                    </div>
                                </div>
                            </form>                           
                            :
                            <div className='m-4 m-auto'>
                                <button className='rounded-md bg-transperent text-osu hover:text-white font-semibold shadow-sm add-clip-button' onClick={ async (e) => {
                                    setClipUploadToggle(true)
                                    setUploadError(false)
                                }} ><BsPlusCircle /></button>
                            </div>
                            }
                        </div>
                    </div>
                </>
            ) : ( <Navigate to='/login'/> )}
        </>
    );
} export default Alumni;