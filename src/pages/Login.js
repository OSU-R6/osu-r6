import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom';

import ErrorMessage from '../components/ErrorMessage'
import Banner from '../components/Banner'

import { login } from '../redux/loginReducer'
import { setUser } from '../redux/userReducer'
import { isloggedIn, getUser } from '../redux/selectors'

async function loginHandler(email, password) {
    try {
        const response = await fetch('http://localhost:8001/users/login', {
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
    const response = await fetch('http://localhost:8001/' + 'users/authenticate', {
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

    const [ username, setUserName ] = useState("")
    const [ password, setPassword ] = useState("")
    const [ userError, setUserError ] = useState(false)
    const [ passError, setPassError ] = useState(false)
    const [ loginError, setLoginError ] = useState(false)
    const [ serverError, setServerError ] = useState(false)

    const inputStyle = "appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
    const inputErrorStyle = "appearance-none border-2 border-red-500 rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"

    return (
        <div className="flex justify-center items-center min-h-full py-24 px-6 sm:py-32 lg:px-8">
            {!loggedIn ?
                <div className="max-w-md w-full max-w-xs">
                    <Banner>USER LOGIN</Banner>
                    <form className="px-8 pt-6 pb-8 mb-4" onSubmit={ async (e) => {
                        e.preventDefault()
                        var loginStatus  = await loginHandler(username, password)
                        if(loginStatus == 200){
                            setLoginError(false)
                            setUserError(false)
                            setPassError(false)
                            setServerError(false)
                            dispatch(login())
                            console.log("hello?")
                            dispatch(setUser(await getUserInfo()))
                            console.log("hello2")
                        } else if(loginStatus == 401) {
                            setLoginError(true)
                            setUserError(false)
                            setPassError(false)
                            setServerError(false)
                        } else {
                            setServerError(true)
                            setLoginError(false)
                            setUserError(false)
                            setPassError(false)
                        }
                    }}>
                        <div className="mb-4">
                            <label className="block text-gray-700 text-white text-sm font-bold mb-2" htmlFor="username">
                                Username
                            </label>
                            <input className={userError ? inputErrorStyle : inputStyle} value={username} onChange={e => setUserName(e.target.value)} id="username" type="text" placeholder="Username"/>
                            {userError && <ErrorMessage>Please enter a username</ErrorMessage>}
                        </div>
                        <div className="mb-6">
                            <label className="block text-gray-700 text-white text-sm font-bold mb-2" htmlFor="password">
                                Password
                            </label>
                            <input className={passError ? inputErrorStyle : inputStyle} value={password} onChange={e => setPassword(e.target.value)} id="password" type="password" placeholder="*************"/>
                            {passError && <ErrorMessage>Please enter a password</ErrorMessage>}
                            {loginError && <ErrorMessage>Username or password are not valid</ErrorMessage>}
                            {serverError && <ErrorMessage>Unable to reach server</ErrorMessage>}
                        </div>
                        <div className="flex justify-center">
                            <button className="rounded-md bg-osu hover:bg-osu-dark px-10 py-2.5 text-sm font-semibold text-white shadow-sm" type="submit">
                                Log in
                            </button>
                        </div>
                    </form>
                </div>
                :
                <div>
                    <div className="flex flex-col justify-center px-8 pt-6 pb-8 mb-4">
                        <h1 className="text-xl text-white font-semi-bold mb-6">You are currently logged in as {user.data.firstName} "{user.data.ign}" {user.data.lastName}</h1>
                        <button className="rounded-md bg-osu hover:bg-osu-dark px-10 py-2.5 text-sm font-semibold text-white shadow-sm" onClick={async () => { navigate('/account') }}>Account</button>
                    </div>
                </div>
            }
        </div>
    )
}

export default Login
