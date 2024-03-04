import { useSelector } from 'react-redux'
import { isloggedIn} from '../redux/selectors'
import { useState, useEffect } from 'react'
import { BsCheck } from 'react-icons/bs'

const EventCard = ({ event }) => {

    const loggedIn = useSelector(isloggedIn)
    const [signedUp, setSignedUp] = useState(false)
    const API = process.env.REACT_APP_API_URL

    useEffect(() => {
        getSignUpStatus()
    })

    const getSignUpStatus = async () => {
        const active = await fetch(API + '/events/' + event.id + '/signup', {
            credentials: 'include'
        })
        if(active.status == 200){
            setSignedUp(true)
        } else if (active.status == 404){    
            setSignedUp(false)
        }
    }

    const dateObj = new Date(event.date);
    event.timeOnly = dateObj.toLocaleTimeString('en-US', {
        hour: 'numeric',
        minute: '2-digit',
        hour12: true
    })
    event.dateOnly = dateObj.toLocaleDateString('en-US', {
        month: 'short',
        day: '2-digit',
        year: 'numeric'
    })

    async function signUpHandler() {
        try {
            const response = await fetch(API + '/events/' + event.id + '/signup', {
                method: 'POST',
                credentials: 'include'
            })
        } catch (err) {
            console.log(err)
        }   
    }

    async function optOutHandler() {
        try {
            const response = await fetch(API + '/events/' + event.id + '/signup', {
                method: 'DELETE',
                credentials: 'include'
            })
        } catch (err) {
            console.log(err)
        }   
    }

    return (
        <div className='text-osu r6-font text-4xl text-center my-12'>
            <div className='text-white text-5xl'>
                {event.title}
            </div>
            <div className='text-osu text-4xl'>
                {event.dateOnly} @ {event.timeOnly}
            </div>
            { event.description != null && 
            <div className='text-white text-3xl'>
                {event.description}
            </div>
            }
            {loggedIn &&
            <>
            {!signedUp ?
                <form onSubmit={ async (e) => {
                    e.preventDefault()
                    await signUpHandler()
                    getSignUpStatus()
                }} className="">
                    <button className="rounded-md bg-osu hover:bg-osu-dark px-3 py-0.5 text-2xl font-semibold text-white shadow-sm mt-4" type="submit">Sign Up</button>
                </form>
                :
                <form onSubmit={ async (e) => {
                    e.preventDefault()
                    await optOutHandler()
                    getSignUpStatus()
                }} className=" mt-4 flex">
                    <div className='m-auto flex items-center'>
                        <div className='text-3xl text-white mx-2'><span>Signed Up</span></div>
                        <button className="relative rounded-md bg-osu hover:bg-osu-dark px-3 py-0.5 text-2xl font-semibold text-white shadow-sm mx-2" type="submit">
                            <span className="">Opt Out</span>
                        </button>
                    </div>
                </form>
            }
            </>
            }
        </div>
    )
} 
export default EventCard