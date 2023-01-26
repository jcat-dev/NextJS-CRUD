import VerifyAuthorization from "@/src/components/VerifyAuthorization"
import { getDate } from "@/src/utils/date"
import { Field, Form, Formik, FormikHelpers } from "formik"
import { toast } from "react-toastify"
import { setFetch } from "@/src/utils/fetch"
import * as Yup from "yup"

interface FormValues {
  name: string
  surname: string
  dni: string
  phone: string
  email: string
  birthday: string
}

const NewAdm: React.FC = () => {
  const initialValues: FormValues = {
    birthday: "",
    dni: "",
    email: "",
    name: "",
    phone: "",
    surname: ""
  }

  const validationSchema = {
    birthday: Yup.date()
      .required(),
    dni: Yup.string()
      .required(),
    email: Yup.string()
      .email()
      .required(),
    name: Yup.string()
      .required(),
    phone: Yup.string()
      .required(),
    surname: Yup.string()
      .required()
  }

  const handleSubmit = async (values: FormValues, actions:  FormikHelpers<FormValues>) => {
    const admin = {
      birthday: getDate(values.birthday),
      dni: values.dni,
      email: values.email,
      name: values.name,
      phone: values.phone,
      surname: values.surname
    }

    const result = await setFetch("POST", "/api/adm", admin)
    
    if (result) return actions.resetForm()
  }

  const handleFields = (isValid: boolean, dirty: boolean) => {
    if (!isValid || !dirty) return toast.error("Required Field", { position: "bottom-right" })
  }

  return (
    <VerifyAuthorization 
      role="admin"
    >
      <Formik
        initialValues={initialValues}
        validationSchema={Yup.object(validationSchema)}
        onSubmit={(values, actions) => handleSubmit(values, actions)}
      >
        {({ errors, touched, isValid, dirty}) => 
          <Form className="container-w600f" >
            <span className="form__title" >New Admin</span>

            <label className="form__label form__label--w45" >
              <span className="form__label-title" >* Name </span>

              <Field                 
                className={(errors.name && touched.name) ? "form__input form__input--error" : "form__input"}
                name="name" 
                type="text" 
              />
            </label>          

            <label className="form__label form__label--w45" >
              <span className="form__label-title" >* Surname</span>

              <Field 
                className={(errors.surname && touched.surname) ? "form__input form__input--error" : "form__input"}
                name="surname" 
                type="text" 
              />
            </label>

            <label className="form__label form__label--w45" >
              <span className="form__label-title" >* DNI</span>

              <Field 
                className={(errors.dni && touched.dni) ? "form__input form__input--error" : "form__input"} 
                name="dni" 
                type="text" 
              />
            </label>

            <label className="form__label form__label--w45" >
              <span className="form__label-title" >* Phone</span>

              <Field 
                className={(errors.phone && touched.phone) ? "form__input form__input--error" : "form__input"}
                name="phone" 
                type="text" 
              />
            </label>

            <label className="form__label form__label--w45" >
              <span className="form__label-title" >* Email</span>

              <Field 
                className={(errors.email && touched.email) ? "form__input form__input--error" : "form__input"} 
                name="email" 
                type="email" 
              />
            </label>
            
            <label className="form__label form__label--w45" >
              <span className="form__label-title" >* BirthDay</span>
              
              <Field 
                className={(errors.birthday && touched.birthday) ? "form__input form__input--error" : "form__input"} 
                name="birthday" 
                type="date"
              />
            </label>            

            <button 
              className="btn btn--w75"
              type="submit" 
              onClick={() => handleFields(isValid, dirty)}
            >
              Save
            </button>
          </Form>
        }
      </Formik>
    </VerifyAuthorization>
  )
}

export default NewAdm