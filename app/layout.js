import { Inter, Montserrat } from 'next/font/google'
import './globals.css'
import { ClerkProvider } from '@clerk/nextjs'
import NextTopLoader from 'nextjs-toploader'

const inter = Montserrat({ subsets: ['latin'] })

export const metadata = {
  title: 'sharekaro',
  description: 'sharekaro is a hassle-free file sharing app. Our platform offers a seamless and secure way to share files with friends, family, and colleagues',
}

export default function RootLayout({ children }) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body className={`${inter.className} bg-white scrollbar-thin scrollbar-thumb-zinc-400`}>
          <NextTopLoader color="#60A5FA" />
          {children}
        </body>
      </html>
    </ClerkProvider>
  )
}
