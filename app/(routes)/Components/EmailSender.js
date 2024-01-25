'use client'
import { useState } from 'react'
import GlobalApi from '../../GlobalApi'
import { useUser } from '@clerk/nextjs'

const EmailSender = ({fileName, size, type, password, shareUrl}) => {
    const [prompt, setPrompt] = useState()
    const {user} = useUser();

    const handleEmail = () => {
        const data = {
            emailUser: prompt,
            userName: user?.fullName,
            filename: fileName,
            size: size,
            type: type,
            password: password,
            shareUrl: shareUrl,
        }
        // console.log(data)
        GlobalApi.sendEmail(data).then(res=>{
            console.log(res)
        })  
    }

    return (
        <div className='border shadow-sm w-full lg:w-[25vw]  p-2'>
            <h1>Send File to Email</h1>
            <form
                onSubmit={(e) => { e.preventDefault(); setPrompt('') }}
                action="form"
                className="w-full trans flex items-center justify-center flex-col"
            >
                <input
                    type="email"
                    placeholder="example@gmail.com"
                    value={prompt}
                    onChange={(e) => {
                        // console.log(e.target.value)
                        setPrompt(e.target.value);
                    }}
                    className="outline-none border py-2 rounded px-3 shadow-sm w-full space-y-2 placeholder:text-sm"
                />

                <button onClick={()=>handleEmail()} className="bg-blue-500 mt-3 text-white rounded w-full h-[3rem] hover:bg-primary disabled:bg-gray-400">
                    Send
                </button>
            </form>
        </div>
    )
}

export default EmailSender
