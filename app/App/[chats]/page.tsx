"use client"
import { firestore } from "../../lib/firebase"
import { collection, query, limit, orderBy } from "firebase/firestore"
import { useCollection } from "react-firebase-hooks/firestore"

import { useParams, useRouter } from "next/navigation";
import { useEffect } from "react";

import Message from "../../components/Message"


export default function Chat() {
  const params = useParams();
  const router = useRouter();
  
  const chatsRef = query(collection(firestore, `chats/${params.chats}/chat`), orderBy("createdAt"), limit(25));
  const [chatsSnapshot, chatsLoading, chatsError] = useCollection(chatsRef);
  
  const chatsIdRef = collection(firestore, `chats`);
  const [chatIdSnapshot, chatsIdLoading, chatsIdError] = useCollection(chatsIdRef);
  
  useEffect(() => {
  if(chatIdSnapshot) {
    const noMatch = chatIdSnapshot.docs.every(item => item.id !== params.chats)
    if(noMatch) {
      router.push("/")
    }
  }
 }, [chatIdSnapshot, chatsIdLoading])
 
  if(chatsLoading)
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="loader"></div>
      </div>
    )
  
  if(chatsSnapshot)
    return (
        <div className="pt-28 p-4">
           <h1 className="dark:text-white font-main text-2xl">
             {params.chats}
           </h1>
           <div className="space-y-4">
             {chatsSnapshot.docs.map(doc => {
               const data = doc.data()
               return <Message key={doc.id} author={data.author} message={data.message} />
             })}
           </div>
        </div>
    )
}
