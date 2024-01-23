'use client'
import { doc, getDoc } from "firebase/firestore";
import { useEffect, useState } from "react";
import { db } from "../../../../firebase";
import { useUser } from "@clerk/nextjs";

const page = ({ params }) => {
    const { isSignedIn, isLoaded, user } = useUser();

    if (!user)  return;

    const getFileInfo = async () => {
        const docRef = doc(db, 'users', user?.id, 'files', params?.id);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
            console.log("Document data:", docSnap.data());
        } else {
            console.log("No such document!");
        }
    }

    // console.log(fileInfo)
    useEffect(() => {
        params.id && getFileInfo();
    }, [])




    return (
        <div className='h-[100svh] overflow-hidden md:ml-[18rem] px-4 w-screen'>
            File Preview
        </div>
    )
}

export default page
