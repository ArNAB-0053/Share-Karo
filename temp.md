'use client'
import { doc, getDoc } from "firebase/firestore";
import { useEffect, useState } from "react";
import { useUser } from "@clerk/nextjs";
import { db } from "../../firebase";

const TableWrapper = ({ skeletonFile, docId }) => {
  const { isSignedIn, isLoaded, user } = useUser();
  const [fileInfo, setFileInfo] = useState({});
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    setLoading(true);
    const getFileInfo = async () => {
      if (!user) return;
      try {
        const docRef = doc(db, 'users', user.id, 'files', `${docId}`);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          console.log(docSnap.data())
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
      getFileInfo();
  }, [user]);
  return (
    <div>
      <h1> {fileInfo.filename} hi {fileInfo.name} </h1>
    </div>
  )
}

export default TableWrapper
