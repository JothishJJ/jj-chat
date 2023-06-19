import Image from "next/image"

export default function ChatApp() {
  
  const chats = [
    {
      title: "The big guns",
      photoUrl: "https://dummyimage.com/200x200/000000/ffffff&text=Profile+Pic"
    }
  ];
  
    return (
        <div className="pt-32 flex flex-col items-center px-4 gap-4">
          <h1 className="font-main text-2xl text-rose-600">Chats</h1>
          {
            chats.map((chat, index) => {
              return (
              <div className="w-full" key={index}>
                <div className="flex items-center gap-2 pb-2">
                  <Image src={chat.photoUrl} alt="Profile" height={50} width={50} className="rounded-3xl" />
                  <p className="font-main dark:text-white">{chat.title}</p>
                </div>
                <hr />
              </div>
              )
            })
          }
        </div>
    )
}
