import { BsTwitch } from 'react-icons/bs';

const MatchCard = ({ match, pastMatch }) => {

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

    const pastMatchStyle = "col-span-8 grid grid-cols-12"
    const upcomingMatchStyle = "col-span-12 grid grid-cols-12"

    return (
        <div className='text-osu r6-font mt-12 flex'>
            <div className='grid grid-cols-12 m-auto items-center text-center'>

                <div className='col-span-2 text-8xl lg:text-9xl text-osu text-shadow-white mx-2'>{pastMatch  && match.team_score != null && match.opponent_score != null && match.team_score}</div>

                <div className={pastMatch ? pastMatchStyle : upcomingMatchStyle}>
                    <div className='text-white col-span-12 text-5xl lg:text-6xl'>{match.Team.name}</div>
                    <div className='col-span-12 text-3xl lg:text-4xl text-center mt-2'>VS</div>
                    <div className='text-white col-span-12 text-5xl lg:text-6xl'>{match.opponent}</div>
                </div>

                <div className='col-span-2 text-8xl lg:text-9xl text-osu text-shadow-white mx-2'>{pastMatch  && match.team_score != null && match.opponent_score != null && match.opponent_score}</div>

                <div className='col-span-12 text-3xl lg:text-4xl text-center'>{match.dateOnly} @ {match.timeOnly}</div>
                <div className='col-span-12  text-center'>
                {pastMatch  && match.vod_link != null && match.vod_link != "" &&
                        <button className="rounded-md px-10 py-1 text-3xl font-semibold text-osu hover:text-white shadow-sm" onClick={async () => { window.open(match.vod_link, '_blank') }}>
                            <span className='flex items-center'>WATCH MATCH</span>
                        </button>
                }

                {!pastMatch && match.stream_link != null && match.stream_link != "" &&
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