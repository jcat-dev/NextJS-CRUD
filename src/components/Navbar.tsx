import { signOut } from "next-auth/react"
import Link from "next/link"
import { useRouter } from "next/router"
import styles from "@/src/styles/module/Navbar.module.css"

interface Props {
  role: string
  email: string
  name: string
}

const Navbar: React.FC<Props> = (Props) => {
  const router = useRouter()

  const handleSignOut = async () => {
    const data = await signOut({redirect: false, callbackUrl: "/"})
    router.push(data.url)
  }

  return (
    <nav className={styles["nav-container"]} >
      <ul className={styles["navbar-container"]} >
        <li className={styles.item} >
          <span className={styles["item-title"]}>REGISTER</span>  
          
          <ul className={styles["item-links"]} >            
            <li>              
              <Link 
                href={"/dashboard/new-user"} 
                className={styles.link}
              >
                User
              </Link>
            </li>
            
            <li>
              <Link 
                href={"/dashboard/new-adm"} 
                className={styles.link}
              >
                Coach
              </Link>
            </li>

            <li>
              <Link
                href={"/dashboard/new-student"} 
                className={styles.link}
              >
                Student
              </Link>
            </li>

            <li>
              <Link 
                href={"/dashboard/new-plan"} 
                className={styles.link}
              >
                Plan
              </Link>
            </li>            
          </ul>
        </li>

        <li className={styles.item} >
          <Link 
            href={"/dashboard/plan"} 
            className={styles["item-title"]}
          >
            PLAN
          </Link>
        </li>     
      </ul>

      <div className={styles["user-container"]} >
        <span className={styles["user-title"]} >{Props.role}</span>

        <div className={styles["user-data"]} >
          <span className={styles["user-name"]} >{Props.name}</span>
          <span className={styles["user-email"]} >{Props.email}</span>
          
          <button
            className={styles["user-logout"]}
            onClick={handleSignOut}
          >
            Log out
          </button>
        </div>
      </div>
    </nav>
  )
}

export default Navbar