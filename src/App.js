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
import Login from './pages/Login'
import About from './pages/About'
import Coaching from './pages/Coaching'
import Alumni from './pages/Alumni'
import BlackTeam from './pages/BlackTeam'
import Player from './pages/Player'
import Roster from './pages/Roster'
import NotFound from './pages/NotFound'

function PlayerBlank() {
    return (
        <>
            <Outlet />
        </>
    )
}

// function NotFound() {
//     return (
//         <h1>Page Not found</h1>
//     );
// }

function App() {
    return (
        <>
            <Navigation />
            <Routes>
                <Route exact path="/" element={<Home />} />
                <Route path="/login" element={<Login />} />
                <Route path="/about" element={<About />} />
                <Route path="/alumni" element={<Alumni />} />
                <Route path="/blackteam" element={<BlackTeam />} />
                <Route path="/coaching" element={<Coaching />} />
                <Route path="/roster" element={<Roster />}/>
                <Route path="/player">
                    <Route path=":player" element={<Player />} />
                </Route>
                <Route path="*" element={<NotFound />} />
            </Routes>
            <Footer />
        </>
    )
}

export default App;