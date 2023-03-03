import { Formik, Form } from "formik"
import { setFetch } from "../utils/fetch"
import { toast } from "react-toastify"
import { Role } from "../types/role"
import { NewUser } from "../types/user"
import * as Yup from "yup"
import Input from "./FormWithFormik/Input"
import email from "../typescript/YupValidator/email"
import string from "../typescript/YupValidator/string"

interface Props {
  newUser: NewUser
  handleResetNewUser: () => void
}

interface FormValues {
  email: string
  password: string
  role: Role
}

const FormNewUser: React.FC<Props> = ({ newUser, handleResetNewUser }: Props) => {
  const initialValues: FormValues = {
    email: newUser.email,
    password: newUser.password,
    role: newUser.role
  }  
  
  const validationSchema = {
    email,
    password: string,
    role: string
  }

  const handleSubmit = async () => {
    const API = "/api/adm/user" 
    const result = await setFetch("POST", API, newUser)
    
    if (result) handleResetNewUser()
  }

  const handleFields = (isValid: boolean) => {
    if (!isValid) return toast.error("Required Field", {position: "bottom-right"})
  }

  return (
    <Formik
      enableReinitialize = {true}
      initialValues = {initialValues}
      validationSchema = {Yup.object(validationSchema)}
      onSubmit = {() => handleSubmit()}
    > 
      {({errors, isValid, touched, values}) => 
        <Form className="container-w400" >
          <span className="form__title" >Create New Account</span>
          
          <Input 
            active={true}
            error={Boolean(errors.role)}
            fieldWidth="w-90"
            name="role"
            touched={Boolean(touched.role)}
            type="text"
            value={values.role}    
            disabled={true}        
          />

          <Input 
            active={true}
            error={Boolean(errors.email)}
            fieldWidth="w-90"
            name="email"
            touched={Boolean(touched.email)}
            type="email"
            value={values.email}
            disabled={true}
          />

          <Input 
            active={true}
            error={Boolean(errors.password)}
            fieldWidth="w-90"
            name="password"
            touched={Boolean(touched.password)}
            type="text"
            value={values.email}
            disabled={true}
          />
          
          <button 
            className="btn btn--w75"
            type="submit" 
            onClick={() => handleFields(isValid)}
          >
            Create
          </button>

          <button 
            className="btn btn--w75"
            type="button" 
            onClick={() => handleResetNewUser()}
          >
            Back
          </button>
        </Form>
      }
    </Formik>
  )
}

export default FormNewUser