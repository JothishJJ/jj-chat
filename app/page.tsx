import Button from "./components/Button";

export default function Home() {
  return (
    <main 
      className="flex flex-col items-center gap-8 
      text-center h-screen justify-center"
    >
      <h1 className="text-5xl dark:text-white">
        A new way of 
        <span className="text-rose-600 font-main"> communication </span>
        equiped with privacy 🔒
      </h1>
      <Button
        ariaLabel="Get Started"
        href="/Signup"
        type="primary"
      >
        Get Started
      </Button>
    </main>
  )
}
