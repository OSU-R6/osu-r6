import { useState } from 'react'
import { useNavigate, Navigate } from 'react-router-dom';

import ErrorMessage from '../components/ErrorMessage'
import Banner from '../components/Banner'


async function checkEmailAvailibility(email) {
    try {
        const response = await fetch('http://localhost:8001/users/email-availibility/' + email)
        if(response.status == 200) return true
        else return false
    } catch (err) {
        return false
    }
}

async function checkIgnAvailibility(ign) {
    try {
        const response = await fetch('http://localhost:8001/users/ign-availibility/' + ign)
        if(response.status == 200) return true
        else return false
    } catch (err) {
        return false
    }
}

async function registerHandler(email, password, firstName, lastName, ign, role, invite){
    try {
        const response = await fetch('http://localhost:8001/users/', {
            method: 'POST',
            body: JSON.stringify({
                email: email,
                password: password,
                firstName: firstName,
                lastName: lastName,
                role: role,
                ign: ign
            }),
            credentials: 'include',
            headers: {
                'Authorization': "Bearer " + invite.toString(),
                'Content-type': 'application/json; charset=UTF-8',
              },
        })
        return response.status
    } catch (err) {
        return 500
    }
}



function Login() {
    const navigate = useNavigate()

    const [ email, setEmail ] = useState("")
    const [ password, setPassword ] = useState("")
    const [ confirmPassword, setConfirmPassword ] = useState("")
    const [ firstName, setFirstName ] = useState("")
    const [ lastName, setLastName ] = useState("")
    const [ ign, setIgn ] = useState("")
    const [ role, setRole ] = useState("")
    const [ invite, setInvite ] = useState("")
    const [ passwordMismatchError, setPasswordMismatchError ] = useState(false)
    const [ emailAvailibilityError, setEmailAvailibilityError ] = useState(false)
    const [ ignAvailibilityError, setIgnAvailibilityError ] = useState(false)
    const [ invalidTokenError, setInvalidTokenError ] = useState(false)
    const [ passError, setPassError ] = useState(false)
    const [ serverError, setServerError ] = useState(false)
    const [ success, setSuccess ] = useState(false)

    const inputStyle = "appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
    const inputErrorStyle = "appearance-none border-2 border-red-500 rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"

    const nameRegex = /^[a-zA-Z]*$/
    const passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*()_+}{":;'?/>.<,`\]\\[-])(?=.*[a-zA-Z]).{8,}$/

    return (
        <div className="flex justify-center items-center min-h-full py-24 px-6 sm:py-32 lg:px-8">
            {!success ?
                <div className="w-full max-w-lg">
                    <Banner>Create Account</Banner>
                    <form className="px-8 pt-6 pb-8 mb-4" onSubmit={ async (e) => {
                        e.preventDefault()
                        const emailAvailible = await checkEmailAvailibility(email)
                        if(!emailAvailible) setEmailAvailibilityError(true)
                        const ignAvailible = await checkIgnAvailibility(ign)
                        if(!ignAvailible) setIgnAvailibilityError(true)
                        if(emailAvailible && ignAvailible){
                            const registerStatus  = await registerHandler(email, password, firstName, lastName, ign, role, invite)
                            if(registerStatus == 201){
                                setSuccess(true)
                            } else if(registerStatus == 401) {
                                setInvalidTokenError(true)
                            } else {
                                setServerError(true)
                            }
                        }
                    }}>
                        <div className="mb-4">
                            <label className="block text-gray-700 text-white text-sm font-bold mb-2" htmlFor="email">Email</label>
                            <input className={emailAvailibilityError ? inputErrorStyle : inputStyle} value={email} onChange={e => {setEmail(e.target.value), setEmailAvailibilityError(false)}} id="email" type="email" placeholder="email" required/>
                            {emailAvailibilityError && <ErrorMessage>Email Already Linked To Account</ErrorMessage>}
                        </div>
                        <div className="mb-6">
                            <label className="block text-gray-700 text-white text-sm font-bold mb-2" htmlFor="password">Password</label>
                            <input className={passError ? inputErrorStyle : inputStyle} value={password} onChange={e => {
                                setPassword(e.target.value)
                                if(passwordRegex.test(e.target.value) || e.target.value === '') setPassError(false)
                                else setPassError(true)
                            }} id="password" type="password" placeholder="*************" required/>
                            {passError && <ErrorMessage>Password but be at least 8 characters and include an uppercase letter, lower case letter, number and a special character</ErrorMessage>}
                        </div>
                        <div className="mb-6">
                            <label className="block text-gray-700 text-white text-sm font-bold mb-2" htmlFor="confirmPassword">Confirm Password</label>
                            <input className={passError ? inputErrorStyle : inputStyle} value={confirmPassword} onChange={e => {
                                setConfirmPassword(e.target.value)
                                if(e.target.value != password)
                                    setPasswordMismatchError(true)
                                else
                                    setPasswordMismatchError(false)
                                }} id="confirmPassword" type="password" placeholder="*************" required/>
                            {passwordMismatchError && <ErrorMessage>Passwords Must Match</ErrorMessage>}

                        </div>
                        <div className="mb-4">
                            <label className="block text-gray-700 text-white text-sm font-bold mb-2" htmlFor="firstName">First Name</label>
                            <input className={inputStyle} value={firstName} onChange={e => { if(nameRegex.test(e.target.value) || e.target.value === '') setFirstName(e.target.value)}} id="firstName" type="text" placeholder="First Name" required/>
                        </div>
                        <div className="mb-4">
                            <label className="block text-gray-700 text-white text-sm font-bold mb-2" htmlFor="lastName">Last Name</label>
                            <input className={inputStyle} value={lastName} onChange={e => { if(nameRegex.test(e.target.value) || e.target.value === '') setLastName(e.target.value)}} id="lastName" type="text" placeholder="Last Name" required/>
                        </div>
                        <div className="mb-4">
                            <label className="block text-gray-700 text-white text-sm font-bold mb-2" htmlFor="ign">In Game Name</label>
                            <input className={ignAvailibilityError ? inputErrorStyle : inputStyle} value={ign} onChange={e => {setIgn(e.target.value), setIgnAvailibilityError(false)}} id="ign" type="text" placeholder="" required/>
                            {ignAvailibilityError && <ErrorMessage>In Game Name Already Linked To Account</ErrorMessage>}
                        </div>
                        <div className="mb-4">
                            <label className="block text-gray-700 text-white text-sm font-bold mb-2" htmlFor="role">Role</label>
                            <select className="block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none sm:text-sm" onChange={e => {setRole(e.target.value)}} id="role" required>
                                <option>Entry</option>
                                <option>Flex</option>
                                <option>Support</option>
                                <option>IGL</option>
                                <option>Substitute</option>
                            </select>
                        </div>
                        <div className="mb-4">
                            <label className="block text-gray-700 text-white text-sm font-bold mb-2" htmlFor="invite">Invite Token</label>
                            <input className={invalidTokenError ? inputErrorStyle : inputStyle} value={invite} onChange={e => {setInvite(e.target.value), setInvalidTokenError(false)}} id="invite" type="text" required/>
                            {invalidTokenError && <ErrorMessage>Invalid Invite</ErrorMessage>}
                            {serverError && <ErrorMessage>Error Creating Account</ErrorMessage>}
                        </div>
                        <div className="flex justify-center">
                            <button className="rounded-md bg-osu hover:bg-osu-dark px-10 py-2.5 text-sm font-semibold text-white shadow-sm" type="submit">Create</button>
                        </div>
                    </form>
                </div>
                :
                <div>
                    <div className="flex flex-col justify-center px-8 pt-6 pb-8 mb-4">
                        <h1 className="text-xl text-white font-semi-bold mb-6">Account Created!</h1>
                        <button className="rounded-md bg-osu hover:bg-osu-dark px-10 py-2.5 text-sm font-semibold text-white shadow-sm" onClick={async () => { navigate('/login') }}>Login</button>
                    </div>
                </div>
            }
        </div>
    )      
}

export default Login
