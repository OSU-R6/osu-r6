import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Nav } from 'react-bootstrap';
import Navbar from 'react-bootstrap/Navbar';
import { BsDiscord, BsInstagram, BsTwitter } from 'react-icons/bs';
import { useDispatch, useSelector } from 'react-redux'
import { setUser } from '../redux/userReducer'

import { logout } from '../redux/loginReducer'
import { clearUser } from '../redux/userReducer'
import { isloggedIn, getUser } from '../redux/selectors'

const API = process.env.REACT_APP_API_URL

function Footer() {
    const loggedIn = useSelector(isloggedIn)
    const user = useSelector(getUser)
    const navigate = useNavigate()
    const dispatch = useDispatch()

    useEffect(() => {
        checkLogin()
    }, [])

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
        const response = await fetch(API + '/users/logout', {
            method: 'POST',
            credentials: 'include'
        })
        if(response.status == 200){
            dispatch(logout())
            dispatch(clearUser())
            navigate('/')
        }
    }

    return (
        <div className='footer my-4'>
            <Navbar>
                <Navbar.Collapse className='justify-content-center'>
                        <Nav>
                            <Nav.Item>
                                <div className='icon mx-2'><Nav.Link href='https://discord.gg/zYgcRtxsGv' target='_blank'><BsDiscord /></Nav.Link></div>
                            </Nav.Item>
                            <Nav.Item>
                                <div className='icon mx-2'><Nav.Link href='#' target='_blank'><BsInstagram /></Nav.Link></div>
                            </Nav.Item>
                            <Nav.Item>
                                <div className='icon mx-2'><Nav.Link href='#' target='_blank'><BsTwitter /></Nav.Link></div>
                            </Nav.Item>
                        </Nav>
                </Navbar.Collapse>
            </Navbar>
            <Navbar>
                <Navbar.Collapse className='justify-content-center'>
                    <Nav>
                        {loggedIn ? (
                            <>
                            <Nav.Item>
                                <button className='px-1 py-2.5 text-lg font-semibold text-osu hover:text-white shadow-sm mx-2'
                                    onClick={async () => {
                                        navigate('/account')
                                    }}
                                >Account</button>
                            </Nav.Item>
                            <Nav.Item>
                                <button className='px-1 py-2.5 text-lg font-semibold text-osu hover:text-white shadow-sm mx-2' onClick={async () => { navigate('/player/' + user.data.ign) }}>Profile</button>
                            </Nav.Item>
                            { user.data != null && user.data.admin &&
                            <Nav.Item>
                                <button className='px-1 py-2.5 text-lg font-semibold text-osu hover:text-white shadow-sm mx-2' onClick={async () => { navigate('/admin') }}>Admin</button>
                            </Nav.Item>
                            }
                            <Nav.Item>
                                <button className='px-1 py-2.5 text-lg font-semibold text-osu hover:text-white shadow-sm mx-2' onClick={async () => { await logoutHandler() }}>Log out</button>
                            </Nav.Item>
                            </>
                        ) : (
                            <Nav.Item>
                                <button className='px-1 py-2.5 text-lg font-semibold text-osu hover:text-white shadow-sm mx-2'
                                    onClick={async () => {
                                        navigate('/login')
                                    }}
                                >Player Login</button>
                            </Nav.Item>
                        )}
                    </Nav>
                </Navbar.Collapse>
            </Navbar>
            <Navbar>
                <Navbar.Collapse className='justify-content-center'>
                    <Nav>

                        <Nav.Item>
                        &copy; Oregon State Rainbow Six
                        </Nav.Item>

                    </Nav>
                </Navbar.Collapse>
            </Navbar>
        </div>
    );
}; 

export default Footer;