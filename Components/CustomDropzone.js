'use client'
import { useEffect, useState } from "react"
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Bounce } from "react-toastify";

const CustomDropzon = () => {
  const [files, setFiles] = useState()

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
    if(files && files.size > 300000) {
      notify();
      return;
    }  
    setFiles(files);
  }
  
  return (
    <div className="max-w-2xl mx-auto flex justify-center items-center flex-col">
      <div className="flex items-center justify-center w-full">
        <label for="dropzone-file" className="flex flex-col items-center justify-center w-full h-64 border-2 border-gray-300 border-solid rounded-lg cursor-pointer bg-secondary px-4">
          <div className="pt-5 pb-6">
            {!files ? (
              <div className="flex flex-col items-center justify-center ">
                <svg className="w-12 h-12 mb-3 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"></path></svg>
                <p className="mb-2 text-sm md:text-2xl text-center text-white"> <strong className="text-blue-400">Click</strong> to upload or <strong className="text-blue-400">drag and drop</strong> your file</p>
                <p className="text-xs text-white/90">SVG, PNG, JPG or GIF (MAX SIZE: 3MB)</p>
              </div>
            ) : (
              <div className="text-white p-6 flex gap-4 md:gap-16 items-center justify-between max-[768px]:flex-col ">
                <div className="p-12 bg-slate-200">
                  {files.type.includes('image') && <p>img</p>}
                  {files.type.includes('application') && <p>pdf</p>}
                  {files.type.includes('video') && <p>vdo</p>}
                </div>
                <div className="flex flex-col gap-1 mt-3">
                  <h1 className="truncate w-64"><strong>Name</strong> {files.name}</h1>
                  <h2><strong>Size:</strong> {bytesToSize(files.size)}</h2>
                </div>
              </div>
            )
            }
          </div>
          <input onChange={(e) => { handleFiles(e.target.files[0]) }} id="dropzone-file" type="file" className="hidden" />
        </label>
      </div>
      <button disabled={!files} className="w-full md:w-auto h-auto py-3 px-10 bg-blue-500 mt-10 rounded-md text-white disabled:hidden">
        Upload
      </button>
      <script src="https://unpkg.com/flowbite@1.4.0/dist/flowbite.js"></script>
      <ToastContainer />
    </div>
  )
}

export default CustomDropzon
