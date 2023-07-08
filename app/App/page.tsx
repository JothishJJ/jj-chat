"use client"
import Image from "next/image";
import Link from "next/link";

import {useState, useEffect} from "react";

import { firestore } from "../lib/firebase";
import { collection, onSnapshot } from "firebase/firestore";

export default function ChatApp() {
  
  const [loading, setLoading] = useState(true);
  
  const chatsRef = collection(firestore, "chats");
  const [chats, setChats] = useState<any[]>([]);
  useEffect(() => {
    const unsubscribe = onSnapshot(chatsRef, (snapshot) => {
      const chatsArray: any[] = [];
      snapshot.forEach(doc => {
        chatsArray.push(
          {
            title: doc.id,
            photoUrl: `https://dummyimage.com/40x40/ffffff/808080&text=${doc.id.charAt(0)}`,
          }
        )
      })
      setLoading(false);
      setChats(chatsArray);
    })
    return () => unsubscribe();
    }, [])
    
  if(loading) 
      return (
        <div className="h-screen flex justify-center items-center">
          <div className="loader"></div>
        </div>
     )  
     
    if(!loading) 
     return (
       <div className="pt-32 flex flex-col items-center px-4 gap-4">
          <h1 className="font-main text-2xl text-rose-600">Chats</h1>
          {
            chats.map((chat, index) => {
              return (
              <Link 
                className="w-full" 
                key={index}
                href={`/App/${chat.title}`}
              >
                <div className="flex items-center gap-2 pb-2">
                  <Image src={chat.photoUrl} alt="Profile" height={50} width={50} className="rounded-3xl" />
                  <p className="font-main dark:text-white">{chat.title}</p>
                </div>
                <hr />
              </Link>
              )
            })
          }
        </div>)
}
