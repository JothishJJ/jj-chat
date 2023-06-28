"use client"
import { firestore } from "../../lib/firebase"
import { collection, onSnapshot } from "firebase/firestore"
import { useCollection } from "react-firebase-hooks"

import { useEffect, useState } from "react"
import { useParams, useRouter } from "next/navigation"

import Message from "../../components/Message"

export default function Chat() {
  const params = useParams();
  const router = useRouter();
  
  const [loading, setLoading] = useState(true);
  const [chatsId, setChatsId] = useState<any[]>([]);
  
  const chatsIdRef = collection(firestore, "chats")
  
  // Updates loading and chatsId
  useEffect(async () => {
    const unsubscribe = await onSnapshot(chatsIdRef, snapshot => {
      const paths = []
      snapshot.forEach((doc) => {
        paths.push(doc.id);
        setLoading(false);
      })
      setChatsId(paths);
    });
    
    return () => unsubscribe;
  }, [])
  
  
  // Checks the if page is allowed
  useEffect(() => {
    chatsId.every((chatId) => {
      if(chatId !== params.chats)
        router.push("/404");
    })
  }, [loading, chatsId])
  
  if(loading) 
    return (
      <div>
        <div className="loader"></div>
      </div>
    )
  
  if(!loading)
    return (
      <div className="pt-28 p-4">
         <h1 className="dark:text-white font-main text-2xl">
           {params.chats}
         </h1>
         <Message author="Jothish" message="Hello There" />
      </div>
    )
}