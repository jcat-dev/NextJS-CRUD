import VerifyAuthorization from "@/src/components/VerifyAuthorization"
import { Plan } from "@/src/types/plan"
import PlanComponent from "@/src/components/Plan"
import database from "@/mongoose/database"
import planModel from "@/mongoose/models/plan.model"

interface Props {
  plan: Plan
}

const Plan: React.FC<Props> = ({ plan }) => {
  return (
    <VerifyAuthorization 
      role="admin"
    >
      <PlanComponent 
        type={"updatePlan"}
        plan={ plan }      
      />
    </VerifyAuthorization>
  )
}

export default Plan

export async function getStaticPaths() {
  const db = await database()

  try {    
    const data: Plan[] = await planModel.find({})

    const paths = data.map((value) => ({
      params: { id: value._id.toString() }
    }))
    
    return {
      paths,
      fallback: false
    }
  } catch (error) {
    return {
      paths: [{ params: { id: "" } }],
      fallback: false
    }
  } finally {
    db?.disconnect(() => console.log("BD disconnected."))
  }
}

export async function getStaticProps({ params }: any) {  
  const db = await database()

  try {
    const data = await planModel.findById(params.id)
    const plan = JSON.parse(JSON.stringify(data))

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