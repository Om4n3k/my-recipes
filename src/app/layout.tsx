import { Metadata } from "next"
import { Lato } from "next/font/google"
import { CgHome } from 'react-icons/cg'
import './globals.css'
import TabLink from '../components/TabLink'

export const metadata: Metadata = {
  title: 'Hello World'
}

const lato = Lato({
  subsets: ['latin'],
  weight: ['400', '700'],
})

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={lato.className}>
      <head />
      <body className="pb-16">
        {children}
        <nav className='bottom-0 left-0 fixed flex justify-center items-center bg-rose-600 py-1 w-full h-16'>
          <TabLink href='/' icon={<CgHome/>} label='Home'/>
        </nav>
      </body>
    </html>
  )
}