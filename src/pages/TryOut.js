import Banner from '../components/Banner'
import { useState } from 'react'



function TryOut() {

    const [formData, setFormData] = useState({})

    const API = process.env.REACT_APP_API_URL

    const inputStyle = "appearance-none border-2 rounded-md w-full py-2 px-3 leading-tight focus:outline-none focus:shadow-outline bg-gray-900 text-white"
    const selectStyle = "border-2 rounded-md w-full py-2 px-3 leading-tight focus:outline-none focus:shadow-outline bg-gray-900 text-white"
    const inputErrorStyle = "appearance-none border-2 border-red-500 rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"

    const handleChange = (e) => {
        const { name, value } = e.target
        setFormData(prevState => ({
          ...prevState,
          [name]: value
        }))
    }

    async function submitHandler(){
        try {
            const response = await fetch(API + '/prospects/', {
                method: 'POST',
                body: JSON.stringify(formData),
                headers: {
                    'Content-type': 'application/json; charset=UTF-8',
                  },
            })
            return response.status
        } catch (err) {
            return 500
        }
    }

    return(
        <>
            <Banner>Do You Have What It Takes?</Banner>
            <form className="text-center flex mt-6" onSubmit={ async (e) => {
                        e.preventDefault()
                        submitHandler()
                    }}>
                        <div className='grid grid-cols-12 gap-4 m-auto'>
                            <div className='col-span-12 m-4'>
                                <div className='text-gray-200 max-w-3xl m-auto text-lg font-bold'>
                                Welcome to the first step of your journey towards becoming a part of our prestigious collegiate esports program. As you embark on this application process, remember that we're looking for more than just skilled gamers. We seek dedicated, team-oriented individuals who exhibit not only exceptional gaming talent but also a deep understanding of strategy, a commitment to continuous improvement, and the ability to thrive in a competitive, collaborative environment. If you have the passion, the drive, and the commitment to excel both in and out of the game, we invite you to fill out the application below. Show us you have what it takes to contribute to our legacy of success and to carry forward our tradition of excellence. Let the games begin!
                                </div>
                            </div>
                            <div className='col-span-12 xl:col-span-6 mx-4'>
                                <div className="mb-4">
                                    <label className="block text-gray-700 text-white text-lg font-bold mb-2">Email</label>
                                    <label className="block text-gray-700 text-white text-xs font-bold mb-2">Use your OSU email if possible</label>
                                    <input className={inputStyle} value={formData.email} onChange={handleChange} name="email" type="email" placeholder="email" required/>
                                </div>

                                <div className="mb-4">
                                    <label className="block text-gray-700 text-white text-lg font-bold mb-2">First Name</label>
                                    <input className={inputStyle} value={formData.firstName} onChange={handleChange} name="firstName" type="text" placeholder="First Name" required/>
                                </div>
                                <div className="mb-4">
                                    <label className="block text-gray-700 text-white text-lg font-bold mb-2">Last Name</label>
                                    <input className={inputStyle} value={formData.lastName} onChange={handleChange} name="lastName" type="text" placeholder="Last Name" required/>
                                </div>
                                <div className="mb-4">
                                    <label className="block text-gray-700 text-white text-lg font-bold mb-2">Discord</label>
                                    <input className={inputStyle} value={formData.discord} onChange={handleChange} name="discord" type="text" required/>
                                </div>
                                <div className="mb-4">
                                    <label className="block text-gray-700 text-white text-lg font-bold mb-2">UPlay Name</label>
                                    <input className={inputStyle} value={formData.uplay} onChange={handleChange} name="uplay" type="text" placeholder="" required/>
                                </div>
                                <div className="mb-4">
                                    <label className="block text-gray-700 text-white text-lg font-bold mb-2">When can you start?</label>
                                    <label className="block text-gray-700 text-white text-xs font-bold mb-2">When would you ideal  join the program?</label>
                                    <select className={selectStyle} name="start" value={formData.start} onChange={handleChange} required>
                                        <option value="">Please select an option</option>
                                        <option value="immediate">Right Now!</option>
                                        <option value="next_quarter">Next Quarter</option>
                                        <option value="next_year">Next Year</option>
                                    </select>
                                </div>
                            </div>
                            <div className='col-span-12 xl:col-span-6 mx-4'>
                                <div className="mb-4">
                                    <label className="block text-gray-700 text-white text-lg font-bold mb-2">Role</label>
                                    <label className="block text-gray-700 text-white text-xs font-bold mb-2">What role do you feel most comfortable playing?</label>
                                    <select className={selectStyle} name="role" value={formData.role} onChange={handleChange} required>
                                        <option value="">Please select an option</option>
                                        <option value="entry">Entry</option>
                                        <option value="support">Support</option>
                                        <option value="flex">Flex</option>
                                        <option value="anchor">Anchor</option>
                                        <option value="igl">IGL</option>
                                        <option value="unknown">Unsure</option>
                                    </select>
                                </div>
                                <div className="mb-4">
                                    <label className="block text-gray-700 text-white text-lg font-bold mb-2">Rank</label>
                                    <label className="block text-gray-700 text-white text-xs font-bold mb-2">What rank do you think best represents your skill</label>
                                    <select className={selectStyle} name="rank" value={formData.rank} onChange={handleChange} required>
                                        <option value="">Please select an option</option>
                                        <option value="copper">Copper</option>
                                        <option value="bronze">Bronze</option>
                                        <option value="silver">Silver</option>
                                        <option value="gold">Gold</option>
                                        <option value="platinum">Platinum</option>
                                        <option value="emerald">Emerald</option>
                                        <option value="diamond">Diamond</option>
                                        <option value="champion">Champion</option>
                                        <option value="unranked">Unranked</option>
                                    </select>
                                </div>
                                <div className="mb-4">
                                    <label className="block text-gray-700 text-white text-lg font-bold mb-2">Competitive Nature</label>
                                    <label className="block text-gray-700 text-white text-xs font-bold mb-2">What level of competitive enviroment are you looking for?</label>
                                    <select className={selectStyle} name="competitiveness" value={formData.competitiveness} onChange={handleChange} required>
                                        <option value="">Please select an option</option>
                                        <option value="casual">Casual</option>
                                        <option value="mid">Intermediate</option>
                                        <option value="max">I want to go pro!</option>
                                    </select>
                                </div>
                                <div className="mb-4">
                                    <label className="block text-gray-700 text-white text-lg font-bold mb-2">Time Commitment</label>
                                    <label className="block text-gray-700 text-white text-xs font-bold mb-2">What is your ideal weekly time commitment for R6?</label>
                                    <select className={selectStyle} name="commitment" value={formData.commitment} onChange={handleChange} required>
                                        <option value="">Please select an option</option>
                                        <option value='1'>1 Hour</option>
                                        <option value='3'>3 Hours</option>
                                        <option value='5'>5 Hours</option>
                                        <option value='8'>8 Hours</option>
                                        <option value='10'>10+ Hours</option>
                                    </select>
                                </div>
                                <div className="mb-4">
                                    <label className="block text-gray-700 text-white text-lg font-bold mb-2">Current Status</label>
                                    <label className="block text-gray-700 text-white text-xs font-bold mb-2 px-3">If you are soon to be a student (i.e. transfers) select HS student</label>
                                    <select className={selectStyle} name="type" value={formData.type} onChange={handleChange} required>
                                        <option value="">Please select an option</option>
                                        <option value="osu_student">OSU Student</option>
                                        <option value="hs_student">High School Student</option>
                                    </select>
                                </div>
                            </div>

                            <div className='col-span-12 mx-4'>
                                <div className="mb-4">
                                    <label className="block text-gray-700 text-white text-lg font-bold mb-2">Breifly describe your competitve R6 experience</label>
                                    <textarea className={inputStyle} value={formData.experience} onChange={handleChange} name="experience" type="text" required/>
                                </div>
                            </div>
                            <div className='col-span-12 mx-4'>
                                <div className="mb-4">
                                    <label className="block text-gray-700 text-white text-lg font-bold mb-2">Other Notes</label>
                                    <textarea className={inputStyle} value={formData.notes} onChange={handleChange} name="notes" type="text"/>
                                </div>
                            </div>
                            <div className="flex justify-center col-span-12">
                                <button className="rounded-md bg-osu hover:bg-osu-dark px-10 py-2.5 text-sm font-semibold text-white shadow-sm" type="submit">Create</button>
                            </div>
                        </div>
                    </form>
            
        </>
    )
} export default TryOut;