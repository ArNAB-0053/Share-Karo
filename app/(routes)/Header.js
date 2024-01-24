'use client'
import { UserButton } from "@clerk/nextjs";
import Sidebar from "../../Components/Sidebar";
import { useEffect, useRef, useState } from "react";
import { XMarkIcon } from '@heroicons/react/24/solid'

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
        <header className="shadow-md py-1 px-3 flex items-center justify-between">
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
                {/* <XMarkIcon className={`bg-sidebar_color fixed cursor-pointer h-[3rem] w-[3rem] ${sidebar? `left-[19.9rem]` : 'left-[calc(-100%+17.9rem)]' }  top-0 shadow-lg z-40 md:hidden text-red-500 p-1 trans`} onClick={()=>{setSidebar(false)}} /> */}
            </div>

            <h1 className="md:hidden">FileShare.</h1>

            <button className=''>
                <UserButton afterSignOutUrl="/" />
            </button>
        </header>
    )
}

export default Header
