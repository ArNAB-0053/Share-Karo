import React from 'react'
import Header from './Header'

const layout = ({ children }) => {
  return (
    <div className='min-h-[100svh]'>
      <Header />
      <div className='overflow-hidden flex items-start justify-start'>
        {children}
      </div>
    </div>
  )
}

export default layout
