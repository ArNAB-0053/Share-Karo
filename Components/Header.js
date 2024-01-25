'use client'
import { HomeIcon, PhoneIcon, UserIcon } from '@heroicons/react/24/solid'
import Image from 'next/image'
import Link from 'next/link'
import { useEffect, useRef, useState } from 'react'
import Media from './Media'

const Header = () => {
    const [toggle, setToggle] = useState(false)
    const sidebarRef = useRef(null);

    const closeSidebar = () => {
        setToggle(false);
    };

    useEffect(() => {
        const handleOutsideClick = (e) => {
            if (sidebarRef.current && !sidebarRef.current.contains(e.target)) {
                closeSidebar();
            }
        };

        if (toggle) {
            document.addEventListener('click', handleOutsideClick);
        }

        return () => {
            document.removeEventListener('click', handleOutsideClick);
        };
    }, [toggle]);

    return (
        <header className="bg-[#395886]/0 py-1 border shadow-primary/10 shadow-md">
            <div className="mx-auto max-w-screen-xl px-4 sm:px-6 lg:px-8 relative">
                <div className="flex h-16 items-center justify-between">
                    <div className="md:flex md:items-center md:gap-12">
                        <Link href='/' className='h-16 w-36 overflow-hidden'>
                            <Image src='/Image/lenthy_logo.png' width='140' height='60' className='h-12 w-36 hidden lg:block' />
                            <Image src='/Image/only_logo.png' width='140' height='60' className='h-12 w-20 lg:hidden' />
                        </Link>
                    </div>

                    <div className={`${toggle ? 'bg-[#212529c4] w-[430vw] opacity-1' : 'bg-transparent w-0 opacity-0'} trans fixed h-[150vh] top-[-4vh] left-0`}></div>

                    <div className={`absolute overflow-hidden right-[-80vw] trans bg-sidebar_color w-[18rem] h-[150lvh] py-16  gap-5 top-[-5vh] md:hidden ${toggle ? 'right-[0] ' : ''}`}  ref={sidebarRef} >
                        <span className='h-auto w-full py-5 overflow-hidden flex items-center justify-center'>
                            <Image src='/Image/main_logo.png' width='140' height='60' className='h-28 w-36' />
                        </span>
                        <div aria-label="Global">
                            <div className="flex items-center justify-center flex-col text-lg font-[Montserrat] font-bold text-blue-400 lg:text-primary gap-4">
                                <div className='line mb-12 mt-6'></div>
                                <Link href="/" className='mobileHeader'>
                                    <span className='flex items-center justify-start gap-2 w-[6.7rem] ml-1'>
                                        <HomeIcon className='h-5 w-5 ' />
                                        Home
                                    </span>
                                </Link>
                                <Link href="/About" className='mobileHeader'>
                                    <span className='flex items-center justify-start gap-2 w-[6.7rem] ml-1'>
                                        <UserIcon className='h-5 w-5 ' />
                                        About
                                    </span>
                                </Link>
                                <Link href="/Contact" className='mobileHeader'>
                                    <span className='flex items-center justify-start gap-2 w-[6.7rem] ml-1' >
                                        <PhoneIcon className='h-5 w-5 ' />
                                        Contact
                                    </span>
                                </Link>
                                <div className='line mt-12'></div>
                            </div>
                        </div>
                        <Media />
                    </div>

                    <div className={`hidden md:block`} >
                        <nav aria-label="Global">
                            <ul className="flex items-center justify-center gap-6 text-lg font-[Montserrat] font-bold text-primary">
                                <li>
                                    <Link className="" href="/"> Home </Link>
                                </li>
                                <li>
                                    <Link className="" href="/About"> About </Link>
                                </li>
                                <li>
                                    <Link className="" href="/Contact"> Contact </Link>
                                </li>
                            </ul>
                        </nav>
                    </div>


                    <div className="flex items-center gap-4">
                        <div className="sm:flex sm:gap-4">
                            <Link
                                className="rounded-md bg-primary px-5 py-2.5 text-sm font-medium text-white shadow hover:bg-header_hover"
                                href="/Files"
                            >
                                Get started
                            </Link>
                        </div>

                        <div className="block md:hidden" >
                            <button className="rounded bg-[#B5c99a3] p-2 text-primary transition" onClick={() => setToggle(!toggle)}>
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    className="h-5 w-5"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
                                    strokeWidth="2"
                                >
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
                                </svg>
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </header>
    )
}

export default Header
