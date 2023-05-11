import Banner from '../components/Banner'
import { useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux'
import { isloggedIn } from '../redux/selectors'

function Alumni() {

    const [clips, setClips] = useState([])
    //const [player, setPlayer] = useState("")

    const loggedIn = useSelector(isloggedIn)

    useEffect(() => {
        //checkLoginStatus()
        getClips()
    }, [])

    // const checkLoginStatus = async () => {
    //     try{
    //         const response = await fetch('http://localhost:8001' + '/users/authenticate', {
    //             credentials: 'include'
    //         })
    //         if (response.status === 200){
    //             dispatch(login())
    //             const responseBody = await response.json()
    //             setPlayer(responseBody.ign)
    //             getClips()
    //         } else {
    //             dispatch(logout())
    //             navigate("/login")
    //         }
    //     } catch {
    //         dispatch(logout())
    //         navigate("/login")
    //     }
    // }

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


    return(
        <>
            {loggedIn ? (
                <>
                    <Banner>Account</Banner>
                    <div>
                        <div>
                        {clips.map(clip => {
                            return (  
                                <div className="max-w-md w-full max-w-xs">
                                    <div className="px-8 pt-6 pb-8 mt-4 border">
                                        <form className="mb-4" onSubmit={ async (e) => {
                                            e.preventDefault()
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
                                        }}>
                                            <label className="block text-gray-700 text-white text-sm font-bold mb-2" htmlFor="title">
                                                Title: {clip.title}
                                            </label>
                                            <input type="text" name="title" id="title" placeholder={clip.title}/>
                                            <button className="rounded-md bg-osu hover:bg-osu-dark px-10 py-2.5 text-sm font-semibold text-white shadow-sm" type="submit">Update title</button>
                                        </form>
                                        <form className="mb-4" onSubmit={ async (e) => {
                                            e.preventDefault()
                                            const response = await fetch('http://localhost:8001' + '/clips/TogglePrivacy/' + clip.id, {
                                                method: 'PATCH',
                                                credentials: 'include'
                                            })
                                            getClips()
                                        }}>
                                            <label className="block text-gray-700 text-white text-sm font-bold mb-2" htmlFor="privacyToggle">
                                                Public : {clip.public.toString()}
                                            </label>
                                            <button className="rounded-md bg-osu hover:bg-osu-dark px-10 py-2.5 text-sm font-semibold text-white shadow-sm" id="privacyToggle" type="submit">Toggle Privacy</button>
                                        </form>
                                        <form onSubmit={ async (e) => {
                                            e.preventDefault()
                                            const response = await fetch('http://localhost:8001' + '/clips/' + clip.id, {
                                                method: 'DELETE',
                                                credentials: 'include'
                                            })
                                            getClips()
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
                        </div>
                    </div>
                </>
            ) : ( <Navigate to="/login"/> )}
        </>
    );
} export default Alumni;