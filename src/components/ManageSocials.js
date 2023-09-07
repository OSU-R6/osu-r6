import MiniBanner from './MiniBanner'
import { BsTwitch, BsYoutube, BsInstagram, BsTwitter } from 'react-icons/bs'

const ManageSocials = (props) => {

    const API = process.env.REACT_APP_API_URL

    async function socialsUpdateHandler(e) {
        const formData = new FormData(e.target)
        const response = await fetch(API + '/users/', {
            method: 'PATCH',
            body: JSON.stringify({
                twitch: formData.get('twitch'),
                youtube: formData.get('youtube'),
                twitter: formData.get('twitter'),
                instagram: formData.get('instagram')
            }),
            credentials: 'include',
            headers: {
                'Content-type': 'application/json',
            }
        })
        props.getProfile()
    }

    return (
    <>
        <MiniBanner>Linked Socials</MiniBanner>
        <div className='my-4 scale-75'>
            <form className='grid grid-cols-12' onSubmit={ async (e) => {
                e.preventDefault()
                socialsUpdateHandler(e)
            }}>
                <div className='my-4 col-span-12 lg:col-span-6 flex'>
                    <div className='icon mx-3'><BsTwitch /></div>
                    <label className='text-osu text-5xl r6-font'>twitch.tv/</label>
                    <input 
                        className='rounded text-4xl bg-black text-white font-bold'
                        placeholder={props.player.twitch}
                        name='twitch'
                    />
                </div>
                <div className='my-4 col-span-12 lg:col-span-6 flex'>
                    <div className='icon mx-3'><BsYoutube /></div>
                    <label className='text-osu text-5xl r6-font'>youtube.com/@</label>
                    <input 
                        className='rounded text-4xl bg-black text-white font-bold'
                        placeholder={props.player.youtube}
                        name='youtube'
                    />
                </div>
                <div className='my-4 col-span-12 lg:col-span-6 flex'>
                    <div className='icon mx-3'><BsTwitter /></div>
                    <label className='text-osu text-5xl r6-font'>twitter.com/</label>
                    <input 
                        className='rounded text-4xl bg-black text-white font-bold'
                        placeholder={props.player.twitter}
                        name='twitter'
                    />
                </div>
                <div className='my-4 col-span-12 lg:col-span-6 flex'>
                    <div className='icon mx-3'><BsInstagram /></div>
                    <label className='text-osu text-5xl r6-font'>instagram.com/</label>
                    <input 
                        className='rounded text-4xl bg-black text-white font-bold'
                        placeholder={props.player.instagram}
                        name='instagram'
                    />
                </div>
                <div className='col-span-12'>
                    <button className='rounded-md bg-osu hover:bg-osu-dark px-10 py-2.5 text-sm font-semibold text-white shadow-sm float-right' type='submit'>Save</button>
                </div>
            </form>
        </div>
    </>
    )
}
export default ManageSocials