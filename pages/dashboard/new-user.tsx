import FormNewUser from "@/src/components/FormNewUser"
import { Admin, Student } from "@/src/types/person"
import { Role } from "@/src/types/role"
import { getFetch } from "@/src/utils/fetch"
import { ErrorMessage, Form, Formik } from "formik"
import { useState } from "react"
import { toast } from "react-toastify"
import AdminComponent from "@/src/components/dashboarVerification/Admin"
import * as Yup from "yup"
import { NewUser } from "@/src/types/user"
import { getPassword } from "@/src/utils/password"
import Input from "@/src/components/FormWithFormik/Input"
import Select from "@/src/components/FormWithFormik/Select"
import number from "@/src/typescript/YupValidator/number"
import string from "@/src/typescript/YupValidator/string"

interface FormValues {
  dni: number
  role: Role
}

const NewUser: React.FC = () => {
  const [newUser, setNewUser] = useState<NewUser>()
  const role: Role[] = [
    "admin",
    "student"
  ]

  const initialValues: FormValues = {
    dni: 0,
    role: "student"
  }
  
  
  const validationSchema = {
    dni: number,
    role: string
  }

  const handleSubmit = (values: FormValues) => {
    const role = values.role
    
    if (role === "admin") {
      const api = `/api/adm/${values.dni}`
      searchUser(api, role)
    }
    
    if (role === "student") {
      const api = `/api/student/${values.dni}`
      searchUser(api, role)
    }    
  }

  const searchUser = async (api: string, role: Role) => {
    const data = await getFetch<Admin | Student>(api)

    if (data) {
      const { _id, email } = data
      const newUser: NewUser = {
        email,
        password: getPassword(),
        role,
      } 

      if (role === "admin") setNewUser({...newUser, admin: _id})
      if (role === "student") setNewUser({...newUser, student: _id})
    }
  }

  const handleResetNewUser = () => setNewUser(undefined)

  const handleFields = (isValid: boolean, dirty: boolean) => {
    if (!isValid || !dirty) return toast.error("Required Fields", { position: "bottom-right" })
  }

  return (
    <AdminComponent>
      <Formik
        initialValues = {initialValues}
        validationSchema = {Yup.object(validationSchema)}
        onSubmit = {(values) => handleSubmit(values)}
      >
        {({ errors, touched, dirty, isValid, resetForm, values}) =>    
          <Form 
            className="container-w400" 
            hidden={Boolean(newUser)}  
          >
            <span className="form__title" >Search User</span>

            <Input 
              active={true}
              fieldWidth="w-90"
              name="dni"
              type="number"
              value={String(values.dni)}
              autoComplete="off"
              error={Boolean(errors.dni)}
              touched={Boolean(touched.dni)}              
            >
              {
                values.dni
                ? <p><ErrorMessage name="dni" /></p> 
                : <p>without ( - ) and ( . )</p>
              }  
            </Input>

            <Select 
              error={Boolean(errors.role)}
              name={"role"}
              touched={Boolean(touched.role)}
              active={false}
              fieldWidth="w-90"              
            >
              {
                role.map((value, index) => (
                  <option 
                    key={index}
                    value={value}
                  >
                    {value}
                  </option>
                ))
              }
            </Select>


            <button 
              className="btn btn--w90"
              type="submit" 
              onClick={() => handleFields(isValid, dirty)}
            >
              Search
            </button>

            <button 
              className="btn btn--w90"
              type="button" 
              onClick={() => resetForm()}
            >
              Reset Form
            </button>
          </Form>
        }
      </Formik>

      {
        newUser &&
        <FormNewUser 
          newUser={newUser}
          handleResetNewUser={handleResetNewUser}
        />  
      } 
    </AdminComponent>
  )
}

export default NewUser