import AdminNav from '../components/AdminNav'
import AdminPanel from '../components/AdminPanel'
import InvitePanel from '../components/InvitePanel'
import MatchPanel from '../components/MatchPanel'
import EventPanel from '../components/EventPanel'
import UserManagementPanel from '../components/UserManagementPanel'
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
                <AdminNav activePanel={activePanel} onStateChange={handleActivePanelChange}/>
                <div className='col-span-6 sm:col-span-7 md:col-span-8 2xl:col-span-9'>
                    <div className='mb-4'>
                        { activePanel === 0 ? (
                        <AdminPanel title="Invites">
                            <InvitePanel/>
                        </AdminPanel>
                        ) : activePanel === 1 ? (
                        <AdminPanel title="Users">
                            <UserManagementPanel/>
                        </AdminPanel>
                        ) : activePanel === 2 ? (
                        <AdminPanel title="Matches">
                            <MatchPanel/>
                        </AdminPanel>
                        ) : activePanel === 3 && (
                            <AdminPanel title="Events">
                                <EventPanel/>
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