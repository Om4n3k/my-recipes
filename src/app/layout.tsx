import { auth } from "@/auth"
import { cn } from "@/lib/utils"
import { v2 as cloudinary } from 'cloudinary'
import { HomeIcon, PlusCircleIcon, UserIcon, UsersIcon } from "lucide-react"
import { Metadata } from "next"
import { Lato } from "next/font/google"
import TabLink from '../components/TabLink'
import './globals.css'

export const metadata: Metadata = {
  title: 'Hello World'
}

const lato = Lato({
  subsets: ['latin'],
  weight: ['400', '700'],
})

cloudinary.config({
  secure: true,
})

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const session = await auth();
  const loggedIn = !!session?.user;

  return (
    <html lang="en" className={cn(lato.className, 'antialiased')}>
      <head />
      <body className="pb-16">
        <main className="p-4">
          {children}
        </main>
        <nav className='bottom-0 left-0 fixed flex items-center bg-rose-600 py-1 w-full h-16'>
          <TabLink href='/' icon={<HomeIcon />} label='Home' />
          {loggedIn && (
            <TabLink href='/profile' icon={<UserIcon />} label='Profile' />
          )}
          {!loggedIn && (
            <TabLink href='/auth' icon={<UsersIcon />} label='Login' />
          )}
          <TabLink href='/recipe/new' icon={<PlusCircleIcon />} label='Create' />
        </nav>
      </body>
    </html>
  )
}