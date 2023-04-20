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

import Navigation from './components/Nav'
import Footer from './components/Footer'
import Home from './pages/Home'
import About from './pages/About'
import Coaching from './pages/Coaching'
import Alumni from './pages/Alumni'



function Roster() {
    
}

function Player() {
    
}

function NotFound() {
    
}

function App() {
    return (
        <>
        <Navigation />
        <Routes>
            <Route exact path="/" element={<Home />} />
            <Route path="/About" element={<About />} />
            <Route path="/Alumni" element={<Alumni />} />
            <Route path="/Coaching" element={<Coaching />} />
            <Route path="/Roster" element={<Roster />}>
                <Route path=":player" element={<Player />} />
            </Route>
            <Route path="*" element={<NotFound />} />
        </Routes>
        <Footer />
        </>
    )
}

export default App;