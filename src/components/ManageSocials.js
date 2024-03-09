import MiniBanner from './MiniBanner'
import { BsTwitch, BsYoutube, BsInstagram, BsTwitter } from 'react-icons/bs'
import { FaUserAlt } from "react-icons/fa"
import { SiUbisoft } from "react-icons/si"
import { useState } from 'react'
import FormModal from './FormModal'
import { useDispatch } from 'react-redux'
import { setUser } from '../redux/userReducer'

const ManageSocials = (props) => {

    const API = process.env.REACT_APP_API_URL

    const [ editModal, setEditModal] = useState(false)
    const [ formData, setFormData] = useState({})

    const dispatch = useDispatch()

    const refreshUser = async () => {
        dispatch(setUser(await getUserInfo()))
    }

    async function getUserInfo(){
        try{
        const response = await fetch(API + '/auth', {
                method: 'GET',
                credentials: 'include'
            })
        const responseBody = await response.json()
        return responseBody
        } catch {
            navigate('/login')
        }
    }

    async function socialsUpdateHandler() {
        try {
            const response = await fetch(API + '/users/', {
                method: 'PATCH',
                body: JSON.stringify({
                    ign: formData.ign,
                    uplay: formData.uplay,
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
            refreshUser()
            setEditModal(false)
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
        <MiniBanner>Account Details</MiniBanner>
        <div className='my-4 scale-75'>
            <div className='grid grid-cols-12 flex'>
                <div className='my-4 col-span-12 lg:col-span-6 flex m-auto'>
                    <div className='icon mx-3'><FaUserAlt/></div>
                    <span className='text-osu text-5xl r6-font mt-1'>Display Name: <span className='text-white'>{props.player.ign}</span></span>
                </div>
                <div className='my-4 col-span-12 lg:col-span-6 flex m-auto'>
                    <div className='icon mx-3'><SiUbisoft /></div>
                    <span className='text-osu text-5xl r6-font'>Ubisoft: <span className='text-white'>{props.player.uplay ? props.player.uplay : "Not Set"}</span></span>
                </div>
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
            
        </div>
        {editModal &&
                <FormModal onClose={() => setEditModal(false)}>
                    <form className='grid grid-cols-12' onSubmit={ async (e) => {
                        e.preventDefault()
                        await socialsUpdateHandler()
                    }}>
                        <div className='col-span-12'>
                            <div className='text-white text-5xl r6-font text-center'>Update Account Details</div>
                        </div>
                        <div className='my-4 col-span-12 lg:col-span-6 flex px-2'>
                            <div className='icon mx-3'><FaUserAlt /></div>
                            <label className='text-osu text-5xl r6-font whitespace-nowrap'>Display Name</label>
                            <input 
                                className='rounded text-4xl bg-black text-white font-bold w-full border pl-2 pb-2 ml-1 h-full'
                                name='ign'
                                value={formData.ign}
                                onChange={handleChange}
                            />
                        </div>
                        <div className='my-4 col-span-12 lg:col-span-6 flex px-2'>
                            <div className='icon mx-3'><SiUbisoft /></div>
                            <label className='text-osu text-5xl r6-font'>Ubisoft</label>
                            <input 
                                className='rounded text-4xl bg-black text-white font-bold w-full border pl-2 pb-2 ml-1 h-full'
                                name='uplay'
                                value={formData.uplay}
                                onChange={handleChange}
                            />
                        </div>
                        <div className='col-span-12 mt-4'>
                        <div className='text-white text-5xl r6-font text-center'>Update Socials</div>
                        <div className='text-white text-3xl r6-font text-center'>Simply set your username here. Do not add full links.</div>
                        </div>
                        <div className='my-4 col-span-12 lg:col-span-6 flex px-2'>
                            <div className='icon mx-3'><BsTwitch /></div>
                            <label className='text-osu text-5xl r6-font'>twitch.tv/</label>
                            <input 
                                className='rounded text-4xl bg-black text-white font-bold w-full border pl-2 pb-2 ml-1 h-full'
                                name='twitch'
                                value={formData.twitch}
                                onChange={handleChange}
                            />
                        </div>
                        <div className='my-4 col-span-12 lg:col-span-6 flex px-2'>
                            <div className='icon mx-3'><BsYoutube /></div>
                            <label className='text-osu text-5xl r6-font'>youtube.com/@</label>
                            <input 
                                className='rounded text-4xl bg-black text-white font-bold w-full border pl-2 pb-2 ml-1 h-full'
                                name='youtube'
                                value={formData.youtube}
                                onChange={handleChange}
                            />
                        </div>
                        <div className='my-4 col-span-12 lg:col-span-6 flex px-2'>
                            <div className='icon mx-3'><BsTwitter /></div>
                            <label className='text-osu text-5xl r6-font'>twitter.com/</label>
                            <input 
                                className='rounded text-4xl bg-black text-white font-bold w-full border pl-2 pb-2 ml-1 h-full'
                                name='twitter'
                                value={formData.twitter}
                                onChange={handleChange}
                            />
                        </div>
                        <div className='my-4 col-span-12 lg:col-span-6 flex px-2'>
                            <div className='icon mx-3'><BsInstagram /></div>
                            <label className='text-osu text-5xl r6-font'>instagram.com/</label>
                            <input 
                                className='rounded text-4xl bg-black text-white font-bold w-full border pl-2 pb-2 ml-1 h-full'
                                name='instagram'
                                value={formData.instagram}
                                onChange={handleChange}
                            />
                        </div>
                        <button className='rounded-md bg-osu hover:bg-osu-dark px-10 py-2.5 text-sm font-semibold text-white shadow-sm' type="submit">Save</button>
                    </form>
                </FormModal>
            }
    </>
    )
}
export default ManageSocials