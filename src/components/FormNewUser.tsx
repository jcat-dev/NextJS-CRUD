import { Formik, Form, Field, FormikHelpers } from "formik"
import { getPassword } from "../utils/getPassword"
import { setFetch } from "../utils/fetch"
import { toast } from "react-toastify"
import { Role } from "../types/role"
import { NewUser, SearchUser } from "../types/user"
import * as Yup from "yup"

interface Props {
  user: SearchUser
  handleResetUser: () => void
}

interface FormValues {
  email: string
  password: string
  role: Role
}

const FormNewUser: React.FC<Props> = ({ user, handleResetUser }: Props) => {
  const initialValues: FormValues = {
    email: user.email,
    password: getPassword(),
    role: user.role
  }

  const validationSchema = {
    email: Yup.string()
      .email()
      .required(),
    password: Yup.string()
      .required(),
    role: Yup.string()
      .required()
  }

  const handleSubmit = async (values: FormValues, actions: FormikHelpers<FormValues>) => {
    const API = "/api/adm/user" 

    let newUser: NewUser = {
      email: values.email,
      password: values.password,
      role: values.role
    }
    
    if (user.role === "admin") {
      newUser = { ...newUser, admin: user._id }
    }

    if (user.role === "student") {
      newUser = { ...newUser, student: user._id }
    }

    const result = await setFetch("POST", API, user)
    
    if (result) {
      handleResetUser()
      actions.resetForm()
    }
  }

  const handleFields = (isValid: boolean, dirty: boolean) => {
    if (!isValid || !dirty) return toast.error("Required Field", {position: "bottom-right"})
  }

  return (
    <Formik
      enableReinitialize = {true}
      initialValues = {initialValues}
      validationSchema = {Yup.object(validationSchema)}
      onSubmit = {(values, actions) => handleSubmit(values, actions)}
    > 
      {({errors, dirty, isValid, touched}) => 
        <Form className="container-w400" >
          <span className="form__title" >Create New Account</span>
          <label className="form__label" >
            <span className="form__label-title" >Role</span>

            <Field 
              className={(errors.role && touched.role) ? "form__input form__input--error" : "form__input"}
              name="role" 
              type="text" 
              disabled 
            />
          </label>
                    
          <label className="form__label" >
            <span className="form__label-title" >Email</span>     

            <Field 
              className={(errors.email && touched.email) ? "form__input form__input--error" : "form__input"}
              name="email" 
              type="email" 
              disabled
            />
          </label>
          
          <label className="form__label" >
            <span className="form__label-title" >Password</span>

            <Field 
              className={(errors.password && touched.password) ? "form__input form__input--error" : "form__input"}
              name="password" 
              type="text" 
              disabled 
            />
          </label>

          <button 
            className="btn btn--w75"
            type="submit" 
            onClick={() => handleFields(isValid, dirty)}
          >
            Create
          </button>

          <button 
            className="btn btn--w75"
            type="button" 
            onClick={() => handleResetUser()}
          >
            Back
          </button>
        </Form>
      }
    </Formik>
  )
}

export default FormNewUser