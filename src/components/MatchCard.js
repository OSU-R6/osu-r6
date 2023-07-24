import { BsTwitch } from 'react-icons/bs';

const MatchCard = ({ match }) => {

    const dateObj = new Date(match.date);
    match.timeOnly = dateObj.toLocaleTimeString('en-US', {
        hour: 'numeric',
        minute: '2-digit',
        hour12: true
    })
    match.dateOnly = dateObj.toLocaleDateString('en-US', {
        month: 'short',
        day: '2-digit',
        year: 'numeric'
    })

    return (
        <div className='text-osu r6-font text-4xl text-center my-4'>
            <div>
            <span className='text-white'>{match.Team.name}</span> VS <span className='text-white'>{match.opponent}</span>
            </div>
            <div>
                {match.dateOnly} @ {match.timeOnly}
            </div>
            {match.stream_link != null && match.stream_link != "" &&
            <div>
                <button className="rounded-md px-10 py-1 text-3xl font-semibold text-osu hover:text-white shadow-sm" onClick={async () => { window.open(match.stream_link, '_blank') }}>
                    <span className='flex items-center'>WATCH <BsTwitch className='ml-2'/></span>
                </button>
            </div>
            }
        </div>
    )
} 
export default MatchCard