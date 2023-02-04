import { useSession } from "next-auth/react"
import Navbar from "../Navbar"
import Unauthorized from "../errors/Unauthorized"
import styles from "@/src/styles/module/VerifyAuthorization.module.css"
import { ToastContainer } from "react-toastify"
import { Role } from "../../types/role"

interface Props {
  role: Role
  children: React.ReactNode
}

const VerifyAuthorization: React.FC<Props> = ({ role, children }) => {
  const { data: session} = useSession()

  if (session && session.user.role === role) {
    return (
      <>
        <header>
          <Navbar 
            email={session.user.email}
            name={session.user.name}
            role={session.user.role} 
          />
        </header>
        
        <main className={styles.container} >
          { 
            children 
          }
        </main>

        <ToastContainer />
      </>
    )
  }

  return (
    <Unauthorized />
  )
}

export default VerifyAuthorization