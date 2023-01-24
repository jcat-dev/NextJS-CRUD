import { useSession, signOut } from "next-auth/react"
import Link from "next/link";
import { useRouter } from "next/router"

export default function Student() {
  const router = useRouter()
  const { data: session } = useSession()

  const handleSignOutClick = async () => {
    const data = await signOut({redirect: false, callbackUrl: '/'})
    router.push(data.url)
  }

  if (session && session.user) {
    return (
      <>
        Signed in as {session.user.name} <br />
        <button onClick={handleSignOutClick}>Sign out</button>
      </>
    )
  }
 

  return (
    <main  >
      <h1  >Access denied</h1>
           
      <Link href={"/login/sign-in"} >
        <a  >
          Sign In
        </a>
      </Link>    

      <Link href={"/login"} >
        <a  >
          Log In
        </a>
      </Link>      
    </main>
  )
}