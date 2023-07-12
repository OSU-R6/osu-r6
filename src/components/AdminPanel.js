import Banner from '../components/Banner'

const AdminPanel = (props) => {
    return (
        <>
            <div className=''>
                <Banner static>{props.title}</Banner>
                {props.children}
            </div>

        </>
    )
} 
export default AdminPanel