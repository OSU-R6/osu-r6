import { useEffect, useState } from 'react'
import { useNavigate, Navigate } from 'react-router-dom';

import ErrorMessage from '../components/ErrorMessage'
import Banner from '../components/Banner'

function PasswordRecovery() {

    const API = process.env.REACT_APP_API_URL
    const navigate = useNavigate()
    const [error, setError] = useState(false)
    const [errorMessage, setErrorMessage] = useState('')
    const [success, setSuccess] = useState(false)
    const [formData, setFormData] = useState({
        email: ''
    })

    const passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*()_+}{":;'?/>.<,`\]\\[-])(?=.*[a-zA-Z]).{8,}$/

    const inputStyle = "appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
    const inputErrorStyle = "appearance-none border-2 border-red-500 rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"


    const sendEmail = async () => {
        try {
            const response = await fetch(API + '/users/reset-password/' , {
                method: 'POST',
                body: JSON.stringify({
                    email: formData.email
                }),
                headers: {
                    'Content-type': 'application/json',
                }
            })
            if(response.status === 200 || response.status === 401) {
                setSuccess(true)
            } else {
                setError(true)
                setErrorMessage('Unable to send email')
            }
        } catch (err) {
            console.log(err)
        }
    }

    const handleChange = (e) => {
        const { name, value } = e.target
        setFormData(prevState => ({
          ...prevState,
          [name]: value
        }))
    }

    return (
        <div classNmae='flex'>
            <div className="m-auto max-w-sm text-center my-5">
                <div className='mx-4'>
                    <div className='r6-font'>
                        {!success ?
                        <>
                        <div className='text-5xl text-osu my-3'>
                            Password Reset
                        </div>
                        <div className='text-white text-3xl my-3'>
                            Input your email to receive a new password reset link.
                        </div>
                        <form onSubmit={ async (e) => {
                            e.preventDefault()
                            const response = await sendEmail()
                        }}>
                            <input type='email' value={formData.email} onChange={handleChange} placeholder="Email" name='email' className='rounded-md pb-1 px-2 text-3xl my-2' required/>
                            {error && <ErrorMessage>{errorMessage}</ErrorMessage> }
                            <button type='submit' className='r6-font text-white text-3xl px-3 pb-1 rounded-md mt-3'>Send Password Link</button>
                        </form>
                        </>
                        :
                        <>
                        <div className='text-5xl text-osu my-3'>
                            Email Sent
                        </div>
                        <div className='text-white text-3xl my-3'>
                            If the email is valid, you will receive a password reset link.
                        </div>
                        <button onClick={() => navigate('/login')} className='r6-font text-white text-3xl px-3 pb-1 rounded-md mt-3'>Return To Login</button>
                        </>
                        }
                    </div>
                </div>
            </div>
        </div>
    )
}
export default PasswordRecovery