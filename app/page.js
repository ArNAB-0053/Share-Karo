import Banner from '../Components/Banner'
import React from 'react'
import Header from '../Components/Header';

const page = () => {
  return (
    <div className='h-[100svh] overflow-hidden'>
      <Header/>
      <Banner/>      
    </div>
  )
}

export default page
