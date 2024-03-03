const EventCard = ({ event }) => {

    const dateObj = new Date(event.date);
    event.timeOnly = dateObj.toLocaleTimeString('en-US', {
        hour: 'numeric',
        minute: '2-digit',
        hour12: true
    })
    event.dateOnly = dateObj.toLocaleDateString('en-US', {
        month: 'short',
        day: '2-digit',
        year: 'numeric'
    })

    return (
        <div className='text-osu r6-font text-4xl text-center my-4'>
            <div className='text-white text-5xl'>
                {event.type}
            </div>
            <div className='text-osu text-4xl'>
                {event.dateOnly} @ {event.timeOnly}
            </div>
            { event.description != null && 
            <div className='text-white text-3xl'>
                {event.description}
            </div>
            }
        </div>
    )
} 
export default EventCard