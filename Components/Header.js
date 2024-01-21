import Link from 'next/link'
import React from 'react'

const Header = () => {
    return (
        <header className="bg-secondary/0 py-1">
            <div className="mx-auto max-w-screen-xl px-4 sm:px-6 lg:px-8">
                <div className="flex h-16 items-center justify-between">
                    <div className="md:flex md:items-center md:gap-12">
                        <Link href='/'>
                            <h1>Fileshare.</h1>
                        </Link>
                    </div>

                    <div className="hidden md:block">
                        <nav aria-label="Global">
                            <ul className="flex items-center gap-6 text-lg font-[Montserrat] font-bold">
                                <li>
                                    <Link className="" href="/"> Home </Link>
                                </li> 
                                <li>
                                    <Link className="" href="/Upload"> Upload </Link>
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

                        <div className="block md:hidden">
                            <button className="rounded bg-[#B5c99a3] p-2 text-primary transition">
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
