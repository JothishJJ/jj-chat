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
      <nav 
        className="flex bg-rose-500 py-4 text-xl 
        justify-around items-center fixed w-full"
      >
         <Link href="/" className="font-main dark:text-white">JJChat</Link>
           <Link href="/Login">Login</Link>
           <Link href="/Signup">Signup</Link>
         <div className="text-white dark:text-black px-2">
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
      </nav>
    );
}