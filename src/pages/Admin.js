import AdminNav from '../components/AdminNav'
import AdminPanel from '../components/AdminPanel'
import InvitesAP from '../components/InvitesAP'
import MatchesAP from '../components/MatchesAP'
import EventsAP from '../components/EventsAP'
import UsersAP from '../components/UsersAP'
import TeamsAP from '../components/TeamsAP'
import ProspectsAP from '../components/ProspectsAP'
import { useSelector } from 'react-redux'
import { isloggedIn, getUser } from '../redux/selectors'
import { useState } from 'react'
import { Navigate} from 'react-router-dom'

function Admin() {

    const loggedIn = useSelector(isloggedIn)
    const user = useSelector(getUser)
    
    const [ activePanel, setActivePanel ] = useState(0)

    const handleActivePanelChange = (newState) => {
        setActivePanel(newState);
    }

    return(
        <>
        { loggedIn && user.data.admin ? (
            <>
            <div className='grid grid-cols-10'>
                <div className='col-span-12 sm:col-span-3 md:col-span-2 2xl:col-span-1'>
                    <AdminNav activePanel={activePanel} onStateChange={handleActivePanelChange}/>
                </div>
                <div className='col-span-12 sm:col-span-7 md:col-span-8 2xl:col-span-9'>
                    <div className='mb-4'>
                        { activePanel === 0 ? (
                        <AdminPanel title="Invites">
                            <InvitesAP/>
                        </AdminPanel>
                        ) : activePanel === 1 ? (
                        <AdminPanel title="Users">
                            <UsersAP/>
                        </AdminPanel>
                        ) : activePanel === 2 ? (
                        <AdminPanel title="Teams">
                            <TeamsAP/>
                        </AdminPanel>
                        ) : activePanel === 3 ? (
                        <AdminPanel title="Matches">
                            <MatchesAP/>
                        </AdminPanel>
                        ) : activePanel === 4 ? (
                        <AdminPanel title="Events">
                            <EventsAP/>
                        </AdminPanel>
                        ) : activePanel === 5 && (
                        <AdminPanel title="Prospects">
                            <ProspectsAP/>
                        </AdminPanel>
                        )}
                    </div>
                </div>
            </div>
            </>
            ) : ( <Navigate to='/login'/> )}
        </>
    )
} export default Admin