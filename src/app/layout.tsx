import './globals.css'
import { Metadata } from "next"
import { Lato } from "next/font/google"

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
      <body>{children}</body>
    </html>
  )
}