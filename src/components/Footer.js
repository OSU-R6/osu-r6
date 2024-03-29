import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { BsDiscord, BsInstagram, BsTwitter, BsTiktok } from 'react-icons/bs'
import { useDispatch, useSelector } from 'react-redux'
import { setUser } from '../redux/userReducer'

import { logout } from '../redux/loginReducer'
import { clearUser } from '../redux/userReducer'
import { isloggedIn, getUser } from '../redux/selectors'

function Footer() {
    const loggedIn = useSelector(isloggedIn)
    const user = useSelector(getUser)
    const navigate = useNavigate()
    const dispatch = useDispatch()
    
    const [teams, setTeams] = useState([])

    const API = process.env.REACT_APP_API_URL

    useEffect(() => {
        getTeams()
        checkLogin()
    }, [])

    const getTeams = async () => {
        try  {
        const response = await fetch(API + '/teams/')
        const responseBody = await response.json()
        setTeams(responseBody)
        } catch (err) {
            setTeams([])
        }
    } 

    const checkLogin = async () => {
        try{
            if(loggedIn){
                const response = await fetch(API + '/auth', {
                    credentials: 'include'
                })
                if(response.status == 200){
                    const responseBody = await response.json()
                    dispatch(setUser(responseBody))
                }
                else if(response.status == 401){
                    logoutHandler()
                }
            }
        } catch {
            logoutHandler()
        }
    }

    async function logoutHandler(){
        try {
            const response = await fetch(API + '/users/logout', {
                method: 'POST',
                credentials: 'include'
            })
            if(response.status == 200){
                dispatch(logout())
                dispatch(clearUser())
                navigate('/')
            }
        } catch (err) {
            dispatch(logout())
            dispatch(clearUser())
        }
    }

    return (
        <div className='bg-osu pt-1 mt-5'>
            <div className='footer p-5 grid grid-cols-12 bg-black'>


                <div className="col-span-12 md:col-span-1"/>
                <div className='col-span-12 md:col-span-5 lg:col-span-4 pl-4'>
                    <div className='text-white r6-font text-3xl pb-3'>OREGON STATE RAINBOW SIX</div>
                    <div className='text-lg font-semibold text-osu'>
                        <button className='py-1 hover:text-white shadow-sm block' onClick={async () => {navigate('/')}}>Home</button>
                        {teams.length > 0 && teams.map((team, i) => (
                            <button className='py-1 hover:text-white shadow-sm block' key={i} onClick={async () => {navigate('/team/' + team.id)}}>{team.name}</button>
                        ))}
                        <button className='py-1 hover:text-white shadow-sm block' onClick={async () => {navigate('/about')}}>About</button>
                        <button className='py-1 hover:text-white shadow-sm block' onClick={async () => {navigate('/matches')}}>Matches</button>
                        <button className='py-1 hover:text-white shadow-sm block' onClick={async () => {navigate('/announcements')}}>Announcements</button>
                        <button className='py-1 hover:text-white shadow-sm block' onClick={async () => {navigate('/community')}}>Community</button>
                        <button className='py-1 hover:text-white shadow-sm block' onClick={async () => {navigate('/tryout')}}>Try Out</button>
                    </div>
                </div>
                <div className='col-span-12 md:col-span-5 lg:col-span-3 mt-6 md:mt-0 pl-4'>
                    <div className='text-white r6-font text-3xl pb-3'>PLAYER TOOLS</div>
                    <div className='text-lg font-semibold text-osu'>
                        {loggedIn ? (
                            <>
                            <button className='py-1 hover:text-white shadow-sm block' onClick={async () => {navigate('/account')}}>Account</button>
                            <button className='py-1 hover:text-white shadow-sm block' onClick={async () => { navigate('/player/' + user.data.ign) }}>Profile</button>
                            { user.data != null && user.data.admin &&
                                <button className='py-1 hover:text-white shadow-sm block' onClick={async () => { navigate('/admin') }}>Admin</button>
                            }
                            <button className='py-1 hover:text-white shadow-sm block' onClick={async () => { await logoutHandler() }}>Log out</button>
                            </>
                        ) : (
                            <button className='py-1 hover:text-white shadow-sm block' onClick={async () => {navigate('/login')}}>Player Login</button>
                        )}
                    </div>
                </div>
                <div className="col-span-12 md:col-span-1 lg:col-span-4"/>
                <div className="col-span-12 mt-4"/>


                <div className="col-span-1"/>
                <div className='col-span-10 pt-0.5 bg-osu my-4'></div>
                <div className="col-span-1"/>
                

                <div className='col-span-12 flex'>
                    <div className='m-auto flex mt-2 mb-4'>
                        <div className='icon mx-2'><a href='https://discord.gg/osuesports' target='_blank'><BsDiscord /></a></div>
                        <div className='icon mx-2'><a href='https://twitter.com/OSUesports' target='_blank'><BsTwitter /></a></div>
                        <div className='icon mx-2'><a href='https://www.instagram.com/osu.esports/' target='_blank'><BsInstagram /></a></div>
                        <div className='icon mx-2'><a href='https://www.tiktok.com/@osuesports' target='_blank'><BsTiktok /></a></div>
                    </div>
                </div>


                <div className='m-auto col-span-12'>
                    &copy; Oregon State Rainbow Six
                </div>


            </div>
        </div>
    )
}; 

export default Footer;