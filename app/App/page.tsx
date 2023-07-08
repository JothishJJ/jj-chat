"use client"
import Image from "next/image";
import Link from "next/link";

import {useState, useEffect} from "react";

import { firestore } from "../lib/firebase";
import { collection, onSnapshot, serverTimestamp, addDoc, doc, setDoc } from "firebase/firestore";

import Button from "../components/Button";
import { useRouter } from "next/navigation";

export default function ChatApp() {
  
  const [loading, setLoading] = useState(true);
  
  const [open, setOpen] = useState(false);
  const [chatTitle, setChatTitle] = useState('');
  
  const router = useRouter();
  
  const createChat = async(e:any, title: string) => {
    e.preventDefault();
    try {
      const validation = /^[a-zA-Z0-9-_]+$/;
      if(validation.test(title)) {
        setChatTitle("");
        setOpen(false);
        const docData = {
          author: "JJChat",
          message: `Wellcome to ${title}`,
          createdAt: serverTimestamp(),
        }
        await setDoc(doc(collection(firestore, "chats"), title), { created: true });
        const collectionRef = collection(firestore, `chats/${title}/chat`);
        await addDoc(collectionRef, docData)
        .then(() => {
          router.push(`/App/${title}`);
        })
      } else {
        throw "Cannot have space, emojis, and symbols other than - and _";
      }
    } catch(err) {
      alert(err);
    }
  }
  
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
    }, [loading])
    
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
          {!open && (
          <Button
            type="outlined"
            ariaLabel="Add Chat"
            onClick={() => {setOpen(true)}}
          >Add Chat</Button>
          )}
          {open && (
            <form className="flex flex-col w-full gap-4">
              <input 
                placeholder="Title"
                className="auth-inputs"
                value={chatTitle}
                onChange={(e) => setChatTitle(e.target.value)}
              />
              <Button
                type="outlined" 
                ariaLabel="Create Chat"
                onClick={(e: any) => createChat(e, chatTitle)}
              >Add</Button>
              <Button
                type="outlined"
                ariaLabel="Cancel"
                onClick={() => {
                  setChatTitle('');
                  setOpen(false);
                }}
              >Cancel</Button>
            </form>
          )}
        </div>)
}
