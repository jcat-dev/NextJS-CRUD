import PlanComponent from "@/src/components/Plan"
import PlanIDSkeleton from "@/src/components/skeletons/PlanIDSkeleton"
import { Plan }  from "@/src/types/plan"
import { useRouter } from "next/router"
import useSWR, { Fetcher } from "swr"
import { GetFetchResponse } from "@/src/types/response"
import Admin from "@/src/components/dashboarVerification/Admin"
import InternalServerError from "@/src/components/errors/InternalServerError"

interface Props {
  plan: Plan
}

const fetcher: Fetcher<GetFetchResponse<Plan>, string> = (...args) => fetch(...args).then(res => res.json())

const Plan: React.FC<Props> = () => {
  const router = useRouter()
  const API = `/api/adm/plan/${router.query.id}`
  const { 
    data: plan, 
    isLoading,
    error,
    isValidating    
  } = useSWR(API, fetcher, { revalidateOnFocus: false })

  if (error || !plan) {
    return (
      <Admin>
        <InternalServerError />
      </Admin>
    )
  }

  if (isLoading || isValidating) {
    return (
      <Admin>
        <PlanIDSkeleton />
      </Admin>    
    )
  }
  
  return (
    <Admin>
      <PlanComponent 
        type={"updatePlan"}
        plan={plan.data}      
      />
    </Admin>
  )
}

export default Plan