import Link from "next/link";

export default function Navbar() {
    return (
      <nav 
        className="flex bg-rose-500 py-4 text-xl justify-around"
      >
         <Link href="/" className="font-main">JJChat</Link>
         <Link href="/">Home</Link>
         <Link href="/Login">Login</Link>
         <Link href="/Sign-up">Signup</Link>
      </nav>
    );
}