"use client"
import Button from "../components/Button";
import Link from "next/link";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

import { auth } from "../lib/firebase";
import { onAuthStateChanged } from "firebase/auth";
import { googleSignIn } from "../lib/auth";

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  
  const router = useRouter();
  
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if(user) {
        router.push("/App");
      }
    })
    return () => unsubscribe();
  }, [])
  
    return (
      <div className="grid grid-cols-1 gap-8 lg:grid-cols-2 items-center px-4 lg:px-40 pt-32 lg:pt-40">
        <div className="flex flex-col items-center gap-4 lg:gap-8 w-full">
          <h1 className="font-main text-2xl dark:text-white">Wellcome Back!</h1>
          <div className="w-full flex flex-col gap-4">
            <input
              placeholder="Email" 
              type="email" 
              className="auth-inputs" 
              value={email} 
              onChange={(e) => setEmail(e.target.value)}
            />
            <input
              placeholder="Password" 
              type="password" 
              className="auth-inputs"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <Link href="/Forgot password" aria-label="Forgot password?" className="text-neutral-600 dark:text-neutral-300 text-xs hover:underline">
              Forgot Password?
            </Link>
            <Link href="/Signup" aria-label="Signup" className="text-neutral-600 dark:text-neutral-300 text-xs hover:underline">
              Don&apos;t have an account?
            </Link>
            <Button type="primary" ariaLabel="Login with email">Login</Button>
          </div>
          <hr className="w-full h-[2px] bg-black dark:bg-white" />
          <div className="flex flex-col w-full gap-4">
            <Button
              ariaLabel="Login with Google"
              type="outlined"
              className="flex gap-2 justify-center items-center"
              onClick={googleSignIn}
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="1.5em" height="1.5em" preserveAspectRatio="xMidYMid" viewBox="0 0 256 262" id="google"><path fill="#4285F4" d="M255.878 133.451c0-10.734-.871-18.567-2.756-26.69H130.55v48.448h71.947c-1.45 12.04-9.283 30.172-26.69 42.356l-.244 1.622 38.755 30.023 2.685.268c24.659-22.774 38.875-56.282 38.875-96.027"></path><path fill="#34A853" d="M130.55 261.1c35.248 0 64.839-11.605 86.453-31.622l-41.196-31.913c-11.024 7.688-25.82 13.055-45.257 13.055-34.523 0-63.824-22.773-74.269-54.25l-1.531.13-40.298 31.187-.527 1.465C35.393 231.798 79.49 261.1 130.55 261.1"></path><path fill="#FBBC05" d="M56.281 156.37c-2.756-8.123-4.351-16.827-4.351-25.82 0-8.994 1.595-17.697 4.206-25.82l-.073-1.73L15.26 71.312l-1.335.635C5.077 89.644 0 109.517 0 130.55s5.077 40.905 13.925 58.602l42.356-32.782"></path><path fill="#EB4335" d="M130.55 50.479c24.514 0 41.05 10.589 50.479 19.438l36.844-35.974C195.245 12.91 165.798 0 130.55 0 79.49 0 35.393 29.301 13.925 71.947l42.211 32.783c10.59-31.477 39.891-54.251 74.414-54.251"></path></svg>
              Login With Google
            </Button>
            <Button 
              ariaLabel="Login with Github"
              type="outlined"
              className="flex gap-2 justify-center items-center"
            >
              <svg className="dark:fill-white" xmlns="http://www.w3.org/2000/svg" height="1.5em" viewBox="0 0 496 512"><path d="M165.9 397.4c0 2-2.3 3.6-5.2 3.6-3.3.3-5.6-1.3-5.6-3.6 0-2 2.3-3.6 5.2-3.6 3-.3 5.6 1.3 5.6 3.6zm-31.1-4.5c-.7 2 1.3 4.3 4.3 4.9 2.6 1 5.6 0 6.2-2s-1.3-4.3-4.3-5.2c-2.6-.7-5.5.3-6.2 2.3zm44.2-1.7c-2.9.7-4.9 2.6-4.6 4.9.3 2 2.9 3.3 5.9 2.6 2.9-.7 4.9-2.6 4.6-4.6-.3-1.9-3-3.2-5.9-2.9zM244.8 8C106.1 8 0 113.3 0 252c0 110.9 69.8 205.8 169.5 239.2 12.8 2.3 17.3-5.6 17.3-12.1 0-6.2-.3-40.4-.3-61.4 0 0-70 15-84.7-29.8 0 0-11.4-29.1-27.8-36.6 0 0-22.9-15.7 1.6-15.4 0 0 24.9 2 38.6 25.8 21.9 38.6 58.6 27.5 72.9 20.9 2.3-16 8.8-27.1 16-33.7-55.9-6.2-112.3-14.3-112.3-110.5 0-27.5 7.6-41.3 23.6-58.9-2.6-6.5-11.1-33.3 2.6-67.9 20.9-6.5 69 27 69 27 20-5.6 41.5-8.5 62.8-8.5s42.8 2.9 62.8 8.5c0 0 48.1-33.6 69-27 13.7 34.7 5.2 61.4 2.6 67.9 16 17.7 25.8 31.5 25.8 58.9 0 96.5-58.9 104.2-114.8 110.5 9.2 7.9 17 22.9 17 46.4 0 33.7-.3 75.4-.3 83.6 0 6.5 4.6 14.4 17.3 12.1C428.2 457.8 496 362.9 496 252 496 113.3 383.5 8 244.8 8zM97.2 352.9c-1.3 1-1 3.3.7 5.2 1.6 1.6 3.9 2.3 5.2 1 1.3-1 1-3.3-.7-5.2-1.6-1.6-3.9-2.3-5.2-1zm-10.8-8.1c-.7 1.3.3 2.9 2.3 3.9 1.6 1 3.6.7 4.3-.7.7-1.3-.3-2.9-2.3-3.9-2-.6-3.6-.3-4.3.7zm32.4 35.6c-1.6 1.3-1 4.3 1.3 6.2 2.3 2.3 5.2 2.6 6.5 1 1.3-1.3.7-4.3-1.3-6.2-2.2-2.3-5.2-2.6-6.5-1zm-11.4-14.7c-1.6 1-1.6 3.6 0 5.9 1.6 2.3 4.3 3.3 5.6 2.3 1.6-1.3 1.6-3.9 0-6.2-1.4-2.3-4-3.3-5.6-2z"/></svg>
              Login with Github
            </Button>
          </div>
        </div>
        <div className="mt-8 hidden lg:block">
          <h1 className="text-5xl text-center dark:text-white font-main">
            Unlock a world of vibrant conversations and seamless connections
          </h1>
        </div>
      </div>
    );
}

export default Login;