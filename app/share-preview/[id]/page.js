'use client'
import { useUser } from '@clerk/nextjs';
import { doc, getDoc } from 'firebase/firestore';
import React, { useEffect, useState } from 'react'
import { db } from '../../../firebase';


const page = ({ params }) => {
  const { isSignedIn, isLoaded, user } = useUser();
  const [fileInfo, setFileInfo] = useState({});
  const [loading, setLoading] = useState(false)
  useEffect(() => {
    setLoading(true);

    const getFileInfo = async () => {
      if (!user) return;

      try {
        const docRef = doc(db, 'users', user.id, 'files', params?.id);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
          // console.log(docSnap.data())
          setFileInfo(docSnap.data());
        } else {
          console.log("No such document!");
        }
      } catch (error) {
        console.error('Error fetching document:', error);
      } finally {
        setLoading(false);
      }
    };
  }, [params.id, user]);

  return (
    <div>
      Shree
    </div>
  )
}

export default page
