import database from "@/mongoose/database"
import PlanModel from "@/mongoose/models/plan.model"
import {ErrorMessage, Form, Formik, FormikHelpers } from "formik"
import { Plan } from "@/src/types/plan"
import { setFetch } from "@/src/utils/fetch"
import { toast } from "react-toastify"
import { getDate } from "@/src/utils/date"
import Admin from "@/src/components/dashboarVerification/Admin"
import * as Yup from "yup"
import email from "@/src/typescript/YupValidator/email"
import phone from "@/src/typescript/YupValidator/phone"
import Input from "@/src/components/FormWithFormik/Input"
import Select from "@/src/components/FormWithFormik/Select"
import date from "@/src/typescript/YupValidator/date"
import number from "@/src/typescript/YupValidator/number"
import string from "@/src/typescript/YupValidator/string"

interface FormValues {
  birthday: string,
  dni: number,
  email: string,
  name: string,
  phone: string,
  surname: string,
  plan: string
}

interface Props {
  plan: Plan[]
}

const NewStudent: React.FC<Props> = ({ plan }) => {
  const initialValues: FormValues = {
    birthday: "",
    dni: 0,
    email: "",
    name: "",
    phone: "",
    surname: "",
    plan: ""
  }
  
  const validationSchema = {    
    birthday: date,
    dni: number,
    email,
    name: string,
    phone,
    surname: string,
    plan: string,
  }

  const handleSubmit = async (values: FormValues, actions: FormikHelpers<FormValues> ) => {
    const student = {
      birthday: getDate(values.birthday),
      dni: values.dni,
      email: values.email.toLowerCase(),
      name: values.name.toUpperCase(),
      phone: values.phone,
      surname: values.surname.toUpperCase(),
      plan: values.plan
    }
    
    const API = "/api/adm/student"
    const result = await setFetch("POST", API, student)

    if (result) return actions.resetForm()
  }

  const handleValidate = (isValid: boolean, dirty: boolean) => {
    if (!isValid || !dirty) return toast.error("Required Fields", { position: "bottom-right" })
  }

  return (
    <Admin>
      <Formik
        initialValues={initialValues}
        validationSchema={Yup.object(validationSchema)}
        onSubmit={(values, actions) => handleSubmit(values, actions)}
      >
        {({errors, touched, isValid, dirty, values}) => 
          <Form className="container-w600f" >
            <span className="form__title">New Student</span>
            
            <Input 
              active={false}
              error={Boolean(errors.name)}
              fieldWidth="w-45"
              name="name"
              touched={Boolean(touched.name)}
              type="text"
              value={values.name}
              autoComplete="off"
              textFormat="uppercase"
            />

            <Input 
              active={false}
              error={Boolean(errors.surname)}
              fieldWidth="w-45"
              name="surname"
              touched={Boolean(touched.surname)}
              type="text"
              value={values.surname}
              autoComplete="off"
              textFormat="uppercase"
            />   
            
            <Input 
              active={true}
              error={Boolean(errors.dni)}
              fieldWidth="w-45"
              name="dni"
              touched={Boolean(touched.dni)}
              type="number"
              value={String(values.dni)}
              autoComplete="off"
            >
              {
                values.dni
                ? <p><ErrorMessage name="dni" /></p> 
                : <p>without ( - ) and ( . )</p>
              }    
            </Input>
            
            <Input 
              active={false}
              error={Boolean(errors.email)}
              fieldWidth="w-45"
              name="email"
              touched={Boolean(touched.email)}
              type="email"
              value={values.email}
              autoComplete="off"
              textFormat="lowercase"
            />  
            
            <Input 
              active={true}
              error={Boolean(errors.birthday)}
              fieldWidth="w-45"
              name="birthday"
              touched={Boolean(touched.birthday)}
              type="date"
              value={values.birthday}
            />        
            
            <Input 
              active={false}
              error={Boolean(errors.phone)}
              fieldWidth="w-45"
              name="phone"
              touched={Boolean(touched.phone)}
              type="tel"
              value={values.phone}
              autoComplete="off"
            >
              <p>+xxxx-xxxxx-xxxx...</p>
            </Input>

            <Select
              active={true}
              error={Boolean(errors.plan)}
              fieldWidth="w-45"
              name="plan"
              touched={Boolean(touched.plan)}
            >
              <option hidden >Select a Plan</option>

              {
                plan.map((value) => (
                  <option
                    key={value._id} 
                    value={value._id} 
                  >
                    {value.title}
                  </option>
                ))
              }
            </Select>    
            <ErrorMessage name="plan" ></ErrorMessage>    

            <button 
              className="btn btn--w90"
              type="submit" 
              onClick={() => handleValidate(isValid, dirty)}
            >
              Save 
            </button>
          </Form>
        }
      </Formik>
    </Admin>
  )
}

export async function getServerSideProps() {
  const db = await database()

  try {
    if (!db) throw new Error()

    const data = await PlanModel.find({})
    const plan: Plan[] = JSON.parse(JSON.stringify(data))

    return {
      props: {
        plan
      }
    }

  } catch (error) {
    return {
      props: {
        plan: []
      }
    }
  } finally {
    db?.disconnect(() => console.log("BD disconnected."))
  }
}

export default NewStudent