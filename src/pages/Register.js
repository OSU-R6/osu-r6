import { useState } from 'react'
import { useNavigate, Navigate } from 'react-router-dom';

import ErrorMessage from '../components/ErrorMessage'
import Banner from '../components/Banner'

function Register() {
    const navigate = useNavigate()

    const [ formData, setFormData ] = useState({})
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

    const API = process.env.REACT_APP_API_URL

    async function checkEmailAvailibility(email) {
        try {
            const response = await fetch(API + '/users/email-availibility/' + email)
            if(response.status == 200) return true
            else return false
        } catch (err) {
            return false
        }
    }

    async function checkIgnAvailibility(ign) {
        try {
            const response = await fetch(API + '/users/ign-availibility/' + ign)
            if(response.status == 200) return true
            else return false
        } catch (err) {
            return false
        }
    }

    async function registerHandler(){
        try {
            console.log(formData)
            const response = await fetch(API + '/users/', {
                method: 'POST',
                body: JSON.stringify({
                    email: formData.email,
                    password: formData.password,
                    firstName: formData.firstName,
                    lastName: formData.lastName,
                    role: formData.role,
                    ign: formData.ign
                }),
                credentials: 'include',
                headers: {
                    'Authorization': "Bearer " + formData.invite.toString(),
                    'Content-type': 'application/json; charset=UTF-8',
                },
            })
            return response.status
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
        <div className="flex justify-center items-center min-h-full py-24 px-6 sm:py-32 lg:px-8">
            {!success ?
                <div className="w-full max-w-lg">
                    <Banner>Create Account</Banner>
                    <form className="px-8 pt-6 pb-8 mb-4" onSubmit={ async (e) => {
                        e.preventDefault()
                        const emailAvailible = await checkEmailAvailibility(formData.email)
                        if(!emailAvailible) setEmailAvailibilityError(true)
                        const ignAvailible = await checkIgnAvailibility(formData.ign)
                        if(!ignAvailible) setIgnAvailibilityError(true)
                        if(emailAvailible && ignAvailible){
                            const registerStatus  = await registerHandler()
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
                            <label className="block text-gray-700 text-white text-sm font-bold mb-2">Email</label>
                            <input className={emailAvailibilityError ? inputErrorStyle : inputStyle} name="email" value={formData.email} onChange={e => {handleChange(e); setEmailAvailibilityError(false);} } type="email" placeholder="email" required/>
                            {emailAvailibilityError && <ErrorMessage>Email Already Linked To Account</ErrorMessage>}
                        </div>
                        <div className="mb-6">
                            <label className="block text-gray-700 text-white text-sm font-bold mb-2">Password</label>
                            <input className={passError ? inputErrorStyle : inputStyle} name="password" value={formData.password} onChange={e => {
                                handleChange(e);
                                if(passwordRegex.test(e.target.value) || e.target.value === '') setPassError(false)
                                else setPassError(true)
                            }}type="password" placeholder="*************" required/>
                            {passError && <ErrorMessage>Password but be at least 8 characters and include an uppercase letter, lower case letter, number and a special character</ErrorMessage>}
                        </div>
                        <div className="mb-6">
                            <label className="block text-gray-700 text-white text-sm font-bold mb-2">Confirm Password</label>
                            <input className={passError ? inputErrorStyle : inputStyle} name="confirmPassword" value={formData.confirmPassword} onChange={e => {
                                handleChange(e);
                                if(e.target.value != formData.password)
                                    setPasswordMismatchError(true)
                                else
                                    setPasswordMismatchError(false)
                                }} type="password" placeholder="*************" required/>
                            {passwordMismatchError && <ErrorMessage>Passwords Must Match</ErrorMessage>}

                        </div>
                        <div className="mb-4">
                            <label className="block text-gray-700 text-white text-sm font-bold mb-2">First Name</label>
                            <input className={inputStyle} name="firstName" value={formData.firstName} onChange={e => { if(nameRegex.test(e.target.value)) handleChange(e)}} type="text" placeholder="First Name" required/>
                        </div>
                        <div className="mb-4">
                            <label className="block text-gray-700 text-white text-sm font-bold mb-2">Last Name</label>
                            <input className={inputStyle} name="lastName" value={formData.lastName} onChange={e => { if(nameRegex.test(e.target.value)) handleChange(e)}} type="text" placeholder="Last Name" required/>
                        </div>
                        <div className="mb-4">
                            <label className="block text-gray-700 text-white text-sm font-bold mb-2">In Game Name</label>
                            <input className={ignAvailibilityError ? inputErrorStyle : inputStyle} name="ign" value={formData.ign} onChange={e => {handleChange(e); setIgnAvailibilityError(false)}} type="text" placeholder="" required/>
                            {ignAvailibilityError && <ErrorMessage>In Game Name Already Linked To Account</ErrorMessage>}
                        </div>
                        <div className="mb-4">
                            <label className="block text-gray-700 text-white text-sm font-bold mb-2">Role</label>
                            <select className="block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none sm:text-sm" name="role" value={formData.role} onChange={handleChange} required>
                                <option value=''>Select a Role</option>
                                <option value="Entry">Entry</option>
                                <option value="Flex">Flex</option>
                                <option value="Support">Support</option>
                            </select>
                        </div>
                        <div className="mb-4">
                            <label className="block text-gray-700 text-white text-sm font-bold mb-2" htmlFor="invite">Invite Token</label>
                            <input className={invalidTokenError ? inputErrorStyle : inputStyle} name="invite" value={formData.invite} onChange={e => {handleChange(e); setInvalidTokenError(false)}} type="text" required/>
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
                    <div className="flex flex-col justify-center px-8 pt-6 pb-8 mb-4 text-center">
                        <div className="text-white font-semi-bold mb-6 r6-font text-6xl">Account Created!</div>
                        <div className="text-white font-semi-bold mb-6 r6-font text-4xl">Email verification required, check your email.</div>
                    </div>
                </div>
            }
        </div>
    )      
}

export default Register
