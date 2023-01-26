import VerifyAuthorization from "@/src/components/VerifyAuthorization"
import Plan from "@/src/components/Plan"

const NewPlan: React.FC = () => { 
  return (
    <VerifyAuthorization
      role="admin"
    >
      <Plan type={"createPlan"} />
    </VerifyAuthorization>
  )
}

export default NewPlan