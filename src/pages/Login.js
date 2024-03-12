import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate, Navigate } from 'react-router-dom';

import ErrorMessage from '../components/ErrorMessage'
import Banner from '../components/Banner'

import { login } from '../redux/loginReducer'
import { setUser } from '../redux/userReducer'
import { isloggedIn, getUser } from '../redux/selectors'
import SuccessMessage from '../components/SuccessMessage';

const API = process.env.REACT_APP_API_URL

async function loginHandler(email, password) {
    try {
        const response = await fetch(API + '/users/login', {
            method: 'POST',
            body: JSON.stringify({
                email: email,
                password: password
            }),
            credentials: 'include',
            headers: {
                'Content-type': 'application/json',
            }
        })
        return response.status
    } catch (err) {
        return 500
    }
}

async function getUserInfo(){
    const response = await fetch(API + '/auth', {
            method: 'GET',
            credentials: 'include'
        })
    const responseBody = await response.json()
    return responseBody
}

function Login() {
    const dispatch = useDispatch()
    const loggedIn = useSelector(isloggedIn)
    const user = useSelector(getUser)
    const navigate = useNavigate()

    const [ userEmail, setUserEmail ] = useState("")
    const [ password, setPassword ] = useState("")
    const [ userError, setUserError ] = useState(false)
    const [ passError, setPassError ] = useState(false)
    const [ loginError, setLoginError ] = useState(false)
    const [ serverError, setServerError ] = useState(false)
    const [ verificationError, setVerificationError ] = useState(false)
    const [ verificationSent, setVerificationSent ] = useState(false)

    const inputStyle = "appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
    const inputErrorStyle = "appearance-none border-2 border-red-500 rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"

    const resendVerificationHandler = async (email) => {
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
            setVerificationError(false)
            setVerificationSent(true)
            return response.status
        } catch (err) {
            console.log(err)
        }
    }

    return (
        <div className="flex justify-center items-center min-h-full my-4 lg:my-24 py-12 px-6 sm:py-32 lg:px-8">
            {!loggedIn ?
                <div className="max-w-md w-full max-w-xs">
                    <Banner>USER LOGIN</Banner>
                    <form className="px-8 pt-6 pb-8 mb-4" onSubmit={ async (e) => {
                        e.preventDefault()
                        setLoginError(false)
                        setUserError(false)
                        setPassError(false)
                        setServerError(false)
                        setVerificationError(false)
                        setVerificationSent(false)
                        var loginStatus  = await loginHandler(userEmail, password)
                        if(loginStatus == 200){
                            dispatch(login())
                            dispatch(setUser(await getUserInfo()))
                        } else if(loginStatus == 401) {
                            setLoginError(true)
                        } else if(loginStatus == 403) {
                            setVerificationError(true)
                        } else {
                            setServerError(true)
                        }
                    }}>
                        <div className="mb-4">
                            <label className="block text-gray-700 text-white text-sm font-bold mb-2" htmlFor="email">
                                Email
                            </label>
                            <input className={userError ? inputErrorStyle : inputStyle} value={userEmail} onChange={e => setUserEmail(e.target.value)} id="email" type="text" placeholder="Email"/>
                            {userError && <ErrorMessage>Please enter an email</ErrorMessage>}
                        </div>
                        <div className="mb-3">
                            <label className="block text-gray-700 text-white text-sm font-bold mb-2" htmlFor="password">
                                Password
                            </label>
                            <input className={passError ? inputErrorStyle : inputStyle} value={password} onChange={e => setPassword(e.target.value)} id="password" type="password" placeholder="*************"/>
                            {passError && <ErrorMessage>Please enter a password</ErrorMessage>}
                            {loginError && <ErrorMessage>Email or password are not valid</ErrorMessage>}
                            {serverError && <ErrorMessage>Unable to reach server</ErrorMessage>}
                            {verificationError && 
                            <>
                            <ErrorMessage>Email not verified. Check your email.</ErrorMessage>
                            <button className='text-white text-xs' type="button" onClick={() => resendVerificationHandler(userEmail)}>Resend Email</button>
                            </>
                            }
                            {verificationSent && <SuccessMessage>Verification email sent</SuccessMessage>}
                        </div>
                        <div className="flex justify-center my-4">
                            <button className="rounded-md bg-osu hover:bg-osu-dark px-10 py-2.5 text-sm font-semibold text-white shadow-sm" type="submit">
                                Log in
                            </button>
                        </div>
                        <div className="flex justify-center mb-2 text-white r6-font text-2xl">
                            <button className="" type="button" onClick={() => navigate('/register')}>
                                Don't have an Account? Register
                            </button>
                        </div>
                        <div className="flex justify-center mb-2 text-white r6-font text-2xl">
                            <button className="" type="button" onClick={() => navigate('/password-recovery/request')}>
                                Forgot Password
                            </button>
                        </div>
                    </form>
                </div>
                :
                <div>
                    <div className="flex flex-col justify-center px-8 pt-6 pb-8 mb-4">
                        {user.data != null && <h1 className="text-xxl text-white font-semi-bold m-auto pb-4">Hey {user.data.ign}!</h1>}
                        <button className="rounded-md bg-osu hover:bg-osu-dark px-10 py-2.5 text-sm font-semibold text-white shadow-sm m-auto" onClick={async () => { navigate('/account') }}>My Account</button>
                    </div>
                </div>
            }
        </div>
    )
}

export default Login
