import React, { useRef } from 'react';
import { TwitchPlayer, TwitchChat } from 'react-twitch-embed';

function StreamEmbed({ match }) {
  // Construct the URL for embedding the stream
  const embed = useRef();
  
  const handleReady = (e) => {
    embed.current = e;
  };

  const channelName = match.stream_link.substring(match.stream_link.lastIndexOf('/') + 1)
  
  return (
    <>
    <div className='flex'>
        <div  className='m-auto live-stream w-full'>
            <TwitchPlayer channel={channelName} className="m-auto"  width="90%" autoplay muted onReady={handleReady} />
        </div>
    </div>
    {/* <TwitchChat channel={channelName} darkMode /> */}
    </>
  );
}

export default StreamEmbed;