import Admin from "@/src/components/dashboarVerification/Admin"
import Plan from "@/src/components/Plan"

const NewPlan: React.FC = () => { 
  return (
    <Admin>
      <Plan type={"createPlan"} />
    </Admin>
  )
}

export default NewPlan