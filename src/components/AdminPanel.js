import MiniBanner from '../components/MiniBanner'

const AdminPanel = (props) => {
    return (
        <>
            <div className='col-span-12 xl:col-span-6'>
                <MiniBanner>{props.title}</MiniBanner>
                {props.children}
            </div>

        </>
    )
} 
export default AdminPanel