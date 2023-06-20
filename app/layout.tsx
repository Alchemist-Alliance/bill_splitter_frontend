import { Header } from '@/components'
import { Recursive } from 'next/font/google'
import './globals.css'

const recursive = Recursive({ weight: ['400', '600', '700', '800', '900'], subsets: ['latin'] })

export const metadata = {
  title: 'Bill Splitter',
  description: 'yes daddy ahh',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={`flex flex-col min-w-screen h-screen bg-primary ${recursive.className}`} suppressHydrationWarning={true}>
        <Header />
        {children}
      </body>
    </html>
  )
}
