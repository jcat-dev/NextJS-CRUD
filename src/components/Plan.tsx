import { setFetch } from "@/src/utils/fetch"
import { Field, Form, Formik, FormikHelpers } from "formik"
import { useRouter } from "next/router"
import { toast } from "react-toastify"
import { Plan } from "../types/plan"
import * as Yup from "yup"
import Input from "./FormWithFormik/Input"
import string from "../typescript/YupValidator/string"

interface FormValues {
  title: string
  text: string
}

interface Props {
  plan?: Plan
  type: "createPlan" | "updatePlan"
}

const Plan: React.FC<Props> = ({ plan, type }) => {
  const router = useRouter()

  const initialValues: FormValues = {
    text: plan?.text ?? "",
    title: plan?.title ?? ""
  }
  
  const validationSchema = {
    text: string,
    title: string,
  }

  const handleCreatePlan = async (values: FormValues, actions: FormikHelpers<FormValues> ) => {
    const title = values.title
    
    const result = await setFetch("POST", "/api/adm/plan", {
      ...values, title: title[0].toUpperCase().concat(title.slice(1).toLowerCase())
    })

    if (result) return actions.resetForm()    
  }

  const handleUpdatePlan = async (values: FormValues) => {
    if (plan) {
      const API = "/api/adm/plan"
      const updatePlan: Plan = {...values, _id: plan._id}
      await setFetch("PUT", API, updatePlan)
    }
  }

  const handleFields = (isValid: boolean, dirty: boolean) => {
    if (type === "createPlan") {
      if (!isValid || !dirty) return toast.error("Required Fields", {position: "bottom-right"})
    }

    if (!isValid) return toast.error("Required Fields", {position: "bottom-right"})
  }

  const handleChangeUrl = () => router.push("/dashboard/plan")

  return (    
    <Formik
      initialValues= {initialValues}
      validationSchema= {Yup.object(validationSchema)}
      onSubmit= {
        type === "createPlan" 
        ? (values, actions) => handleCreatePlan(values, actions)
        : (values) => handleUpdatePlan(values)
      }
    >
      {({errors, touched, isValid, dirty, values}) => 
        <Form className="container-w400" >
          <span className="form__title" >New Plan</span>
          
          <Input 
            active={false}
            error={Boolean(errors.title)}
            fieldWidth="w-90"
            name="title"
            touched={Boolean(touched.title)}
            type="text"
            value={values.title}
            autoComplete="off"
            textFormat="capitalize"
          />

          <Field 
            className={
              (errors.text && touched.text) 
              ? "form__textarea form__textarea--error" 
              : "form__textarea form"
            }
            name="text" 
            as="textarea" 
          />

          <button 
            className="btn btn--w90"
            type="submit" 
            onClick={() => handleFields(isValid, dirty)}
          >
            {
              type === "createPlan" ? "Save" : "Update"
            }
          </button>
          
          <button 
            className="btn btn--w90 pointer"          
            onClick={handleChangeUrl}
            type="button"
            hidden={type === "createPlan"}
          >
            Return
          </button>
        </Form>
      }
    </Formik>
  )
}

export default Plan