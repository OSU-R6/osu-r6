import { BsTwitch } from 'react-icons/bs';

const MatchCard = ({ match, status }) => {

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
        <div className='text-osu r6-font my-12 flex'>
            <div className='grid grid-cols-9 m-auto items-center'>
                <div className='text-white col-span-4 text-5xl lg:text-6xl text-right'>{match.Team.name}</div>
                <div className='col-span-1 text-3xl lg:text-4xl text-center pt-3 mx-2'>VS</div>
                <div className='text-white col-span-4 text-5xl lg:text-6xl float-left'>{match.opponent}</div>
                {status == "past"  && match.team_score != null && match.opponent_score != null &&
                <div className='col-span-9'>
                    <div className='text-7xl lg:text-8xl text-center text-white'><span className='osu-glow'>{match.team_score}</span> - <span className='osu-glow'>{match.opponent_score}</span></div>
                </div>
                }
                <div className='col-span-9 text-3xl lg:text-4xl text-center'>{match.dateOnly} @ {match.timeOnly}</div>
                <div className='col-span-9  text-center'>
                {status == "past"  && match.vod_link != null && match.vod_link != "" &&
                        <button className="rounded-md px-10 py-1 text-3xl font-semibold text-osu hover:text-white shadow-sm" onClick={async () => { window.open(match.vod_link, '_blank') }}>
                            <span className='flex items-center'>WATCH MATCH</span>
                        </button>
                }

                {status == "upcoming" && match.stream_link != null && match.stream_link != "" &&
                    <button className="rounded-md px-10 py-1 text-3xl font-semibold text-osu hover:text-white shadow-sm" onClick={async () => { window.open(match.stream_link, '_blank') }}>
                        <span className='flex items-center'>WATCH STREAM</span>
                    </button>
                }
                </div>
            </div>
        </div>
    )
} 
export default MatchCard