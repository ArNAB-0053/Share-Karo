import React from 'react'
import Header from './Header'

const layout = ({ children }) => {
  return (
    <div className='h-[100svh] overflow-hidden'>
      <div>
        <Header />
      </div>
      <div className='flex items-start justify-start'>
        {children}
      </div>
    </div>
  )
}

export default layout
