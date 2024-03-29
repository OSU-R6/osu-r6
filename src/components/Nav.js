import React from 'react'
import { useEffect, useState } from 'react'
import { NavLink, useNavigate } from 'react-router-dom'
import { AiOutlineMenu, AiOutlineClose, AiOutlineLeft, AiOutlineRight } from "react-icons/ai"
import { set } from 'date-fns'

function StyledNavLink(props) {
    const activeStyle = "font-scoutCR text-osu rounded-lg px-2.5 sm:my-0 my-2 xl:text-5xl text-4xl"
    const inactiveStyle = "font-scoutCR text-white hover:text-orange px-2.5 sm:my-0 md:my-2 xl:text-5xl text-4xl"

    return (
        <NavLink to={props.to} onClick={props.onClick} className={({isActive})=> isActive ? activeStyle : inactiveStyle}>
            {props.children}
        </NavLink>
    )
}

function Navigation() {
    const navigate = useNavigate()
    const [navOpen, setNavOpen] = useState(true)
    const [teams, setTeams] = useState([])

    const API = process.env.REACT_APP_API_URL

    useEffect(() => {
        getTeams() 
        checkScreenSize()
    }, [])

    const checkScreenSize = () => {
        const screenWidth = window.innerWidth
        const isLarge = screenWidth >= 1024
        setNavOpen(isLarge)
    }

    const getTeams = async () => {
        try  {
        const response = await fetch(API + '/teams/')
        const responseBody = await response.json()
        setTeams(responseBody)
        } catch (err) {
            setTeams([])
        }
    }   

    return (
        <nav className="lg:flex flex-wrap items-center justify-between mx-0 px-8 sm:pb-2 pt-2 pb-4">
            <div className="flex items-center lg:block justify-between">
                <img 
                    src="/images/image6.png"
                    className="sm:w-36 sm:h-36 h-24 w-24"
                    alt="Rainbow Six Beaver Logo"
                    onClick={() => {
                        navigate("/")
                    }}
                />
                <button className="lg:hidden text-white" onClick={() => setNavOpen((prev) => !prev)}>
                    <div  className="object-cover text-osu hover:text-white">
                        {navOpen 
                            ?
                                <>
                                    <AiOutlineClose size={45} className="ml-4"/>
                                </>
                            :
                                <>
                                    <AiOutlineMenu size={45} className="ml-4"/>
                                </>
                        }
                    </div>
                </button>
            </div>
            <div className="flex lg:items-center lg:justify-between">
                {navOpen && 
                    <div className="flex justify-center w-full lg:fit-content items-center lg:flex-row flex-col">
                        <StyledNavLink to={"/about"}>The Program</StyledNavLink>
                        <div className="hidden lg:flex inline-block bg-osu w-0.5 h-10 mx-3"/>
                        {teams.length > 0 && teams.map((team, i) => (
                            <StyledNavLink key={i} to={"/team/" + team.id}>{team.name}</StyledNavLink>
                        ))}
                        <div className="hidden lg:flex inline-block bg-osu w-0.5 h-10 mx-3"/>
                        <StyledNavLink to={"/alumni"}>Alumni</StyledNavLink>
                        <StyledNavLink to={"/community"}>Community</StyledNavLink>
                        <div className="hidden lg:flex inline-block bg-osu w-0.5 h-10 mx-3"/>
                        <StyledNavLink to={"/tryout"}>Try Out</StyledNavLink>
                    </div>
                }
                <button className="hidden lg:flex text-white" onClick={() => setNavOpen((prev) => !prev)}>
                    <div  className="object-cover text-osu hover:text-white">
                        {navOpen 
                            ?
                                <>
                                    <AiOutlineRight size={45} className="ml-4" />
                                </>
                            :
                                <>
                                    <AiOutlineLeft size={45} className="ml-4"/>
                                </>
                        }
                    </div>
                </button>
            </div>
        </nav>
  );
}

export default Navigation;