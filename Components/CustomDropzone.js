'use client'
import { useEffect, useState } from "react"
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Bounce } from "react-toastify";
import React from 'react'
import Dropzone from 'react-dropzone'
import Image from "next/image";
import { XMarkIcon } from "@heroicons/react/24/solid";
import { getStorage, ref, uploadBytesResumable } from "firebase/storage";
import {storage} from '../firebase'

const CustomDropzon = () => {
  const [files, setFiles] = useState([])

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
    // console.log(files)
  }

  // console.log(files.length)

  const handleDelete = (fileToDelete) => {
    setFiles((prevFiles) => prevFiles.filter((file) => file !== fileToDelete));
  };



  // Firebase Storage
  const metadata = {
    contentType: files.map((file) => file.type),
  };
  console.log(metadata.contentType);
  const filename = {
    fileName: files.map((file) => file.name),
  } // console.log(filename.fileName)

  const handleUpload = (file) => {
    const storageRef = ref(storage, 'share-karo/' + filename.fileName);
    const uploadTask = uploadBytesResumable(storageRef, file, metadata);

    uploadTask.on('state_changed',
      (snapshot) => {
        // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
        const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        console.log('Upload is ' + progress + '% done');
      },
    );
  };



  return (
    <div className={`flex flex-col items-center justify-center ${files.length === 0 ? 'mt-40 mb-[-20vh] ' : 'my-12'}`}>
      <h1 className='text-2xl md:text-4xl mt-[-5vh] mb-12 text-center' > Start <strong className='text-primary'>Uploading</strong> files and <strong className='text-primary'>Share</strong> it </h1>
      <Dropzone onDrop={handleFiles}>
        {({ getRootProps, getInputProps }) => (
          <section className="w-full">
            <div {...getRootProps()}>
              <input {...getInputProps()} />
              <div className="min-h-52 w-full rounded-lg border p-3 bg-secondary flex items-center justify-center">
                <div className="flex items-center justify-center flex-col text-center ">
                  <svg className="w-12 h-12 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"></path></svg>
                  <p className="mb-2 text-sm md:text-2xl text-center text-white"> <strong className="text-blue-400">Click</strong> to upload or <strong className="text-blue-400">drag and drop</strong> your file</p>
                  <p className="text-xs text-white/90">SVG, PNG, JPG or GIF (MAX SIZE: 3MB)</p>
                </div>

              </div>
            </div>
          </section>
        )}
      </Dropzone>


      {files.length === 0 ? (
        null
      ) : (
        <div className="text-black py-2 px-2 md:px-10 flex flex-col gap-6 border-[1px] border-solid border-primary/40 w-full mt-4">
          {files.map((file, index) => (
            <div key={index} className="flex gap-6 items-center justify-between p-2">
              <div className="flex items-center justify-center gap-3">
                <div className="p-3 w-[4.2rem] h-[5rem] flex items-end justify-end">
                  {file.type.includes('image') && (
                    <Image src='/Image/img.png' width='300' height='300' className="file" alt="Image" />
                  )}
                  {file.type.includes('application') && (
                    <Image src='/Image/pdf.png' width='300' height='300' className="file" alt="PDF" />
                  )}
                  {file.type.includes('video') && (
                    <Image src='/Image/vdo.png' width='300' height='300' className="file" alt="Video" />
                  )}
                </div>
                <div className="flex flex-col gap-1 text-sm">
                  <h1 className="truncate w-32 md:w-72"><strong>Name:</strong> {file.name}</h1>
                  <h2><strong>Size:</strong> {bytesToSize(file.size)}</h2>
                </div>
              </div>
              <XMarkIcon className="w-10 h-10 text-red-600 cursor-pointer hover:bg-gray-200/30 p-1 rounded-md" onClick={() => handleDelete(file)} />
            </div>
          ))}
        </div>
      )}


      <button disabled={files.length === 0} onClick={(file) => { handleUpload(file) }} className="w-full md:w-auto h-auto py-3 px-10 bg-blue-500 mt-10 rounded-md text-white disabled:hidden">
        Upload
      </button>
      <ToastContainer />
    </div>
  )
}

export default CustomDropzon
