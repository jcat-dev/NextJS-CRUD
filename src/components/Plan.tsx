import { setFetch } from "@/src/utils/fetch"
import { Field, Form, Formik, FormikHelpers } from "formik"
import { useRouter } from "next/router"
import { toast } from "react-toastify"
import { Plan } from "../types/plan"
import * as Yup from "yup"

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
    text: Yup.string()
      .required(),
    title: Yup.string()
      .required()
  }

  const handleCreatePlan = async (values: FormValues, actions: FormikHelpers<FormValues> ) => {
    const result = await setFetch("POST", "/api/adm/plan", values)

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
      {({errors, touched, isValid, dirty}) => 
        <Form className="container-w400" >
          <span className="form__title" >New Plan</span>
          
          <label className="form__label" >
            <span className="form__label-title">* Title</span>
            <Field 
              className={(errors.title && touched.title) ? "form__input form__input--error" : "form__input"}
              name="title" 
              type="text" 
            />
          </label>

          <Field 
            className={(errors.text && touched.text) ? "form__textarea form__textarea--error" : "form__textarea"}
            name="text" 
            as="textarea" 
          />

          <button 
            className="btn btn--w50"
            type="submit" 
            onClick={() => handleFields(isValid, dirty)}
          >
            {
              type === "createPlan" ? "Save" : "Update"
            }
          </button>
          
          <button 
            className="btn btn--w50 pointer"          
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