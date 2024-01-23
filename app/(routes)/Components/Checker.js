'use client'
import { doc, updateDoc } from 'firebase/firestore';
import React, { useEffect, useState } from 'react';
import { db } from '../../../firebase';
import { useUser } from '@clerk/nextjs';
import { Bounce, ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Checker = ({ docId, userId }) => {
    const [isChecked, setIsChecked] = useState(false);
    const [prompt, setPrompt] = useState()

    const { user } = useUser();
    const handleCheckboxChange = () => {
        setIsChecked(!isChecked);
    };

    const errorToast = () => toast.error('Password cannot be empty', {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
        transition: Bounce,
    });

    const successToast = () => toast.success('Uploaded successfylly', {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
        transition: Bounce,
    });

    const handlePassword = async () => {
        if (!prompt || prompt.trim() === "") {
            // Show an error or take appropriate action
            errorToast();
            return;
        }

        try {
            // console.log(prompt)
            const docRef = doc(db, 'users', `${userId}`, 'files', `${docId}`)
            await updateDoc(docRef, {
                password: prompt,
            })
            setPrompt('');
            successToast();            
        }

        catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        handlePassword();

    }, [])


    return (
        <div className='trans w-full'>
            <label className="cyberpunk-checkbox-label mb-4 ml-1">
                <input
                    type="checkbox"
                    className="cyberpunk-checkbox"
                    checked={isChecked}
                    onChange={handleCheckboxChange}
                />
                Enable password?
            </label>

            {isChecked && (
                <form
                    onSubmit={(e) => { e.preventDefault(); }}
                    action="form"
                    className="w-full lg:w-[25vw] trans flex items-center justify-between"
                >
                    <input
                        type="password"
                        placeholder="Enter password"
                        value={prompt}
                        onChange={(e) => {
                            // console.log(e.target.value)
                            setPrompt(e.target.value);
                        }}
                        className="outline-none border py-2 rounded px-3 shadow-sm mr-4 w-[calc(100%-4.5rem)]"
                    />

                    <button disabled={!prompt || prompt.trim() === ""} onClick={handlePassword} className="bg-blue-500 text-white rounded w-[4.2rem] h-[2.5rem] hover:bg-primary disabled:bg-gray-400">
                        Save
                    </button>
                    <ToastContainer />
                </form>
            )}

        </div>
    );
};

export default Checker;
