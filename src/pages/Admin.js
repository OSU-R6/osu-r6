import Banner from '../components/Banner'
import AdminPanel from '../components/AdminPanel'
import InvitePanel from '../components/InvitePanel'
import MatchPanel from '../components/MatchPanel'
import UserManagementPanel from '../components/UserManagementPanel'
import { useSelector } from 'react-redux'
import { isloggedIn, getUser } from '../redux/selectors'
import { Navigate} from 'react-router-dom'

function Admin() {

    const loggedIn = useSelector(isloggedIn)
    const user = useSelector(getUser)

    return(
        <>
            <Banner>Admin Panel</Banner>
            <div className='my-4 text-white text-center text-lg'>
                Use this page to manage invites, user accounts, matches and events.
            </div>
            { loggedIn && user.data.admin ? (
            <div className='grid grid-cols-12 gap-4 m-4'>
                <AdminPanel title="Invites">
                    <InvitePanel/>
                </AdminPanel>

                <AdminPanel title="Users">
                    <UserManagementPanel/>
                </AdminPanel>

                <AdminPanel title="Matches/Events">
                    <MatchPanel/>
                </AdminPanel>
            </div>
            ) : ( <Navigate to='/login'/> )}
        </>
    )
} export default Admin