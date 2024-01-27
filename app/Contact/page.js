import Image from 'next/image'
import Header from '../../Components/Header'
import ContactEmail from '../(routes)/Components/ContactEmail'

const page = () => {
  return (
    <div className='overflow-x-hidden'>
      <Header />
      <div className='flex items-center justify-between flex-col lg:flex-row max-[400px]:mt-20'>
        <div className='hidden lg:w-[50vw] bg-sidebar_color aspect-[16/9]  lg:flex items-center justify-center flex-col text-blue-400 px-8'>
          <Image width='1500' height='1500' src='/Image/only_logo.png' className='w-80 brightness-200' />
          <h1 className='text-5xl font-bold'>How can I help you?</h1>
          <p className='text-blue-400/80 text-md text-center mt-8'>Feel free to contact me! Whether you have questions, feedback, or just want to connect, I'm here for you. Your messages are always welcome, and I look forward to hearing from you soon!</p>
        </div>
        <div className='w-[50vw] h-[100svh] flex items-center justify-center '>
          <ContactEmail />
        </div>
      </div>
    </div>
  )
}

export default page
