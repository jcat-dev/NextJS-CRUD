import database from "@/mongoose/database"
import planModel from "@/mongoose/models/plan.model"
import { Plan } from "@/src/types/plan"
import { setFetch } from "@/src/utils/fetch"
import { useRouter } from "next/router"
import styles from "@/src/styles/module/Plan.module.css"
import Admin from "@/src/components/dashboarVerification/Admin"
import InternalServerError from "@/src/components/errors/InternalServerError"

interface Props {
  plan: Plan[] | []
}

const Plan: React.FC<Props> = ({ plan }) => {
  const router = useRouter()

  const deletePlan = async (_id: string) => {
    const res = await setFetch("DELETE", "/api/adm/plan", { _id })
    
    if (res) return router.push("/dashboard/plan")
  }
  
  const editPlan = (id: string) => router.push({
    pathname: "/dashboard/plan/[id]",
    query: { id }
  })

  if (plan.length === 0) {
    return (
      <Admin>
        <InternalServerError />
      </Admin>
    )
  }

  return (
    <Admin>
      <span className={styles.title} >Plan</span>

      <ul className={styles.container} >
        {          
          plan.map((value) =>           
            <li 
              key={value._id} 
              className={styles.item}
            >                
              <span className={styles["item-title"]} >
                {value.title}
              </span>

              <p className={styles["item-text"]} >
                {value.text}
              </p>

              <button 
                className={styles["btn-delete"]}
                onClick={() => deletePlan(value._id)} 
              >
                X
              </button>

              <button 
                className={styles["btn-edit"]}
                onClick={() => editPlan(value._id)} 
              >
                Edit
              </button>
            </li>            
          )
        }
      </ul>
    </Admin>
  )
}

export default Plan

export async function getServerSideProps() {
  const db = await database()

  try {
    if(!db) throw new Error()

    const data = await planModel.find({})
    const plan: Plan[] = JSON.parse(JSON.stringify(data))

    return {
      props: {
        plan
      }
    }
  } catch (error) {
    return {
      props: {
        plan: []
      }
    }
  } finally {
    db?.disconnect(() => console.log("BD disconnected."))
  }
}