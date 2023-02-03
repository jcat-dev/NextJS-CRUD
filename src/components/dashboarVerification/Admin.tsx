import VerifyAuthorization from "./VerifyAuthorization"

interface Props {
  children: React.ReactNode
}

const Admin: React.FC<Props> = ({ children }) => {
  return (
    <VerifyAuthorization 
      role="admin" 
    >
      {
        children
      }
    </VerifyAuthorization>
  )
}

export default Admin