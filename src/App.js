import React from 'react'
import {
    Routes,
    Route,
    Link,
    NavLink,
    useNavigate,
    useParams,
    Outlet,
    Navigate
} from 'react-router-dom'

import About from './pages/About'
import Account from './pages/Account'
import Admin from './pages/Admin'
import Alumni from './pages/Alumni'
import Coaching from './pages/Coaching'
import Community from './pages/Community'
import Footer from './components/Footer'
import Home from './pages/Home'
import Login from './pages/Login'
import Navigation from './components/Nav'
import NotFound from './pages/NotFound'
import Player from './pages/Player'
import Register from './pages/Register'
import Team from './pages/Team'
import TryOut from './pages/TryOut'

import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

function App() {

    const { pathname } = useLocation();

    useEffect(() => {
        window.scrollTo(0, 0);
        }, [pathname]);

    return (
        <>
            <div className="flex flex-col min-h-screen">
                <Navigation />
                <div className='flex-1'>
                    <Routes>
                        <Route path="/404" element={<NotFound />} />
                        <Route exact path="/" element={<Home />} />
                        <Route path="/about" element={<About />} />
                        <Route path="/account" element={<Account />} />
                        <Route path="/alumni" element={<Alumni />} />
                        <Route path="/admin" element={<Admin />} />
                        <Route path="/coaching" element={<Coaching />} />
                        <Route path="/community" element={<Community />} />
                        <Route path="/tryout" element={<TryOut />} />
                        <Route path="/login" element={<Login />} />
                        <Route path="/player">
                            <Route path=":player" element={<Player />} />
                        </Route>
                        <Route path="/register" element={<Register />} />
                        <Route path="/team">
                            <Route path=":team" element={<Team />} />
                        </Route>
                        <Route path="*" element={<NotFound />} />
                    </Routes>
                </div>
                <Footer />
            </div>
        </>
    )
}

export default App;