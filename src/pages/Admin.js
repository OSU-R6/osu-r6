import Banner from '../components/Banner'
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux'
import { isloggedIn, getUser } from '../redux/selectors'
import { Navigate} from 'react-router-dom';

function Admin() {

    const loggedIn = useSelector(isloggedIn)
    const user = useSelector(getUser)

    useEffect(() => {
    }, [])


    return(
        <>
            { loggedIn && user.data.admin ? (
            <>
            <Banner>Admin Panel</Banner>
            </>
            ) : ( <Navigate to='/login'/> )}
        </>
    )
} export default Admin;