import React from 'react';
import { useState } from "react";
import { NavLink, useNavigate } from 'react-router-dom';
import { AiOutlineMenu, AiOutlineClose, AiOutlineLeft, AiOutlineRight } from "react-icons/ai";

function StyledNavLink(props) {
    const activeStyle = "font-scoutCR text-white rounded-lg px-2.5 sm:my-0 my-2 xl:text-5xl text-4xl"
    const inactiveStyle = "font-scoutCR text-osu hover:text-white px-2.5 sm:my-0 md:my-2 xl:text-5xl text-4xl"

    return (
        <NavLink to={props.to} onClick={props.onClick} className={({isActive})=> isActive ? activeStyle : inactiveStyle}>
            {props.children}
        </NavLink>
    )
}

function Navigation() {
    const navigate = useNavigate()
    const [navOpen, setNavOpen] = useState(false);

    return (
        <nav className="lg:flex flex-wrap items-center justify-between mx-0 px-8 sm:pb-2 pt-2 pb-4">
            <div className="flex items-center lg:block justify-between">
                <img 
                    src="/images/image6.png"
                    className="sm:w-36 sm:h-36 h-24 w-24"
                    alt="Rainbow Six Beaver Logo"
                    onClick={() => navigate("/")}
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
            <div className="flex sm:items-center sm:justify-between ">
                {navOpen && <div className="flex justify-center w-full sm:fit-content items-center sm:flex-row flex-col">
                    <StyledNavLink to={"/about"} onClick={() => setNavOpen(false)}>The Program</StyledNavLink>
                    <StyledNavLink to={"/"} onClick={() => setNavOpen(false)}>Try Out</StyledNavLink>
                    <div className="hidden sm:flex inline-block bg-osu w-0.5 h-10 mx-3"/>
                    <StyledNavLink to={"/"} onClick={() => setNavOpen(false)}>Black Team</StyledNavLink>
                    <StyledNavLink to={"/"} onClick={() => setNavOpen(false)}>Orange Team</StyledNavLink>
                    <div className="hidden sm:flex inline-block bg-osu w-0.5 h-10 mx-3"/>
                    <StyledNavLink to={"/coaching"} onClick={() => setNavOpen(false)}>Coaching</StyledNavLink>
                    <StyledNavLink to={"/alumni"} onClick={() => setNavOpen(false)}>Alumni</StyledNavLink>
                </div>}
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