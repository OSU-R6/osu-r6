function ServerError() {
    return(
        <>
        <div className='flex my-4'>
            <div className='text-white m-auto'>
                <span>Unable to contact Server</span>
                <span>Please try again later</span>
            </div>
        </div>
        </>
    )
} export default ServerError