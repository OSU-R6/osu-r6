import Banner from '../components/Banner'
import { useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux'
import { isloggedIn, getUser } from '../redux/selectors'
import ErrorMessage from '../components/ErrorMessage'

const inputStyle = "appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
const inputErrorStyle = "appearance-none border-2 border-red-500 rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"

function Alumni() {

    const [clips, setClips] = useState([])

    const [ serverError, setServerError ] = useState(false)
    const [ titleError, setTitleError ] = useState(false)
    const [ uploadError, setUploadError ] = useState(false)
    const [ uploadSuccess, setUploadSuccess ] = useState(false)

    const [ uploadTitle, setUploadTitle ] = useState("")
    const [ upload, setUpload ] = useState(null)

    const loggedIn = useSelector(isloggedIn)
    const user = useSelector(getUser)


    useEffect(() => {
        getClips()
    }, [])

    const getClips = async () => {
        try{
            const response = await fetch('http://localhost:8001' + '/clips/GetPrivateClips', {
                credentials: 'include'
            })
            const responseBody = await response.json()
            setClips(responseBody.clips)
        } catch {
            setClips([])
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
        getClips()
    }

    async function privacyUpdateHandler(clip) {
        const response = await fetch('http://localhost:8001' + '/clips/TogglePrivacy/' + clip.id, {
            method: 'PATCH',
            credentials: 'include'
        })
        getClips()
    }

    async function deleteHandler(clip) {
        const response = await fetch('http://localhost:8001' + '/clips/' + clip.id, {
            method: 'DELETE',
            credentials: 'include'
        })
        getClips()
    }

    return(
        <>
            {loggedIn ? (
                <>
                    <Banner>{user.data.firstName} "{user.data.ign}" {user.data.lastName}</Banner>

                    <div className="flex justify-center items-center min-h-full">
                        <form className="px-8 pt-6 pb-8 m-4" onSubmit={ async (e) => {
                            e.preventDefault()
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
                                    case 200: {
                                        setUploadError(false)
                                        setUploadSuccess(true)
                                        break
                                    }
                                }
                            } 
                        }}>
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
                                {uploadSuccess && <ErrorMessage>Clip has been uploaded!</ErrorMessage>}
                            </div>
                            <div className="flex justify-center">
                                <button className="rounded-md bg-osu hover:bg-osu-dark px-10 py-2.5 text-sm font-semibold text-white shadow-sm" type="submit">Upload</button>
                            </div>
                        </form>
                    </div>

                    {clips.map(clip => {
                        return (  
                            <div className="max-w-md w-ful">
                                <div className="px-8 pt-6 pb-8 m-4 border">
                                <video muted loop controls className="bg-osu-shine p-1 mx-auto m-4 video-player">
                                    <source src={'http://localhost:8001' + clip.link} type="video/mp4" />
                                    Your browser does not support the video tag.
                                </video>
                                    <form className="mb-4" onSubmit={ async (e) => {
                                        e.preventDefault()
                                        titleUpdateHandler(clip, e)
                                    }}>
                                        <label className="block text-gray-700 text-white text-sm font-bold mb-2" htmlFor="title">
                                            Title: {clip.title}
                                        </label>
                                        <input type="text" name="title" id="title" placeholder={clip.title}/>
                                        <button className="rounded-md bg-osu hover:bg-osu-dark px-10 py-2.5 text-sm font-semibold text-white shadow-sm" type="submit">Update title</button>
                                    </form>
                                    <form className="mb-4" onSubmit={ async (e) => {
                                        e.preventDefault()
                                        privacyUpdateHandler(clip)
                                    }}>
                                        <label className="block text-gray-700 text-white text-sm font-bold mb-2" htmlFor="privacyToggle">
                                            Public : {clip.public.toString()}
                                        </label>
                                        <button className="rounded-md bg-osu hover:bg-osu-dark px-10 py-2.5 text-sm font-semibold text-white shadow-sm" id="privacyToggle" type="submit">Toggle Privacy</button>
                                    </form>
                                    <form onSubmit={ async (e) => {
                                        e.preventDefault()
                                        deleteHandler(clip)
                                    }}>
                                        <label className="block text-gray-700 text-white text-sm font-bold mb-2" htmlFor="privacyToggle">
                                            Delete
                                        </label>
                                        <button className="rounded-md bg-osu hover:bg-osu-dark px-10 py-2.5 text-sm font-semibold text-white shadow-sm" id="privacyToggle" type="submit">Delete Clip</button>
                                    </form>
                                </div>
                            </div>
                        )
                    })}
                </>
            ) : ( <Navigate to="/login"/> )}
        </>
    );
} export default Alumni;