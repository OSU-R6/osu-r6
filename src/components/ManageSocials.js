import MiniBanner from './MiniBanner'
import { BsTwitch, BsYoutube, BsInstagram, BsTwitter } from 'react-icons/bs'
import { useState } from 'react'
import FormModal from './FormModal'
import { set } from 'date-fns'
import { ca } from 'date-fns/locale'

const ManageSocials = (props) => {

    const API = process.env.REACT_APP_API_URL

    const [ editData, setEditData] = useState(false)
    const [ editModal, setEditModal] = useState(false)
    const [ formData, setFormData] = useState({})

    async function socialsUpdateHandler() {
        try {
            const response = await fetch(API + '/users/', {
                method: 'PATCH',
                body: JSON.stringify({
                    twitch: formData.twitch,
                    youtube: formData.youtube,
                    twitter: formData.twitter,
                    instagram: formData.instagram
                }),
                credentials: 'include',
                headers: {
                    'Content-type': 'application/json',
                }
            })
            setEditModal(false)
            props.getProfile()
        } catch (error) {
            console.error(error)
        }

    }

    const handleChange = (e) => {
        const { name, value } = e.target
        setFormData(prevState => ({
          ...prevState,
          [name]: value
        }))
    }

    return (
    <>
        <MiniBanner>Linked Socials</MiniBanner>
        <div className='my-4 scale-75'>
            <div className='grid grid-cols-12 flex'>
                <div className='my-4 col-span-12 lg:col-span-6 flex m-auto'>
                    <div className='icon mx-3'><BsTwitch /></div>
                    <span className='text-osu text-5xl r6-font'>twitch.tv/<span className='text-white'>{props.player.twitch}</span></span>
                </div>
                <div className='my-4 col-span-12 lg:col-span-6 flex m-auto'>
                    <div className='icon mx-3'><BsYoutube /></div>
                    <span className='text-osu text-5xl r6-font'>youtube.com/@<span className='text-white'>{props.player.youtube}</span></span>
                </div>
                <div className='my-4 col-span-12 lg:col-span-6 flex m-auto'>
                    <div className='icon mx-3'><BsTwitter /></div>
                    <span className='text-osu text-5xl r6-font'>twitter.com/<span className='text-white'>{props.player.twitter}</span></span>
                </div>
                <div className='my-4 col-span-12 lg:col-span-6 flex m-auto'>
                    <div className='icon mx-3'><BsInstagram /></div>
                    <span className='text-osu text-5xl r6-font'>instagram.com/<span className='text-white'>{props.player.instagram}</span></span>
                </div>
                <button className='rounded-md bg-osu hover:bg-osu-dark px-10 py-2.5 text-sm font-semibold text-white shadow-sm m-auto col-span-12 mt-4' type="button" onClick={ (e) => {
                    setFormData(props.player)
                    setEditModal(true)
                }} >Edit</button>
            </div>
            {editModal &&
                <FormModal onClose={() => setEditModal(false)}>
                    <div className='text-white text-5xl r6-font text-center'>Update Socials</div>
                    <form className='grid grid-cols-12' onSubmit={ async (e) => {
                        e.preventDefault()
                        await socialsUpdateHandler()
                    }}>
                        <div className='my-4 col-span-12 lg:col-span-6 flex'>
                            <div className='icon mx-3'><BsTwitch /></div>
                            <label className='text-osu text-5xl r6-font'>twitch.tv/</label>
                            <input 
                                className='rounded text-4xl bg-black text-white font-bold  w-full'
                                name='twitch'
                                value={formData.twitch}
                                onChange={handleChange}
                            />
                        </div>
                        <div className='my-4 col-span-12 lg:col-span-6 flex'>
                            <div className='icon mx-3'><BsYoutube /></div>
                            <label className='text-osu text-5xl r6-font'>youtube.com/@</label>
                            <input 
                                className='rounded text-4xl bg-black text-white font-bold w-full'
                                name='youtube'
                                value={formData.youtube}
                                onChange={handleChange}
                            />
                        </div>
                        <div className='my-4 col-span-12 lg:col-span-6 flex'>
                            <div className='icon mx-3'><BsTwitter /></div>
                            <label className='text-osu text-5xl r6-font'>twitter.com/</label>
                            <input 
                                className='rounded text-4xl bg-black text-white font-bold  w-full'
                                name='twitter'
                                value={formData.twitter}
                                onChange={handleChange}
                            />
                        </div>
                        <div className='my-4 col-span-12 lg:col-span-6 flex'>
                            <div className='icon mx-3'><BsInstagram /></div>
                            <label className='text-osu text-5xl r6-font'>instagram.com/</label>
                            <input 
                                className='rounded text-4xl bg-black text-white font-bold  w-full'
                                name='instagram'
                                value={formData.instagram}
                                onChange={handleChange}
                            />
                        </div>
                        <button className='rounded-md bg-osu hover:bg-osu-dark px-10 py-2.5 text-sm font-semibold text-white shadow-sm' type="submit">Save</button>
                    </form>
                </FormModal>
            }
        </div>
    </>
    )
}
export default ManageSocials