import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import ErrorMessage from '../components/ErrorMessage'
import Banner from '../components/Banner'

import { login, logout } from '../redux/loginReducer'
import { isloggedIn } from '../redux/selectors'

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

async function logoutHandler(){
    console.log("in Logout")
    const response = await fetch('http://localhost:8001/users/logout', {
        method: 'POST',
        credentials: 'include'
    })
    if(response.status == 200)
        return true
    else
        return false
}

function Login() {
    const dispatch = useDispatch()
    const loggedIn = useSelector(isloggedIn)

    const [ username, setUserName ] = useState("")
    const [ password, setPassword ] = useState("")
    const [ userError, setUserError ] = useState(false)
    const [ passError, setPassError ] = useState(false)
    const [ loginError, setLoginError ] = useState(false)
    const [ serverError, setServerError ] = useState(false)
    const [ logoutError, setLogoutError ] = useState(false)

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
                        <h1 className="text-xl text-white font-semi-bold mb-6">You are currently logged in</h1>
                        <button className="rounded-md bg-osu hover:bg-osu-dark px-10 py-2.5 text-sm font-semibold text-white shadow-sm"
                            onClick={async () => {
                                const logoutSuccess = await logoutHandler()
                                if(logoutSuccess) {
                                    setLogoutError(false)
                                    dispatch(logout())
                                } else {
                                    setLogoutError(true)
                                }
                                }
                            }
                        >
                            Log out
                        </button>
                        {logoutError && <ErrorMessage>Error Logging Out</ErrorMessage>}
                    </div>
                </div>
            }
        </div>
    )
}

export default Login
