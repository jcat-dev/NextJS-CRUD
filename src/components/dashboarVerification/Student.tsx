import VerifyAuthorization from "./VerifyAuthorization"

interface Props {
  children: React.ReactNode
}

const Student: React.FC<Props> = ({ children }) => {
  return (
    <VerifyAuthorization
      role="student"
    >
      {
        children
      }
    </VerifyAuthorization>
  )
}

export default Student