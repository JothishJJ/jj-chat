import Link from "next/link";

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLightbulb } from '@fortawesome/free-solid-svg-icons';

export default function Navbar() { 
    return (
      <nav 
        className="flex bg-rose-500 py-4 text-xl justify-around items-center"
      >
         <Link href="/" className="font-main">JJChat</Link>
         <Link href="/">Home</Link>
         <Link href="/Login">Login</Link>
         <Link href="/Signup">Signup</Link>
         <FontAwesomeIcon icon={faLightbulb} />
      </nav>
    );
}