'use client'
import Link from "next/link"
import { ArrowUpTrayIcon, FolderIcon, HomeIcon, PhoneIcon, ShieldCheckIcon, UserIcon } from '@heroicons/react/24/solid'
import { useEffect, useState, useContext } from "react"

const Sidebar = ({ closeSideBar }) => {
    // sidebar is in routes folder's header
    const [activeUp, setActiveUp] = useState(false);
    const [activeFile, setActiveFile] = useState(false);
    const [activeUpg, setActiveUpg] = useState(false);

    useEffect(() => {
        if (location.pathname === '/Files') {
            setActiveFile(true);
            setActiveUp(false);
        }

        if (location.pathname === '/Upload') {
            setActiveUp(true);
            setActiveFile(false);
        }
    }, [])

    return (
        <div className='w-[18rem] bg-sidebar_color h-[100svh] flex flex-col items-start justify-start gap-6 '>
            <div className="py-3">
                <h1>Fileshare.</h1>
            </div>
            <div className="w-full">
                <nav aria-label="Global">
                    <ul className="flex items-start justify-start gap-2 text-lg font-[Montserrat] font-bold flex-col w-full">
                        <Link onClick={() => { setActiveFile(true); setActiveUp(false); setActiveUpg(false); closeSideBar() }} className={`dashboard_items ${activeFile && 'bg-header_hover'} `} href="/Files">
                            <FolderIcon className="icon_dash" />
                            Files
                        </Link>

                        <Link onClick={() => { setActiveUp(true); setActiveFile(false); setActiveUpg(false); closeSideBar() }} className={`dashboard_items ${activeUp && 'bg-header_hover'}`} href="/Upload">
                            <ArrowUpTrayIcon className="icon_dash" />
                            Upload
                        </Link>

                        <Link onClick={() => { setActiveUp(false); setActiveFile(false); setActiveUpg(true); closeSideBar() }} className={`dashboard_items ${activeUpg && 'bg-header_hover'}`} href="/Upgrade">
                            <ShieldCheckIcon className="icon_dash" />
                            Upgrade
                        </Link>
                    </ul>
                </nav>
            </div>

            <div className="w-full h-[1px] my-6 bg-white/35"></div>

            <div className="">
                <nav aria-label="Global">
                    <ul className="w-full flex items-start justify-start gap-2 text-lg font-[Montserrat] font-bold flex-col">
                        <Link className="dashboard_items" href="/">
                            <HomeIcon className="icon_dash" />
                            Home
                        </Link>
                        <Link className="dashboard_items" href="/About">
                            <UserIcon className="icon_dash" />
                            About
                        </Link>
                        <Link className="dashboard_items" href="/Contact">
                            <PhoneIcon className="icon_dash" />
                            Contact
                        </Link>
                    </ul>
                </nav>
            </div>
        </div>
    )
}

export default Sidebar
