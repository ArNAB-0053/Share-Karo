'use client'
import { useState } from 'react'

const EmailSender = () => {
    const [prompt, setPrompt] = useState()

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

                <button className="bg-blue-500 text-white rounded w-full h-[2.5rem] hover:bg-primary disabled:bg-gray-400">
                    Save
                </button>
            </form>
        </div>
    )
}

export default EmailSender
