"use client";
import { doc, getDoc } from "firebase/firestore";
import { useEffect, useState } from "react";
import { db } from "../../../../firebase";
import { useUser } from "@clerk/nextjs";
import CopyUrl from "../../Components/CopyUrl";
import Checker from "../../Components/Checker";
import EmailSender from "../../Components/EmailSender";
import "../../../../styles/loader.css";
import "../../../../styles/checker.css";
import Link from "next/link";
import { ChevronLeftIcon } from "@heroicons/react/24/solid";

const page = ({ params }) => {
  const { isSignedIn, isLoaded, user } = useUser();
  const [fileInfo, setFileInfo] = useState({});
  const [loading, setLoading] = useState(false);
  const [currentUrl, setCurrentUrl] = useState("");
  const [emailMsg, setEmailMsg] = useState('flex')

  useEffect(() => {
    // Check if window is defined to avoid ReferenceError during server-side rendering
    if (typeof window !== "undefined") {
      setCurrentUrl(window.location.href);
    }
  }, []);

  useEffect(() => {
    setLoading(true);

    const getFileInfo = async () => {
      try {
        const docRef = doc(db, "users", user.id, "files", params?.id);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
          // console.log(docSnap.data())
          setFileInfo(docSnap.data());
        } else {
          console.log("No such document!");
        }
      } catch (error) {
        console.error("Error fetching document:", error);
      } finally {
        setLoading(false);
      }
    };

    if (params.id) {
      getFileInfo();
    }
  }, [params.id, user]);

  // console.log(fileInfo);

  return (
    <div className="flex flex-col md:ml-[18rem] w-screen">
      <div className={`items-center justify-between gap-4 bg-[#ff0000] px-4 py-3 text-white ${emailMsg}`} >
        <p className="text-[0.7rem] md:text-[0.8] lg:text-sm font-medium ">
          The domain for Resend is in development, so you can only send email here: 
          <a href="mailto:arnabbhattacharyya1234@gmail.com" className="ml-1 inline-block underline">arnabbhattacharyya1234@gmail.com</a>
        </p>

        <button
          aria-label="Dismiss"
          className="shrink-0 rounded-lg bg-black/10 p-1 transition hover:bg-black/20"
          onClick={() => setEmailMsg('hidden')}
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
            <path
              fillRule="evenodd"
              d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
              clipRule="evenodd"
            />
          </svg>
        </button>
      </div>


      <div className="pb-16 px-4 sm:px-10">
        <Link
          href="/Upload"
          className="flex items-center  justify-center gap-1 ml-4 rounded-full  mb-8 font-bold text-xl bg-[#101010] w-[10rem] mt-8 py-3 px-3"
        >
          <ChevronLeftIcon className="text-white h-5 w-5" />
          <p className="text-white text-sm">Go to upload</p>
        </Link>
        {!loading ? (
          <div className="flex items-center justify-start gap-16 flex-col lg:flex-row">
            {/* File Preview { fileInfo.downloadUrl } */}
            <div className="w-full h-[25rem] sm:w-[35rem] flex items-center justify-center flex-col space-y-3 border shadow-sm p-10 bg-zinc-100 ">
              <img
                src={`${fileInfo.downloadUrl}`}
                width="300"
                height="300"
                className="w-full h-full rounded-md object-contain"
                alt={fileInfo.type}
              />
              <h1 className="text-md sm:text-lg font-bold text-center w-[70vw] sm:w-auto overflow-hidden truncate">
                {fileInfo.filename}
              </h1>
            </div>
            <div className=" w-full lg:w-[25rem] mt-10 lg:mt-0 flex items-start justify-start flex-col gap-8 px-5">
              <div className="flex flex-col items-startjustify-center w-full">
                <h2>Short URL</h2>
                <span className="p-2 border shadow-sm w-full lg:w-[25vw] overflow-hidden flex items-center justify-between">
                  <p className="w-[calc(100%-3rem)] truncate">{`https://share-karo.vercel.app/share-preview/${params.id}`}</p>
                  <CopyUrl
                    shortUrl={`https://share-karo.vercel.app/share-preview/${params.id}`}
                  />
                </span>
              </div>
              <Checker userId={user?.id} docId={params?.id} />
              <EmailSender
                fileName={fileInfo.filename}
                size={fileInfo.size}
                type={fileInfo.type}
                password={fileInfo.password}
                shareUrl={`https://share-karo.vercel.app/share-preview/${params.id}`}
              />
            </div>
          </div>
        ) : (
          <div className="w-screen h-[100svh] flex items-center justify-center fixed left-0 top-0 bg-black/50">
            <div className="dot-spinner">
              <div className="dot-spinner__dot"></div>
              <div className="dot-spinner__dot"></div>
              <div className="dot-spinner__dot"></div>
              <div className="dot-spinner__dot"></div>
              <div className="dot-spinner__dot"></div>
              <div className="dot-spinner__dot"></div>
              <div className="dot-spinner__dot"></div>
              <div className="dot-spinner__dot"></div>
            </div>
          </div>
        )}
      </div>
    </div>

  );
};

export default page;
