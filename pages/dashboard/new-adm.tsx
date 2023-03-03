import { getDate } from "@/src/utils/date"
import { ErrorMessage, Form, Formik, FormikHelpers } from "formik"
import { toast } from "react-toastify"
import { setFetch } from "@/src/utils/fetch"
import * as Yup from "yup"
import Admin from "@/src/components/dashboarVerification/Admin"
import Input from "@/src/components/FormWithFormik/Input"
import string from "@/src/typescript/YupValidator/string"
import date from "@/src/typescript/YupValidator/date"
import number from "@/src/typescript/YupValidator/number"
import email from "@/src/typescript/YupValidator/email"
import phone from "@/src/typescript/YupValidator/phone"

interface FormValues {
  name: string
  surname: string
  dni: number
  phone: string
  email: string
  birthday: string
}

const NewAdm: React.FC = () => {
  const initialValues: FormValues = {
    birthday: "",
    dni: 0,
    email: "",
    name: "",
    phone: "",
    surname: ""
  }

  const validationSchema = {
    birthday: date,    
    dni: number,
    email,
    name: string,
    phone,  
    surname: string
  }
  

  const handleSubmit = async (values: FormValues, actions:  FormikHelpers<FormValues>) => {
    const admin = {
      birthday: getDate(values.birthday),
      dni: values.dni,
      email: values.email.toLowerCase(),
      name: values.name.toUpperCase(),
      phone: values.phone,
      surname: values.surname.toUpperCase()
    }

    const result = await setFetch("POST", "/api/adm", admin)
    
    if (result) return actions.resetForm()
  }

  const handleFields = (isValid: boolean, dirty: boolean) => {
    if (!isValid || !dirty) return toast.error("Required Field", { position: "bottom-right" })
  }

  return (
    <Admin>
      <Formik
        initialValues={initialValues}
        validationSchema={Yup.object(validationSchema)}
        onSubmit={(values, actions) => handleSubmit(values, actions)}
      >
        {({ errors, touched, isValid, dirty, values }) => 
          <Form className="container-w600f" >
            <span className="form__title" >New Admin</span>

            <Input 
              name="name"
              type="text"
              value={values.name}
              fieldWidth="w-45"
              active={false}
              textFormat="uppercase"
              error={Boolean(errors.name)}
              touched={Boolean(touched.name)}
              autoComplete={"off"}
            />
            
            <Input 
              name="surname"
              type="text"
              value={values.surname}
              fieldWidth="w-45"
              active={false}
              textFormat="uppercase"
              error={Boolean(errors.surname)}
              touched={Boolean(touched.surname)}
              autoComplete={"off"}
            />                 
            
            <Input 
              name="dni"
              type="number"
              value={String(values.dni)}
              fieldWidth="w-45"
              active={true}
              error={Boolean(errors.dni)}
              touched={Boolean(touched.dni)}
              autoComplete="off"
            >
              {
                values.dni
                ? <p><ErrorMessage name="dni" /></p> 
                : <p>without ( - ) and ( . )</p>
              }                           
            </Input>               
          
            <Input 
              name="phone"
              type="tel"
              value={values.phone}
              fieldWidth="w-45"
              active={false}
              error={Boolean(errors.phone)}
              touched={Boolean(touched.phone)}
              autoComplete="off"
            >
              <p>xxxx-xxxxx-xxxx...</p>
            </Input>
            
            <Input 
              name="email"
              type="email"
              value={values.email}
              active={false}
              textFormat="lowercase"
              fieldWidth="w-45"
              error={Boolean(errors.email)}
              touched={Boolean(touched.email)}
              autoComplete="off"
            />

            <Input 
              name="birthday"
              type="date"
              value={values.birthday}
              fieldWidth="w-45"
              active={true}
              error={Boolean(errors.birthday)}
              touched={Boolean(touched.birthday)}
            />      

            <button 
              className="btn btn--w45"
              type="submit" 
              onClick={() => handleFields(isValid, dirty)}
            >
              Save
            </button>
          </Form>
        }
      </Formik>
    </Admin>
  )
}

export default NewAdm