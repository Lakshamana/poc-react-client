import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Duckduckgoer',
  description: 'A client for DuckDuckGo API.',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang='en'>
      <head>
        <link rel='icon' href='/duck.svg' />
      </head>
      <body className={inter.className + ' overflow-x-hidden'}>{children}</body>
    </html>
  )
}
