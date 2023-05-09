import Banner from '../components/Banner'
import { useEffect, useState } from 'react';

function Alumni() {

    const {player} = "SweatyCarrot"
    const [clips, setClips] = useState([])

    useEffect(() => {
        getClips()
    }, [])

    const getClips = async () => {
        const response = await fetch('http://localhost:8001' + '/clips/GetPrivateClips', {
            credentials: 'include'
        })
        const responseBody = await response.json()
        setClips(responseBody.clips)
    }

    async function handleClipDeletion(id) {
        const response = await fetch('http://localhost:8001' + '/clips/' + id, {
            method: 'DELETE',
            credentials: 'include'
        })
    }

    return(
        <>
            <Banner>Account</Banner>

            <div>
                <div>
                {clips.map(clip => {
                    return (  
                        <div>
                            <label><strong>Title</strong>: {clip.title} <strong>id</strong>: {clip.id} <strong>Private</strong>: {clip.public} </label>
                            <button onClick={ async (e) => {
                                e.preventDefault()
                                const response = await fetch('http://localhost:8001' + '/clips/TogglePrivacy/' + clip.id, {
                                    method: 'POST',
                                    credentials: 'include'
                                })
                            }}>Toggle Privacy</button>
                            <button onClick={ async (e) => {
                                e.preventDefault()
                                const response = await fetch('http://localhost:8001' + '/clips/' + clip.id, {
                                    method: 'DELETE',
                                    credentials: 'include'
                                })
                            }}>Delete</button>
                        </div>
                    )
                })}
                </div>
            </div>

        </>
    );
} export default Alumni;