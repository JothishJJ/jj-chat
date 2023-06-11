"use client"
import Link from "next/link";

import { useEffect, useState } from "react";

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLightbulb as darkLishtbulb } from '@fortawesome/free-solid-svg-icons';
import { faLightbulb } from '@fortawesome/free-regular-svg-icons';

export default function Navbar() { 

  const [darkTheme, setDarkTheme] = useState(false);
  
  useEffect(() => {
    if(darkTheme === true) {
      document.documentElement.classList.add("dark");
    }
    else {
      document.documentElement.classList.remove("dark");
    }
  }, [darkTheme])
  
    return ( 
      <div className="fixed w-full dark:text-white">
      <nav 
        className="flex py-4 text-xl justify-around items-center"
      >
         <Link href="/" className="font-main">JJChat</Link>
         <div className="space-x-4">
           <Link href="/Login">Login</Link>
           <Link href="/Signup">Signup</Link>
         <div className="px-2 inline-block">
         {darkTheme ? 
           (
           <FontAwesomeIcon
             icon={darkLishtbulb} 
             size="xl"
             onClick={() => setDarkTheme(!darkTheme)}
           />
           ) : (
           <FontAwesomeIcon
             icon={faLightbulb}
             size="xl"
             onClick={() => setDarkTheme(!darkTheme)}
           />
         )
         }
         </div>
         </div>
      </nav>
      <hr className="bg-black h-[2px]" />
      </div>
    );
}