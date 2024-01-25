'use client'
import { UserButton } from "@clerk/nextjs";
import Sidebar from "../../Components/Sidebar";
import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import Image from "next/image";

const Header = () => {
    const [sidebar, setSidebar] = useState(false);

    const showSidebar = () => {
        setSidebar(true);
    }

    const sidebarRef = useRef(null);

    const closeSidebar = () => {
        setSidebar(false);
    };

    useEffect(() => {
        const handleOutsideClick = (e) => {
            if (sidebarRef.current && !sidebarRef.current.contains(e.target)) {
                closeSidebar();
            }
        };

        if (sidebar) {
            document.addEventListener('click', handleOutsideClick);
        }

        return () => {
            document.removeEventListener('click', handleOutsideClick);
        };
    }, [sidebar]);

    return (
        <header className="shadow-md shadow-primary/10 py-1 px-3 flex items-center justify-between">
            <div className="trans">
                <button className="rounded bg-[#B5c99a3] p-2 text-primary transition  " onClick={showSidebar}>
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-8 w-8"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        strokeWidth="2"
                    >
                        <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
                    </svg>
                </button>
                <span className={`fixed top-0 z-40 ${sidebar ? 'left-0' : 'left-[-100%]'} md:left-0 trans`} ref={sidebarRef}>
                    <Sidebar closeSideBar={closeSidebar} />
                </span>
            </div>

            <div className={`${sidebar ? 'bg-[#212529c4] w-[430vw] opacity-1' : 'bg-transparent w-0 opacity-0'} trans fixed h-[150vh] top-[-4vh] right-0 z-10`}></div>

            <div className="md:flex md:items-center md:gap-12">
                <Link href='/' className='h-16 w-36 overflow-hidden'>
                    <Image src='/Image/lenthy_logo.png' width='140' height='60' className='h-10 w-32 block md:hidden' />
                </Link>
            </div>

            <button className=''>
                <UserButton afterSignOutUrl="/" />
            </button>
        </header>
    )
}

export default Header
