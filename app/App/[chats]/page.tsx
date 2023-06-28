"use client"
import { firestore } from "../../lib/firebase";
import { collection, query, orderBy,  } from "firebase/firestore";
import { useCollection } from "react-firebase-hooks";

import { useParams, useRouter } from "next/navigation";
import { useEffect } from "react";

import Message from "../../components/Message"

export default function Chat() {
  const params = useParams();
  const router = useRouter();
  
  const chatsIdRef = collection(firestore, "chats");
  const [chatsIdValue, chatsIdLoading, chatsIdError] = useCollection(chatsIdRef);
  
  const chatsRef = query(collection(firestore, `chats/${params.chats}/chat`), orderBy("createdAt"), limit(25));
  const [chatsValue, chatsLoading, chatsError] = useCollection(chatsRef)
  
  useEffect(() => {
    const isMatch = chatsIdValue.docs.every(item => item.id !== params.chats);
    if(isMatch)
      router.push("/404");
  }, [chatsIdValue, chatsIdLoading])
  
  if(chatsLoading) {
    return (
      <div className="h-screen flex justify-center items-center">
        <div className="loader"></div>
      </div>
    );
    }
  
  if(chatsValue) {
    return (
      <div className="pt-28 p-4">
         <h1 className="dark:text-white font-main text-2xl">
           {params.chats}
         </h1>
         <Message author="Jothish" message="Hello There" />
      </div>
    )
}
}