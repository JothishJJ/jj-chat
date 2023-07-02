"use client"
import { firestore, auth } from "../../lib/firebase"
import { 
  addDoc, 
  collection, 
  limit, 
  onSnapshot, 
  orderBy, 
  query, 
  doc, 
  getDoc,
  serverTimestamp
} from "firebase/firestore"
import { 
  User, 
  onAuthStateChanged 
} from "firebase/auth"

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
  const [user, setUser] = useState<User>();
  const [chatsId, setChatsId] = useState<any[]>([]);  
  const chatsIdRef = collection(firestore, "chats")  
  
  const [userData, setUserData] = useState<any>();
  
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
  
  // Checks if user is signed in
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if(user) {
        setUser(user);
        const userRef = doc(firestore, "users", user.uid);
        const userSnap = await getDoc(userRef);
        if(userSnap.exists()) 
          setUserData(userSnap.data())
     }     
      else {
        setUser(undefined);
        setUserData(undefined);
        router.push("/Login");
      }
    })
    return () => unsubscribe();
  }, [router])
  
  
  // sends the message to firestore
  const sendMessage = async (e: any, msg: string) => {
    e.preventDefault();
    const message = msg;
    await setMessage("");
    try {
    const chatsRef = collection(firestore, `chats/${params.chats}/chat`);
    if(user && (message.trim() !== "")) {
      if(userData) {
        await addDoc(chatsRef, {
           author: userData.username,
           message: message,
           createdAt: serverTimestamp(),
        })
      }
    } else {
      console.error("Message is empty");
    }
    } catch(err) {
      alert(err);
    }
  }
  
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
         <div className="space-y-4 pb-16">
          {chats.map(doc => {
             return (<Message key={doc.id} author={doc.author} message={doc.message}  />)
           })}
         </div>
         <form 
           className="fixed bottom-0 left-0 right-0 flex gap-2
            justify-evenly bg-neutral-100 dark:bg-neutral-800 p-4"
           onSubmit={(e) => sendMessage(e, message)}
         >
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