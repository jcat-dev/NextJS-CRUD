import database from "@/mongoose/database"
import PlanModel from "@/mongoose/models/plan.model"
import {Field, Form, Formik, FormikHelpers } from "formik"
import { Plan } from "@/src/types/plan"
import { setFetch } from "@/src/utils/fetch"
import { toast } from "react-toastify"
import { getDate } from "@/src/utils/date"
import Admin from "@/src/components/dashboarVerification/Admin"
import * as Yup from "yup"

interface FormValues {
  birthday: string,
  dni: string,
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
    dni: "",
    email: "",
    name: "",
    phone: "",
    surname: "",
    plan: ""
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
      .required(),
    plan: Yup.string()
      .required()
  }

  const handleSubmit = async (values: FormValues, actions: FormikHelpers<FormValues> ) => {
    const student = {
      birthday: getDate(values.birthday),
      dni: values.dni,
      email: values.email,
      name: values.name,
      phone: values.phone,
      surname: values.surname,
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
        {({errors, touched, isValid, dirty}) => 
          <Form className="container-w600f" >
            <span className="form__title">New Student</span>

            <label className="form__label form__label--w45" >
              <span className="form__label-title">* Name</span>
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
              <span className="form__label-title">* DNI</span> 
              <Field 
                className={(errors.dni && touched.dni) ? "form__input form__input--error" : "form__input"}
                name="dni" 
                type="text" 
              />
            </label>            

            <label className="form__label form__label--w45" >
              <span className="form__label-title" >* Email</span>
              <Field 
                className={(errors.email && touched.email) ? "form__input form__input--error" : "form__input"}
                name="email" 
                type="text" 
              />
            </label>            

            <label className="form__label form__label--w45" >
              <span className="form__label-title" >* Birthday</span>
              <Field 
                className={(errors.birthday && touched.birthday) ? "form__input form__input--error" : "form__input"}
                name="birthday" 
                type="date" 
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
              <span className="form__label-title" >* Plan</span>

              <Field 
                className={(errors.plan && touched.plan) ? "form__select form__select--error" : "form__select"}
                name="plan" 
                as="select" 
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

              </Field>
            </label>            

            <button 
              className="btn btn--w75"
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