import FormNewUser from "@/src/components/FormNewUser"
import { Admin, Student } from "@/src/types/person"
import { Role } from "@/src/types/role"
import { SearchUser } from "@/src/types/user"
import { getFetch } from "@/src/utils/fetch"
import { Field, Form, Formik } from "formik"
import { useState } from "react"
import { toast } from "react-toastify"
import AdminComponent from "@/src/components/dashboarVerification/Admin"
import * as Yup from "yup"

interface FormValues {
  dni: string
  role: Role
}

const NewUser: React.FC = () => {
  const [user, setUser] = useState<SearchUser>()
  const [isUserFound, setIsUserFound] = useState<boolean>(false)

  const initialValues: FormValues = {
    dni: "",
    role: "student"
  }

  const validationSchema = {
    dni: Yup.string()
      .required(),
    role: Yup.string()
      .required()
  }
  
  const handleSubmit = async (values: FormValues) => {
    const role = values.role
    let API = ""
    
    if (role === "admin") {
      API = `/api/adm/${values.dni}`
    }
    
    if (role === "student") {
      API = `/api/student/${values.dni}`
    }

    const data = await getFetch<Admin | Student>(API)
    
    if (data) {
      const { _id, email } = data

      setIsUserFound(true)
      setUser({
        _id,
        email,
        role
      })
    }
  }

  const handleResetUser = () => {
    setUser(undefined)
    setIsUserFound(false)
  }

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
        {({ errors, touched, dirty, isValid, resetForm}) =>    
          <Form 
            className="container-w400" 
            hidden={isUserFound}  
          >
            <span className="form__title" >Search User</span>

            <label className="form__label" >
              <span className="form__label-title" >* DNI</span>

              <Field 
                className={(errors.dni && touched.dni) ? "form__input form__input--error" : "form__input"}
                name="dni" 
                type="text" 
              />
            </label>

            <label className="form__label" >
              <span className="form__label-title" >* Role</span>

              <Field 
                className={(errors.role && touched.role) ? "form__select form__select--error" : "form__select"}
                name="role" 
                as="select" 
              >
                <option value="admin" >Admin</option>
                <option value="student" >Student</option>
              </Field>
            </label>

            <button 
              className="btn btn--w75"
              type="submit" 
              onClick={() => handleFields(isValid, dirty)}
            >
              Search
            </button>

            <button 
              className="btn btn--w75"
              type="button" 
              onClick={() => resetForm()}
            >
              Reset Form
            </button>
          </Form>
        }
      </Formik>

      {
        user && isUserFound && 
        
        <FormNewUser 
          user={user}
          handleResetUser={handleResetUser}
        />  
      } 
    </AdminComponent>
  )
}

export default NewUser