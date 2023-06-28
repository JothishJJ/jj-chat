import Image from "next/image";

type Props = {
    message: string,
    author: string
}

export default function Message({message, author}: Props) {
   const authorLetter = author.charAt(0);
    return (
      <div className="border-2 p-4 dark:text-white rounded-lg border-neutral-400">
        <div className="flex gap-2 items-center">
          <Image 
            src={`https://dummyimage.com/40x40/ffffff/808080&text=${authorLetter}`} 
            className="rounded-3xl"
            width={40} 
            height={40} 
            alt="profile" 
          />
          <h1 className="font-main text-rose-600">{author}</h1>
        </div>
        <p>{message}</p>
      </div>
    )
}