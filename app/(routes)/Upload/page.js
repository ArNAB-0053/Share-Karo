'use client'
import React from 'react'
import CustomDropzone from '../../../Components/CustomDropzone'

const page = () => {
  return (
    <div className='md:ml-[18rem] px-8 md:px-24 xl:px-48 flex items-center justify-start mt-40 flex-col w-full min-h-[100svh]'>
      <h1 className='text-2xl md:text-4xl mt-[-5vh] mb-12 text-center' > Start <strong className='text-primary'>Uploading</strong> files and <strong className='text-primary'>Share</strong> it </h1>
      <div className='w-full '>
        <CustomDropzone />
      </div>
    </div>
  )
}

export default page
