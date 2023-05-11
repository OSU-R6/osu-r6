import React from 'react';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Nav } from 'react-bootstrap';
import Navbar from 'react-bootstrap/Navbar';
import { BsDiscord, BsInstagram, BsTwitter } from "react-icons/bs";
import { useDispatch, useSelector } from 'react-redux'

import { logout } from '../redux/loginReducer'
import { isloggedIn } from '../redux/selectors'

function Footer() {
    const loggedIn = useSelector(isloggedIn)

    const navigate = useNavigate()
    const dispatch = useDispatch()

    async function logoutHandler(){
        const response = await fetch('http://localhost:8001/users/logout', {
            method: 'POST',
            credentials: 'include'
        })
        if(response.status == 200){
            dispatch(logout())
            navigate('/')
        }
    }

    return (
        <div className="footer">
            <Navbar>
                <Navbar.Collapse className="justify-content-center">
                        <Nav>
                            <Nav.Item>
                                <div className="icon mx-2"><Nav.Link href="https://discord.gg/zYgcRtxsGv" target="_blank"><BsDiscord /></Nav.Link></div>
                            </Nav.Item>
                            <Nav.Item>
                                <div className="icon mx-2"><Nav.Link href="#" target="_blank"><BsInstagram /></Nav.Link></div>
                            </Nav.Item>
                            <Nav.Item>
                                <div className="icon mx-2"><Nav.Link href="#" target="_blank"><BsTwitter /></Nav.Link></div>
                            </Nav.Item>
                        </Nav>
                </Navbar.Collapse>
            </Navbar>
            <Navbar>
                <Navbar.Collapse className="justify-content-center">
                    <Nav>
                        {loggedIn ? (
                            <>
                            <Nav.Item>
                                <button className="rounded-md bg-osu hover:bg-osu-dark px-10 py-2.5 text-sm font-semibold text-white shadow-sm"
                                    onClick={async () => {
                                        navigate('/account')
                                    }}
                                >Account</button>
                            </Nav.Item>
                            <Nav.Item>
                                <button className="rounded-md bg-osu hover:bg-osu-dark px-10 py-2.5 text-sm font-semibold text-white shadow-sm" onClick={async () => { await logoutHandler() }}>Log out</button>
                            </Nav.Item>
                            </>
                        ) : (
                            <Nav.Item>
                                <button className="rounded-md bg-osu hover:bg-osu-dark px-10 py-2.5 text-sm font-semibold text-white shadow-sm"
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
                <Navbar.Collapse className="justify-content-center">
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