"use client";
import { useUser } from "@clerk/nextjs";
import { doc, getDoc } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { db } from "../../../firebase";
import "../../../styles/loader.css";
import dynamic from "next/dynamic";

const page = ({ params }) => {
  const { isSignedIn, isLoaded, user } = useUser();
  const [fileInfo, setFileInfo] = useState({});
  const [loading, setLoading] = useState(false);
  const [prompt, setPrompt] = useState();

  useEffect(() => {
      const getFileInfo = async () => {
      if (!user) return;
      try {
        setLoading(true);
        const docRef = doc(db, "users", user.id, "files", params?.id);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
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

  return (
    <div className="w-screen h-[100vh] flex items-center justify-center flex-col bg-gray-300 p-5">
      {!loading ? (
        <div className="flex items-center justify-start flex-col bg-white p-6 gap-5 max-[1084px]:w-[95%]">
          <h1 className="text-4xl"> logo</h1>
          <h1 className="flex items-center justify-center flex-col">
            <strong className="text-primary text-xl text-center font-bold">
              {" "}
              {fileInfo.fullname}
            </strong>
            <h2 className="text-md text-center">Shared the file with you</h2>
          </h1>
          <div className="w-full lg:w-[30rem] flex items-center justify-center flex-col space-y-3 border shadow-sm p-10">
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
            <h3 className="text-gray-500">
              {`${fileInfo.type} ⚡ ${fileInfo.size < 1024 * 1024
                ? (fileInfo.size / 1024).toFixed(2) + " KB"
                : (fileInfo.size / (1024 * 1024)).toFixed(2) + " MB"
                }`}
            </h3>
          </div>
          <div className=" w-full mt-0 flex items-center justify-center flex-col gap-8">
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
            {fileInfo.password && fileInfo.password.trim() !== '' && (
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  // Add your logic for handling the form submission with password
                }}
                action="form"
                className={`w-full lg:w-[20rem] trans items-center justify-between`}
              >
                <input
                  type="password"
                  placeholder="Enter password to download file"
                  value={prompt}
                  onChange={(e) => {
                    setPrompt(e.target.value);
                  }}
                  className="outline-none border py-2 rounded px-3 shadow-sm w-full placeholder:text-sm"
                />
              </form>
            )}

            <button
              disabled={fileInfo.password && fileInfo.password.trim() !== '' && fileInfo.password !== prompt}
              className="rounded-full p-3 h-auto w-full lg:w-[25rem] bg-purple-700 text-center text-white disabled:bg-gray-400"
              onClick={() => {
                // Add your logic to download the file
                window.location.href = fileInfo.downloadUrl;
              }}
              href={`${fileInfo.downloadUrl}`}
            >
              Download
            </button>

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

export default dynamic(() => Promise.resolve(page), { ssr: false });
