import './globals.css';
import { config } from '@fortawesome/fontawesome-svg-core'
import '@fortawesome/fontawesome-svg-core/styles.css'
config.autoAddCss = false

import { Inter } from 'next/font/google';
import Navbar from './components/Navbar';

const inter = Inter({ subsets: ['latin'] });

const title = "JJ Chat";
const description = "The best chat app equiped with privacy";
const url = "https://jjchat-six.vercel.app";
const image = "https://firebasestorage.googleapis.com/v0/b/chat-jj.appspot.com/o/20230708_084740.png?alt=media&token=885103b6-6254-43d9-bfe8-c28018679e45";
export const metadata = {
    title: title,
    description: description,
    openGraph: {
      title: title,
      description: description,
      url: url,
      images: image,
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: title,
      description: description,
      images: [image],
    },
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
