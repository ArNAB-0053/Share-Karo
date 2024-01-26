'use client'
import { useEffect, useState } from "react"
import 'react-toastify/dist/ReactToastify.css';
import { Bounce, Flip, ToastContainer, toast } from "react-toastify";
import React from 'react'
import Dropzone from 'react-dropzone'
import Image from "next/image";
import { XMarkIcon } from "@heroicons/react/24/solid";
import { db, storage } from '../firebase'
import { addDoc, collection, doc, serverTimestamp, updateDoc } from "firebase/firestore";
import { useUser } from "@clerk/nextjs";
import { getDownloadURL, ref, uploadBytes, uploadBytesResumable } from "firebase/storage";
import ProgressBar from './ProgressBar'
import { useRouter } from "next/navigation";

const CustomDropzon = () => {
  const [files, setFiles] = useState([])
  const [loading, setLoading] = useState(false)
  const [progress, setProgress] = useState('')
  const [uploadSuccess, setUploadSuccess] = useState(false);
  const [active, setActive] = useState(false);
  const [completed, setCompleted] = useState(true);
  const router = useRouter();

  const bytesToSize = (bytes) => {
    const kilobytes = bytes / 1024;
    const megabytes = kilobytes / 1024;

    if (megabytes >= 1) {
      return `${megabytes.toFixed(2)} MB`;
    } else {
      return `${kilobytes.toFixed(2)} KB`;
    }
  };

  const notify = () => toast.error('File size is too big!', {
    position: "top-right",
    autoClose: 5000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: "light",
    transition: Bounce,
  });

  const handleFiles = (files) => {
    if (files[0].length !== 0 && files[0].size > 3000000) {
      notify();
      return;
    }
    setFiles((prevFiles) => [...prevFiles, ...files]);
    setUploadSuccess(false);
  }

  const handleDelete = (fileToDelete) => {
    setFiles((prevFiles) => prevFiles.filter((file) => file !== fileToDelete));
  };


  const notification = () => toast.success('Uploaded successfylly', {
    position: "top-right",
    autoClose: 2000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: "colored",
    transition: Flip,
  });


  // const { isLoaded, userId, sessionId, getToken } = useAuth();
  const { isSignedIn, isLoaded, user } = useUser()
  const handleUpload = async () => {
    if (loading) return;;

    if (!user || files.length === 0) {
      return;
    }

    setLoading(true);
    try {
      // Loop through each file and store metadata and content
      for (const file of files) {
        // Storing metadata in Firestore
        const docRef = await addDoc(collection(db, 'users', user.id, 'files'), {
          userId: user.id,
          filename: file.name,
          fullname: user.fullName,
          profileImg: user.imageUrl,
          timestamp: serverTimestamp(),
          type: file.type,
          size: file.size,
          password: null,
        });

        // Storing file content in Firebase Storage
        const storageRef = ref(storage, `users/${user.id}/files/${docRef.id}`);
        const uploadTask = uploadBytesResumable(storageRef, file);

        // Listen for state changes, including progress updates
        uploadTask.on('state_changed',
          (snapshot) => {
            const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
            // console.log(`Upload for ${file.name} is ${progress.toFixed(2)}% done`);
            setProgress(`${progress.toFixed(0)}%`)
            setActive(true)
          },
          (error) => {
            console.error(`Error uploading ${file.name}:`, error);
          },
          async () => {
            // Upload completed, update Firestore document with downloadUrl
            const downloadUrl = await getDownloadURL(uploadTask.snapshot.ref);
            await updateDoc(doc(db, 'users', user.id, 'files', docRef.id), {
              downloadUrl: downloadUrl,
            });
            setProgress(`File Uploaded Successfully.`);
            setTimeout(() => {
              setProgress('0%');
            }, 200);
            notification();

            setTimeout(() => {
              router.push('/FilePreview/' + docRef.id)
            }, 3000);
            setFiles([]);
          }
        );
      }
    } catch (error) {
      console.error('Error uploading file:', error);
    }

    setLoading(false);
  };

  useEffect(() => {
    if (progress === 'File Uploaded Successfully.') {
      setUploadSuccess(true);
      setCompleted(true);
    }
  }, [progress]);


  return (
    <div className={`flex flex-col items-center justify-center ${files.length === 0 ? 'mt-40 mb-[-20vh] ' : 'my-16'} trans`}>
      <h1 className='text-2xl md:text-4xl mt-[-5vh] mb-12 text-center' > Start <strong className='text-primary'>Uploading</strong> files and <strong className='text-primary'>Share</strong> it </h1>
      <Dropzone onDrop={handleFiles}>
        {({ getRootProps, getInputProps, isDragActive, isDragReject, fileRejections, }) => (
          <section className="w-full">
            <div {...getRootProps()}>
              <input {...getInputProps()} />
              <div className={`min-h-52 w-full rounded-lg border p-3 ${isDragActive && !isDragReject ? 'bg-primary' : 'bg-secondary'} flex items-center justify-center`}>
                {!isDragActive &&
                  <div className="flex items-center justify-center flex-col text-center ">
                    <svg className="w-12 h-12 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"></path></svg>
                    <p className="mb-2 text-sm md:text-2xl text-center text-white"> <strong className="text-blue-400">Click</strong> to upload or <strong className="text-blue-400">drag and drop</strong> your file</p>
                    <p className="text-xs text-white/90">SVG, PNG, JPG or GIF (MAX SIZE: 3MB)</p>
                  </div>
                }

                {isDragActive && !isDragReject &&
                  <p className="text-xl text-white"> Drop here to upload the file </p>
                }

              </div>
            </div>
          </section>
        )}
      </Dropzone>


      {files.length === 0 || uploadSuccess === true ? (
        null
      ) : (
        <div className="text-black py-2 px-2 md:px-10 flex flex-col gap-6 border-[1px] border-solid border-primary/40 w-full mt-4">
          {files.map((file, index) => (
            <div key={index} className="flex gap-6 items-center justify-between p-2">
              <div className="flex items-center justify-center gap-3">
                <div className="p-3 w-[4.2rem] h-[5rem] flex items-end justify-end">
                  {file?.type?.includes('image') && (
                    <Image src='/Image/img.png' width='300' height='300' className="file" alt="Image" />
                  )}
                  {file?.type?.includes('application') && (
                    <Image src='/Image/pdf.png' width='300' height='300' className="file" alt="PDF" />
                  )}
                  {file?.type?.includes('video') && (
                    <Image src='/Image/vdo.png' width='300' height='300' className="file" alt="Video" />
                  )}
                </div>
                <div className="flex flex-col gap-1 text-sm">
                  <h1 className="truncate w-32 md:w-72"><strong>Name:</strong> {file?.name}</h1>
                  <h2><strong>Size:</strong> {bytesToSize(file?.size)}</h2>
                </div>
              </div>
              <XMarkIcon className="w-10 h-10 text-red-600 cursor-pointer hover:bg-gray-200/30 p-1 rounded-md" onClick={() => handleDelete(file)} />
            </div>
          ))}
        </div>
      )}


      {/* {loading && (
        <ProgressBar/>
      )} */}

      {/* <ProgressBar className={` progressBar bg-[#4cfb52] h-16 w-full sm:w-[18rem]  fixed right-[-20vw] top-0 sm:top-5 rounded-none sm:rounded-md ${completed === true ? 'hidden' : 'hidden sm:block'} ${active ? 'active' : ''}  `} progress={progress} /> */}


      <button
        disabled={files.length === 0 || uploadSuccess === true}
        onClick={(file) => {
          handleUpload(file);
          setCompleted(false);
        }}
        className={` uploadBtn w-full md:w-[15rem] h-[3rem] bg-blue-500 focus:bg-blue-300 mt-10 rounded-md text-white focus:text-blue-500 disabled:hidden hover:bg-blue-300 active:bg-blue-300 active:scale-[0.94] trans flex items-center sm:justify-start ${progress === '' || progress === '0%' ? 'justify-center' : 'justify-start'} relative`}>

        <div
          className={`flex h-full items-center justify-center bg-blue-500 rounded-md overflow-hidden`}
          style={{ width: `${progress === '0%' ? '0%' : progress}` }}
        >      <p className="absolute left-[50%] top-[50%] translate-x-[-50%] translate-y-[-50%]">{progress === '' || progress === '0%' ? 'Upload' : 'Uploading...' + progress}</p>
          <p className="absolute left-[50%] top-[50%] translate-x-[-50%] translate-y-[-50%] text-white ">{progress === '' || progress === '0%' ? 'Upload' : 'Uploading...' + progress}</p>
        </div>

        {/* <p className="hidden sm:block text-md">Upload</p> */}
      </button>
      <ToastContainer />
    </div>
  )
}

export default CustomDropzon
