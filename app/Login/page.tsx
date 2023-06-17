import Button from "../components/Button"

import Link from "next/link";

function Login() {
    return (
      <div className="pt-32 flex flex-col items-center gap-4 px-4 w-full">
        <h1 className="font-main text-2xl dark:text-white">Wellcome Back!</h1>
        <div className="w-full flex flex-col gap-4">
          <input placeholder="Email" type="email" className="auth-inputs" />
          <input placeholder="Password" type="password" className="auth-inputs" />
          <Link href="/Forgot password" aria-label="Forgot password?" className="text-neutral-600 text-xs">Forgot Password?</Link>
          <Button type="primary" ariaLabel="Login">Login</Button>
        </div>
        <hr className="w-full h-[2px] bg-black dark:bg-white" />
      </div>
    );
}

export default Login;