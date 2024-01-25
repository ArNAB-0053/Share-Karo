"use client";
import { doc, getDoc } from "firebase/firestore";
import { useEffect, useState } from "react";
import { db } from "../../../../firebase";
import { useUser } from "@clerk/nextjs";
// import Image from "next/image";
// import {
//     FacebookIcon,
//     FacebookShareButton,
//     TwitterIcon,
//     TwitterShareButton,
//     WhatsappIcon,
//     WhatsappShareButton,
// } from 'next-share';
import CopyUrl from "../../Components/CopyUrl";
import Checker from "../../Components/Checker";
import EmailSender from "../../Components/EmailSender";
import "../../../../styles/loader.css";
import "../../../../styles/checker.css";
import Link from "next/link";
import { ChevronLeftIcon, PaperAirplaneIcon } from "@heroicons/react/24/solid";

const page = ({ params }) => {
  const { isSignedIn, isLoaded, user } = useUser();
  const [fileInfo, setFileInfo] = useState({});
  const [loading, setLoading] = useState(false);
  const [currentUrl, setCurrentUrl] = useState("");

  useEffect(() => {
    // Check if window is defined to avoid ReferenceError during server-side rendering
    if (typeof window !== "undefined") {
      setCurrentUrl(window.location.href);
    }
  }, []);

  useEffect(() => {
    setLoading(true);

    const getFileInfo = async () => {
      if (!user) return;

      try {
        const docRef = doc(db, "users", user.id, "files", params?.id);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
          console.log(docSnap.data())
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
    <div className="md:ml-[18rem] w-screen pb-16 px-4 sm:px-10">
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
              alt="Video"
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

            {/* <div className="flex items-start justify-center flex-col gap-3 w-full">
              <h2>Share URL with friends</h2>
              <span className="flex items-start justify-center gap-6">
                <WhatsappShareButton
                  url={'https://github.com/next-share'}
                  title={'next-share is a social share buttons for your next React apps.'}
                  separator=":: "
                >
                  <WhatsappIcon size={32} round />
                </WhatsappShareButton>

                <FacebookShareButton
                  url={'https://github.com/next-share'}
                  quote={'next-share is a social share buttons for your next React apps.'}
                  hashtag={'#nextshare'}
                >
                  <FacebookIcon size={32} round />
                </FacebookShareButton>

                <TwitterShareButton
                  url={'https://github.com/next-share'}
                  title={'next-share is a social share buttons for your next React apps.'}
                >
                  <TwitterIcon size={32} round />
                </TwitterShareButton>
              </span>
            </div> */}

            <Checker userId={user?.id} docId={params?.id} />

            {/* <a className="py-3 px-10 h-auto w-full sm:w-auto bg-purple-700 text-center text-white" download={fileInfo.filename} href={`${fileInfo.downloadUrl}`}>Download</a> */}

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
  );
};

export default page;
