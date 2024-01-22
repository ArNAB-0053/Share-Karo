'use client'
import React from 'react'
import CustomDropzone from '../../../Components/CustomDropzone'

const page = () => {
  return (
    <div className='md:ml-[18rem] px-6 lg:px-16 xl:px-48 flex items-center justify-start flex-col w-full min-h-[100svh]'>
      <CustomDropzone />
    </div>
  )
}

export default page
