"use client"
import Link from "next/link";

import { useEffect, useState } from "react";

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLightbulb as darkLightbulb } from '@fortawesome/free-solid-svg-icons';
import { faLightbulb } from '@fortawesome/free-regular-svg-icons';

export default function Navbar() { 

  const [darkTheme, setDarkTheme] = useState(false);
  
  useEffect(() => {
    const icon = document.getElementById("theme-icon");
    if(darkTheme === true) {
      document.documentElement.classList.add("dark");
      icon.classList.remove("text-3xl")
      icon.classList.add("text-5xl")
      setTimeout(() => {
        icon.classList.remove("text-5xl");
        icon.classList.add("text-3xl");
      }, 75)
    } 
    else {
      document.documentElement.classList.remove("dark");
      icon.classList.remove("text-3xl");
      icon.classList.add("text-5xl");
      setTimeout(() => {
        icon.classList.remove("text-5xl");
        icon.classList.add("text-3xl");
      }, 75);
    }
  }, [darkTheme])
  
    return ( 
      <nav 
        className="flex bg-rose-500 py-4 text-xl justify-around items-center"
      >
         <Link href="/" className="font-main dark:text-white">JJChat</Link>
         <Link href="/">Home</Link>
         <Link href="/Login">Login</Link>
         <Link href="/Signup">Signup</Link>
         <div
           id="theme-icon" 
           className="text-white dark:text-black text-3xl px-2">
         {darkTheme ? 
           (
           <FontAwesomeIcon
             icon={darkLightbulb} 
             onClick={() => setDarkTheme(!darkTheme)}
           />
           ) : (
           <FontAwesomeIcon
             icon={faLightbulb}
             onClick={() => setDarkTheme(!darkTheme)}
           />
         )
         }
         </div>
      </nav>
    );
}