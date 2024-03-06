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
    const teamWinStyle = 'col-span-2 text-black text-shadow-white font-bold'
    const teamLoseStyle = 'col-span-2 text-black text-shadow-white font-bold'

    return (
        <div className='text-osu my-5 mx-4 flex'>
            <div className='grid grid-cols-12 m-auto'>

                <div className='col-span-12 text-4xl'>
                    <div className='r6-font col-span-12 text-center'>{match.dateOnly} @ {match.timeOnly}</div>
                    <div className='col-span-12 grid grid-cols-12'>
                        <div className='col-span-10 text-white r6-font'>{match.Team.name}</div>
                        {(pastMatch && match.team_score != null && match.opponent_score != null) ?
                            <div className={(match.team_score > match.opponent_score) ? teamWinStyle : teamLoseStyle}>{match.team_score}</div>
                        :
                            <div className='col-span-2 text-black text-shadow-white mr-4 font-bold'>?</div>
                        }
                    </div>
                    <div className='col-span-12 grid grid-cols-12'>
                        <div className='col-span-10 text-white r6-font'>{match.opponent}</div>
                        {(pastMatch && match.team_score != null && match.opponent_score != null) ?
                            <div className={(match.team_score < match.opponent_score) ? teamWinStyle : teamLoseStyle}>{match.opponent_score}</div>
                        :
                            <div className='col-span-2 text-black text-shadow-white mr-4 font-bold'>?</div>
                        }
                    </div>
                </div>
                <div className='r6-font col-span-12  text-center'>
                {pastMatch  && match.vod_link != null && match.vod_link != "" &&
                        <button className="py-1 text-3xl font-semibold text-osu hover:text-white shadow-sm" onClick={async () => { window.open(match.vod_link, '_blank') }}>
                            <span className='flex items-center'>WATCH MATCH</span>
                        </button>
                }

                {!pastMatch && match.stream_link != null && match.stream_link != "" &&
                    <button className="py-1 text-3xl font-semibold text-osu hover:text-white shadow-sm" onClick={async () => { window.open(match.stream_link, '_blank') }}>
                        <span className='flex items-center'>WATCH STREAM</span>
                    </button>
                }
                </div>
            </div>
        </div>
    )
} 
export default MatchCard