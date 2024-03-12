import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { useNavigate, Navigate } from 'react-router-dom';

import ErrorMessage from '../components/ErrorMessage'
import Banner from '../components/Banner'

function PasswordRecovery() {

    const API = process.env.REACT_APP_API_URL
    const params = useParams()
    const navigate = useNavigate()
    const [error, setError] = useState(false)
    const [errorMessage, setErrorMessage] = useState('')
    const [validToken, setValidToken] = useState(false)
    const [success, setSuccess] = useState(false)
    const [email, setEmail] = useState(null)
    const [formData, setFormData] = useState({
        password: '',
        confirmPassword: ''
    })

    const passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*()_+}{":;'?/>.<,`\]\\[-])(?=.*[a-zA-Z]).{8,}$/

    const inputStyle = "appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
    const inputErrorStyle = "appearance-none border-2 border-red-500 rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"

    useEffect(() => {
        validateToken()
    }, [])

    const validateToken = async () => {
        try{
            const response = await fetch(API + '/users/reset-password/' + params.token, {
                method: 'POST'
            })
            if(response.status === 400){
                setValidToken(true)
            } else {
                setValidToken(false)
            }
        } catch (err) {
            setValidToken(false)
        }
    }

    const resetPassword = async () => {
        try {
            if(!error){
                const response = await fetch(API + '/users/reset-password/' + params.token, {
                    method: 'POST',
                    body: JSON.stringify({
                        password: formData.password
                    }),
                    headers: {
                        'Content-type': 'application/json',
                    }
                })
            
                if(response.status === 200){
                    setSuccess(true)
                } else if(response.status === 401){
                    setValidToken(false)
                } else {
                    setError(true)
                    setErrorMessage('Unable to reset password')
                }
            }
        } catch (err) {
            setError(true)
            setErrorMessage('Unable to reset password')
        }
    }

    const resendEmail = async () => {
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
            if(response.status === 200) {
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
                    {validToken ?
                        !success ?
                        <>
                        <div className='text-5xl text-osu r6-font my-3'>
                            Reset Password
                        </div>
                        <form onSubmit={ async (e) => {
                            e.preventDefault()
                            if(!error){
                                resetPassword()
                            }
                        }}>
                            <label className="block text-gray-700 text-white text-sm font-bold mb-2">
                                New Password
                            </label>
                            <input className={error? inputErrorStyle : inputStyle} type='password' placeholder='New Password' name='password' value={formData.password} onChange={ (e) => {
                                handleChange(e)
                                setError(false)
                                if(!passwordRegex.test(e.target.value)){
                                    setError(true)
                                    setErrorMessage('Password must contain at least 8 characters, one uppercase letter, one lowercase letter, one number, and one special character')
                                } else {
                                    setError(false)
                                }
                            }} required/>
                            <label className="block text-gray-700 text-white text-sm font-bold my-2">
                                Confirm Password
                            </label>
                            <input className={error? inputErrorStyle : inputStyle} type='password' placeholder='Confirm Password' name='confirmPassword' value={formData.confirmPassword} onChange={ (e) => {
                                handleChange(e)
                                setError(false)
                                if(e.target.value != formData.password){
                                    setError(true)
                                    setErrorMessage('Passwords do not match')
                                } else {
                                    setError(false)
                                }
                            }} required/>
                            {error && <ErrorMessage>{errorMessage}</ErrorMessage> }
                            <button className="rounded-md bg-osu hover:bg-osu-dark px-10 py-2.5 text-sm font-semibold text-white shadow-sm mt-4" type="submit">
                                Reset Password
                            </button>
                        </form>
                        </>
                        :
                        <>
                            <div className='r6-font'>
                                <div className='text-5xl text-osu my-3'>
                                    Password Reset!
                                </div>   
                            </div>
                        </>
                    :
                        <div className='r6-font'>
                            <div className='text-5xl text-osu my-3'>
                                Expired or Invalid Token
                            </div>
                            <div className='text-white text-3xl my-3'>
                                The token you are using is invalid or expired.
                            </div>
                            <button onClick={() => navigate('/password-recovery/request')} className='r6-font text-white  text-3xl px-3 pb-1 rounded-md mt-3'>Request New Link</button>
                        </div>
                    }
                </div>
            </div>
        </div>
    )
}
export default PasswordRecovery