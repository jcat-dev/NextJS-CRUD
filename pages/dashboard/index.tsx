import Unauthorized from "@/src/components/errors/Unauthorized"
import { useSession } from "next-auth/react"
import NewUser from "./new-user"
import Student from "./student"

const Dashboard = () => {
  const { data } = useSession()

  if (data && data.user.role === "admin") {
    return (
      <NewUser />
    )
  }

  if (data && data.user.role === "student") {
    return (
      <Student />
    )
  }

  return (
    <Unauthorized />
  )
}

export default Dashboard