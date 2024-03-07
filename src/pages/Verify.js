import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { useNavigate, Navigate } from 'react-router-dom';

import ErrorMessage from '../components/ErrorMessage'
import Banner from '../components/Banner'

function Verify() {

    const API = process.env.REACT_APP_API_URL
    const params = useParams()
    const navigate = useNavigate()
    const [verified, setVerified] = useState(false)
    const [error, setError] = useState(false)
    const [success, setSuccess] = useState(false)
    const [email, setEmail] = useState(null)

    useEffect(() => {
        verifyEmail()
    }, [])

    const verifyEmail = async () => {
        try {
            const response = await fetch(API + '/users/verify/check/', {
                method: 'POST',
                    body: JSON.stringify({
                        token: params.token
                    }),
                    headers: {
                        'Content-type': 'application/json',
                    }
            })
        
            if(response.status === 200){
                setVerified(true)
            } else {
                setVerified(false)
            }
        } catch (err) {
            console.error(err)
        }
    }

    const resendVerificationHandler = async () => {
        try {
            const response = await fetch(API + '/users/verify/send/' , {
                method: 'POST',
                body: JSON.stringify({
                    email: email
                }),
                headers: {
                    'Content-type': 'application/json',
                }
            })
            return response.status
        } catch (err) {
            console.log(err)
        }
    }

    return (
        <div classNmae='flex'>
            <div className='text-center m-5'>
                { verified ? 
                <div>
                    <div className='text-5xl text-white r6-font'>
                        Email Verified
                    </div>
                    <button onClick={() => navigate('/login')} className='bg-osu-orange r6-font text-white  text-3xl px-3 pb-1 rounded-md mt-3'>Login</button>
                </div>
                : 
                <div className='r6-font'>
                    <div className='text-5xl text-osu'>
                        Expired or Invalid Token
                    </div>
                    <div className='text-4xl text-white my-3'>
                        There was an issue validating your email. Please request a new verification email.
                    </div>
                    {!success ?
                    <>
                    <form onSubmit={ async (e) => {
                        e.preventDefault()
                        const response = await resendVerificationHandler()
                        if(response === 200){
                            setSuccess(true)
                        } else {
                            setError(true)
                        }
                    }} className='flex'>
                        <div className='m-auto'>
                            <input type='email' value={email} onChange={e => setEmail(e.target.value)} placeholder="Email" className='rounded-md pb-1 px-2 text-3xl my-2' required/>
                            <button type='submit' className='bg-osu-orange r6-font text-white  text-3xl px-3 pb-1 rounded-md mx-2 my-2'>Resend Verification Email</button>
                        </div>
                    </form>
                    {error &&
                        <div className='text-4xl text-red-500'>
                            Unable to find account awaiting verification with provided email
                        </div>
                    }
                    </>
                    :
                    <div className='text-5xl text-green-400'>
                        Verification Email Sent
                    </div>
                    }
                </div>
                }
            </div>
        </div>
    )
}
export default Verify