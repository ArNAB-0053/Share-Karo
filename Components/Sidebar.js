"use client";
import Link from "next/link";
import {
  ArrowUpTrayIcon,
  FolderIcon,
  HomeIcon,
  PhoneIcon,
  ShieldCheckIcon,
  UserIcon,
} from "@heroicons/react/24/solid";
import { useEffect, useState, useContext } from "react";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";

const Sidebar = ({ closeSideBar }) => {
  // sidebar is in routes folder's header
  const [activeUp, setActiveUp] = useState(false);
  const [activeFile, setActiveFile] = useState(false);
  const [activeUpg, setActiveUpg] = useState(false);
  const router = useRouter();
  const pathname = usePathname();

  // console.log(pathname);

  useEffect(() => {
    if (pathname === "/Files") {
      setActiveFile(true);
      setActiveUp(false);
      setActiveUpg(false);
    } else if (pathname === "/Upload") {
      setActiveUp(true);
      setActiveFile(false);
      setActiveUpg(false);
    } else if (pathname === "Upgrade") {
      setActiveFile(false);
      setActiveUp(false);
      setActiveUpg(true);
    } else {
      setActiveFile(false);
      setActiveUp(false);
      setActiveUpg(false);
    }
  }, [pathname]);

  return (
    <div className="w-[18rem] bg-sidebar_color h-[100lvh] flex flex-col items-start justify-start gap-6 ">
      <Link href='/' className="h-auto w-full pt-5 overflow-hidden flex items-center justify-center">
        <Image
          src="/Image/main_logo.png"
          width="140"
          height="60"
          className="h-24 w-32 block md:hidden"
        />
        <Image
          src="/Image/logo.png"
          width="140"
          height="60"
          className="h-7 w-36 md:block hidden"
        />
      </Link>
      <div className="w-full h-[1px] mb-6 bg-white/35"></div>
      <div className="w-full">
        <nav aria-label="Global">
          <ul className="flex items-start justify-start gap-2 text-lg font-[Montserrat] font-bold flex-col w-full">
            <Link
              onClick={() => {
                setActiveFile(true);
                setActiveUp(false);
                setActiveUpg(false);
                closeSideBar();
              }}
              className={`dashboard_items ${
                activeFile && "bg-blue-400 text-white"
              } `}
              href="/Files"
            >
              <FolderIcon className="icon_dash" />
              Files
            </Link>

            <Link
              onClick={() => {
                setActiveUp(true);
                setActiveFile(false);
                setActiveUpg(false);
                closeSideBar();
              }}
              className={`dashboard_items ${
                activeUp && "bg-blue-400 text-white"
              }`}
              href="/Upload"
            >
              <ArrowUpTrayIcon className="icon_dash" />
              Upload
            </Link>

            <Link
              onClick={() => {
                setActiveUp(false);
                setActiveFile(false);
                setActiveUpg(true);
                closeSideBar();
              }}
              className={`dashboard_items ${
                activeUpg && "bg-blue-400 text-white"
              }`}
              href="/Upgrade"
            >
              <ShieldCheckIcon className="icon_dash" />
              Upgrade
            </Link>
          </ul>
        </nav>
      </div>

      <div className="w-full h-[1px] my-6 bg-white/35"></div>

      <div className="">
        <nav aria-label="Global">
          <ul className="w-full flex items-center justify-center gap-2 font-[Montserrat] font-bold flex-col text-md pl-[0.3rem]">
            <Link className="dashboard_items gap-4" href="/">
              <HomeIcon className="h-5 w-5" />
              Home
            </Link>
            <Link className="dashboard_items gap-4" href="/About">
              <UserIcon className="h-5 w-5" />
              About
            </Link>
            <Link className="dashboard_items gap-4" href="/Contact">
              <PhoneIcon className="h-5 w-5" />
              Contact
            </Link>
          </ul>
        </nav>
      </div>
    </div>
  );
};

export default Sidebar;
