"use client"
import Link from "next/link";
import Button from "../components/Button";

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
  
  const [isOpen, setIsOpen] = useState(false);
  
    const toggleNavbar = () => {
        setIsOpen(!isOpen);
    };
  
    return ( 
          <div className="fixed w-full bg-neutral-50 dark:bg-neutral-900 drop-shadow-md">
          <nav className="py-4 px-8">
            <div className="flex items-center justify-between">
                <span className="font-main font-bold text-xl dark:text-white">JJChat</span>
                <div className="dark:text-white flex gap-4 items-center">
                  <div className="hidden md:flex md:gap-8">
                    <Button 
                      ariaLabel="Signup"
                      type="primary"
                    >Signup</Button>
                    <Button
                      ariaLabel="Login"
                      type="primary"
                    >Login</Button>
                  </div>
                  <button
                    className={`ml-4 flex flex-col space-y-1 items-center rounded-md focus:outline-none md:hidden 
                    ${ isOpen ? 'open' : '' }`}
                    onClick={toggleNavbar}
                    aria-label="Open Menu"
                  >
                    <span 
                      className={`h-1 w-8 dark:bg-white bg-black transition-transform duration-300 ease-out transform-gpu
                       ${isOpen ? 'rotate-45 translate-y-1.5' : ''}`}
                    ></span>
                    <span
                      className={`h-1 w-8 dark:bg-white bg-black transition-transform duration-500 ease-in-out transform-gpu
                      ${isOpen ? 'opacity-0' : ''}`}
                    ></span>
                    <span
                      className={`h-1 w-8 dark:bg-white bg-black transition-transform duration-300 ease-in-out transform-gpu
                      ${isOpen ? '-rotate-45 -translate-y-2.5' : ''}`}
                    ></span>
                  </button>
                  {darkTheme ? (
                    <FontAwesomeIcon
                      icon={darkLishtbulb} 
                      size="xl"
                      className="inline-block"
                      onClick={() => setDarkTheme(!darkTheme)}
                    />
                   ) : (
                    <FontAwesomeIcon
                      icon={faLightbulb}
                      size="xl"
                      className="inline-block"
                      onClick={() => setDarkTheme(!darkTheme)}
                    />
                   )}
                </div>
             </div>
             <hr className="bg-black h-[2px] mt-4 dark:bg-white" />
             <div
                className={`mt-4 md:flex md:items-center md:space-x-6 transition-max-height duration-500 ease-in-out overflow-hidden 
                ${isOpen ? 'max-h-screen min-h-screen' : 'max-h-0 min-h-0'}`}
             >
                <ul className="md:flex md:flex-row md:ml-auto space-y-4 text-center">
                   <li className="md:inline-block">
                     <Link
                       href="/Signin"
                       className="block px-4 py-1 text-white bg-rose-600
                       rounded-lg border-2 border-rose-800 dark:bg-rose-500
                       focus:bg-rose-700 dark:focus:bg-rose-700"
                      >
                       Login
                     </Link>
                   </li>
                   <li className="md:inline-block">
                     <Link
                       href="/Signup"
                       className="block px-4 py-1 text-white bg-rose-600
                       rounded-lg border-2 border-rose-800 dark:bg-rose-500
                       focus:bg-rose-700 dark:focus:bg-rose-700"
                     >
                       Signup
                     </Link>
                   </li>
                </ul>
              </div>
            </nav>
            </div>
    );
}