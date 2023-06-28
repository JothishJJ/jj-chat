import { firestore } from "../../lib/firebase"
import { collection, getDocs } from "firebase/firestore"

import Message from "../../components/Message"

export const dynamicParams = false;

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

export async function generateStaticParams() {
  const paths: { chats: string; }[] = []
  const querySnapshot = await getDocs(collection(firestore, `chats`));
  querySnapshot.forEach((doc) => {
    paths.push({chats: doc.id});
  })
  return paths;
}