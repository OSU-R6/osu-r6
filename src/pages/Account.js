import Banner from '../components/Banner'
import { useEffect, useState } from 'react';
import { Navigate, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux'
import { isloggedIn, getUser } from '../redux/selectors'
import { BsTrash, BsLock, BsUnlock, BsXLg, BsCheckLg } from "react-icons/bs";
import { BiEditAlt } from "react-icons/bi";
import ErrorMessage from '../components/ErrorMessage'
import SuccessMessage from '../components/SuccessMessage'

const inputStyle = "appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
const inputErrorStyle = "appearance-none border-2 border-red-500 rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"

function Alumni() {

    const [clips, setClips] = useState([])

    const [ serverError, setServerError ] = useState(false)
    const [ titleError, setTitleError ] = useState(false)
    const [ uploadError, setUploadError ] = useState(false)
    const [ uploadSuccess, setUploadSuccess ] = useState(false)
    const [ uploadToggle, setUploadToggle ] = useState(false)
    const [ bioError, setBioError ] = useState(false)

    const [ uploadTitle, setUploadTitle ] = useState("")
    const [ updateTitle, setUpdateTitle ] = useState()
    const [ upload, setUpload ] = useState(null)
    const [ bio, setBio ] = useState("")
    const [ updateBio, setUpdateBio ] = useState(false)
    const [ player, setPlayer] = useState({})

    const loggedIn = useSelector(isloggedIn)
    const user = useSelector(getUser)
    const navigate = useNavigate()

    const publicStyle = "rounded-md bg-transparent px-2.5 py-2.5 text-sm font-semibold text-green-500 hover:text-red-500 shadow-sm"
    const privateStyle = "rounded-md bg-transparent px-2.5 py-2.5 text-sm font-semibold text-red-500 hover:text-green-500 shadow-sm"

    useEffect(() => {
        getProfile()
    }, [])

    const getProfile = async () => {
        try{
            const profile = await fetch('http://localhost:8001' + '/users/GetPublicProfile/' + user.data.ign)
            setPlayer(await profile.json())
            setBio(player.bio)
            const response = await fetch('http://localhost:8001' + '/clips/GetPrivateClips', {
                credentials: 'include'
            })
            const responseBody = await response.json()
            setClips(responseBody.clips)
        } catch {
            setClips([])
        }
    }

    async function uploadHandler(e){
        if(uploadTitle == "") setTitleError(true)
        else setTitleError(false)
        if(upload == null) setUploadError(true)
        else setUploadError(false)
        if(!uploadError && !titleError) {
            const formData = new FormData(e.target);
            const response = await fetch('http://localhost:8001' + '/clips/', {
                method: 'POST',
                credentials: 'include',
                body: formData
            })
            switch(response.status){
                case 500: {
                    setServerError(true)
                    setUploadSuccess(false)
                    break
                }
                case 400: {
                    setUploadError(true)
                    setUploadSuccess(false)
                    break
                }
                case 201: {
                    setUploadError(false)
                    setUploadSuccess(true)
                    getProfile()
                    break
                }
            }
        }
    }

    async function titleUpdateHandler(clip, e) {
        const formData = new FormData(e.target);
        const title = formData.get('title')
        const response = await fetch('http://localhost:8001' + '/clips/UpdateTitle/' + clip.id, {
            method: 'PATCH',
            body: JSON.stringify({
                title: title
            }),
            credentials: 'include',
            headers: {
                'Content-type': 'application/json',
            }
        })
        getProfile()
    }

    async function bioUpdateHandler(e) {
        const formData = new FormData(e.target);
        const bio = formData.get('bio')
        const response = await fetch('http://localhost:8001' + '/users/UpdateBio', {
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

    async function privacyUpdateHandler(clip) {
        const response = await fetch('http://localhost:8001' + '/clips/TogglePrivacy/' + clip.id, {
            method: 'PATCH',
            credentials: 'include'
        })
        getProfile()
    }

    async function deleteHandler(clip) {
        const response = await fetch('http://localhost:8001' + '/clips/' + clip.id, {
            method: 'DELETE',
            credentials: 'include'
        })
        getProfile()
    }

    function viewProfilehandler() {
        navigate('/player/' + player.ign)
    }

    return(
        <>
            {loggedIn ? (
                <>
                    <Banner>{user.data.firstName} "{user.data.ign}" {user.data.lastName}</Banner>

                    <div className="flex justify-center m-4">
                        <a className="rounded-md bg-osu hover:bg-osu-dark px-10 py-2.5 text-sm font-semibold text-white shadow-sm" href={'/player/' + player.ign}>View Profile</a>
                    </div>

                    {uploadToggle ?
                    <div className="flex justify-center m-4">
                        <form className="px-8 pt-6 pb-8 m-4 border rounded-xl relative" onSubmit={ async (e) => {
                            e.preventDefault()
                            uploadHandler(e)
                        }}>
                            <button className="inline rounded-md px-2.5 py-2.5 text-sm font-semibold text-red-500 hover:text-red-700 shadow-sm absolute top-0 right-0" onClick={ async (e) => {
                                setUploadToggle(false)
                            }}><BsXLg /></button>
                            <div className="mb-4">
                                <label className="block text-gray-700 text-white text-sm font-bold mb-2" htmlFor="uploadTitle">Title</label>
                                <input className={serverError ? inputErrorStyle : inputStyle} value={uploadTitle} onChange={e => {setUploadTitle(e.target.value); setTitleError(false)} } id="uploadTitle" name="title" type="text" placeholder="Title"/>
                                {titleError && <ErrorMessage>Please enter a clip title</ErrorMessage>}
                            </div>
                            <div className="mb-6">
                                <label className="block text-gray-700 text-white text-sm font-bold mb-2" htmlFor="upload">Upload</label>
                                <input className={serverError ? inputErrorStyle : inputStyle} onChange={e => {setUpload(e.target.files); setUploadError(false)}} id="upload" name="video" type="file"/>
                                {uploadError && <ErrorMessage>Please select an MP4 file under 10MB</ErrorMessage>}
                                {serverError && <ErrorMessage>Unable to reach server</ErrorMessage>}
                                {uploadSuccess && <SuccessMessage>Clip has been uploaded!</SuccessMessage>}
                            </div>
                            <div className="flex justify-center">
                                <button className="bg-osu hover:bg-osu-dark font-semibold text-white shadow-sm py-2 px-4 rounded inline-flex items-center" type="submit">
                                    <svg className="fill-current w-4 h-4 mr-2" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" transform="matrix(-1,1.2246467991473532e-16,-1.2246467991473532e-16,-1,0,0)"><path d="M13 8V2H7v6H2l8 8 8-8h-5zM0 18h20v2H0v-2z"/></svg>
                                    <span>Upload</span>
                                </button>
                            </div>
                        </form>
                    </div>
                    :
                    <div className="flex justify-center m-4">
                        <button className="rounded-md bg-osu hover:bg-osu-dark px-10 py-2.5 text-sm font-semibold text-white shadow-sm" onClick={ async (e) => {
                            setUploadToggle(true)
                        }} >Upload Clip</button>
                    </div>
                    }

                    {updateBio ?
                    <form className="px-8 pt-6 pb-8 m-4 border relative" onSubmit={ async (e) => {
                        e.preventDefault()
                        setUpdateBio(false)
                        bioUpdateHandler(e)
                    }}>
                        <div className="mb-4">
                            <label className="block text-gray-700 text-white text-sm font-bold mb-2" htmlFor="bio">Bio</label>
                            <input className={inputStyle} value={bio} onChange={e => setBio(e.target.value) } id="bio" name="bio" type="textarea" placeholder={player.bio}/>
                            <button className="inline rounded-md px-2.5 py-2.5 text-sm font-semibold text-red-500 hover:text-red-700 shadow-sm absolute top-0 right-0" onClick={ async (e) => {
                                setUpdateBio(false)
                            }}><BsXLg /></button>
                        </div>
                        <div className="flex justify-center">
                            <button className="rounded-md bg-osu hover:bg-osu-dark px-10 py-2.5 text-sm font-semibold text-white shadow-sm" type="submit">Update</button>
                        </div>
                    </form>
                    :
                    // <div className="justify-center items-center w-full">
                    //     <div className="w-full m-auto">
                    //         <div className="inline m-auto text-white">Bio</div>
                    //         <button className="inline rounded-md bg-transparent px-2.5 py-2.5 text-sm font-semibold text-white shadow-sm" onClick={ async (e) => {
                    //             setUpdateBio(true)
                    //         }} ><BiEditAlt /></button>
                    //     </div>
                    //     <div className="bio">{player.bio}</div>
                    // </div>
                    <div className="flex justify-center m-4">
                        <button className="rounded-md bg-osu hover:bg-osu-dark px-10 py-2.5 text-sm font-semibold text-white shadow-sm" onClick={ async (e) => {
                            setUpdateBio(true)
                        }} >Update Bio</button>
                    </div>
                    }  

                    <div className='grid grid-cols-12 gap-2 m-4'>
                        {clips.map((clip, i) => {
                            return (
                                <div className="w-full col-span-12 md:col-span-6 lg:col-span-4 2xl:col-span-3 p-2">
                                    <div className="clip-title">
                                        {updateTitle == i ?
                                        <form className="inline-block" onSubmit={ async (e) => {
                                            e.preventDefault()
                                            setUpdateTitle(null)
                                            titleUpdateHandler(clip, e)
                                        }}>
                                            <input className="inline appearance-none border rounded px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" type="text" name="title" id="title" placeholder={clip.title}/>
                                            <button type="submit"></button>
                                            {/* <button className="inline rounded-md px-2.5 py-2.5 text-sm font-semibold text-green-500 hover:text-green-700 shadow-sm" id="privacyToggle" type="submit"><BsCheckLg /></button> */}
                                            <button className="inline rounded-md px-2.5 py-2.5 text-sm font-semibold text-red-500 hover:text-red-700 shadow-sm" id="privacyToggle" onClick={ async (e) => {
                                                setUpdateTitle(null)
                                            }}><BsXLg /></button>
                                        </form>
                                        : 
                                        <>
                                        {clip.title}
                                        <button className="rounded-md bg-transparent px-2.5 py-2.5 text-sm font-semibold text-white shadow-sm" onClick={ async (e) => {
                                            setUpdateTitle(i)
                                        }} ><BiEditAlt /></button>
                                        </>
                                    }
                                    </div>
                                    <video muted loop controls className="bg-osu-shine p-1 mx-auto mx-4 my-1 video-player">
                                        <source src={'http://localhost:8001' + clip.link} type="video/mp4" />
                                        Your browser does not support the video tag.
                                    </video>
                                    <div className="block">
                                        <form className="inline float-right" onSubmit={ async (e) => {
                                            e.preventDefault()
                                            deleteHandler(clip)
                                        }}>
                                            <button className="rounded-md px-2.5 py-2.5 text-sm font-semibold text-red-500 hover:text-red-700 shadow-sm" id="privacyToggle" type="submit"><BsTrash /></button>
                                        </form>
                                        <form className="inline mr-2 float-right" onSubmit={ async (e) => {
                                            e.preventDefault()
                                            privacyUpdateHandler(clip)
                                        }}>
                                            <button className={clip.public ? publicStyle : privateStyle} id="privacyToggle" type="submit">{clip.public ? <BsUnlock /> : <BsLock />}</button>
                                        </form>
                                    </div>
                                </div>
                            )
                        })}
                    </div>
                </>
            ) : ( <Navigate to="/login"/> )}
        </>
    );
} export default Alumni;