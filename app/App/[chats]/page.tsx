"use client"
import { firestore } from "../../lib/firebase"
import { collection, limit, onSnapshot, orderBy, query } from "firebase/firestore"

import { useEffect, useState } from "react"
import { useParams, useRouter } from "next/navigation"

import Message from "../../components/Message"

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faPaperPlane } from "@fortawesome/free-solid-svg-icons"

interface Chat {
  id: string,
  author: string,
  message: string,
}

export default function Chat() {
  const params = useParams();
  const router = useRouter();
  
  const [message, setMessage] = useState("");
  
  const [loading, setLoading] = useState(true);
  const [chatsId, setChatsId] = useState<any[]>([]);  
  const chatsIdRef = collection(firestore, "chats")
  
  // Updates loading and chatsId
  useEffect(() => {
     const unsubscribe = onSnapshot(chatsIdRef, snapshot => {
      const paths: any[] = []
      snapshot.forEach((doc) => {
        paths.push(doc.id);
        setLoading(false);
      })
      setChatsId(paths);
    });
    
    return () => unsubscribe();
  }, [chatsIdRef])
  
  
  // Checks the if page is allowed
  useEffect(() => {
    chatsId.every((chatId) => {
      if(chatId !== params.chats)
        router.push("/404");
    })
  }, [loading, chatsId, params.chats, router])
  
  // Updates Chats realtime
  const [chats, setChats] = useState<Chat[]>([]);
  useEffect(() => {
    const chatsRef = collection(firestore, `chats/${params.chats}/chat`);
    const q = query(chatsRef, orderBy("createdAt"), limit(25));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const updatedChat: Chat[] = [];
      snapshot.docs.map(doc => {
        const chat: Chat = {
          id: doc.id,
          author: doc.data().author,
          message: doc.data().message,
        }
        updatedChat.push(chat);
      })
      setChats(updatedChat);
    })
    return () => {
      unsubscribe();
    }
  }, [params.chats])
  
  if(loading) 
    return (
      <div className="h-screen flex justify-center items-center">
        <div className="loader"></div>
      </div>
    )
  
  if(!loading)
    return (
      <div className="pt-28 p-4">
         <h1 className="dark:text-white font-main text-2xl">
           {params.chats}
         </h1>
         <div className="space-y-4">
          {chats.map(doc => {
             return (<Message key={doc.id} author={doc.author} message={doc.message}  />)
           })}
         </div>
         <form className="fixed bottom-0 left-0 right-0 flex gap-2
          justify-evenly bg-neutral-100 dark:bg-neutral-800 p-4">
           <input
             placeholder="Send Mesaage!" 
             className="auth-inputs" 
             value={message}
             onChange={(e) => setMessage(e.target.value)}
           />
           <button type="submit" className="text-2xl dark:text-white" >
             <FontAwesomeIcon icon={faPaperPlane} />
           </button>
         </form>
      </div>
    )
}