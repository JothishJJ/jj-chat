import './globals.css';
import { config } from '@fortawesome/fontawesome-svg-core'
import '@fortawesome/fontawesome-svg-core/styles.css'
config.autoAddCss = false

import { Inter } from 'next/font/google';
import Navbar from './components/Navbar';

const inter = Inter({ subsets: ['latin'] });

export const metadata = {
    title: "JJ Chat",
    description: "The best chat app equiped with privacy"
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className + " dark:bg-neutral-900 bg-neutral-50"}>
        <Navbar />
        {children}
      </body>
    </html>
  )
}
