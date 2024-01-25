import React from 'react'
import Header from './Header'
import Link from 'next/link'

const Banner = () => {
    return (
        <section className=''>
            <div className="mx-auto max-w-screen-xl px-4 py-32 lg:flex lg:h-screen lg:items-center">
                <div className="mx-auto max-w-3xl text-center px-4">
                    <h1 className="text-3xl font-extrabold sm:text-5xl">
                        <span className='text-primary'> Upload, save</span> and
                        <span className='text-primary mx-2'>share</span> 
                        your files easily.
                    </h1>

                    <p className="mt-4 sm:text-xl/relaxed">
                    Easily upload, save, and share your awesome files with us! Whether it's photos, documents, or memes – we've got you covered. Ready to make file sharing a breeze? Let's get started!!
                    </p>

                    <div className="mt-8 flex flex-wrap justify-center gap-4">
                        <Link
                            className="block w-[70%] rounded bg-primary px-12 py-3 text-sm font-medium text-white shadow hover:bg-header_hover focus:outline-none sm:w-auto"
                            href="/Files"
                        >
                            Get Started
                        </Link>

                        <Link
                            className="block w-[70%] rounded px-12 py-3 text-sm font-medium text-primary shadow hover:text-header_hover hover:bg-gray-200 focus:outline-none active:text-header_hover sm:w-auto"
                            href="/About"
                        >
                            Learn More
                        </Link>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default Banner
