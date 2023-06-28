"use client"
import { firestore } from "../../lib/firebase"
import { collection, getDocs } from "firebase/firestore"
import { useCollection } from "react-firebase-hooks"

import Message from "../../components/Message"

export default function Chat({params}: {params: {chats: string}}) {
    return (
      <div className="pt-28 p-4">
         <h1 className="dark:text-white font-main text-2xl">
           {params.chats}
         </h1>
         <Message author="Jothish" message="Hello There" />
      </div>
    )
}