import type { Metadata } from 'next'
import { Kanit } from 'next/font/google'
import './globals.css'

const kanit = Kanit({ subsets: ['latin'], weight: '400' })

export const metadata: Metadata = {
  title: 'VisuAlgo',
  description: 'interactive algorithm visualizer app',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className={`${kanit.className} bg-blue-950 text-white`}>
        {children}
      </body>
    </html>
  )
}
