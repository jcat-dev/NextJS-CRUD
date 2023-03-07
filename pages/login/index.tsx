import { signIn } from "next-auth/react"
import { useRouter } from "next/router"
import { toast, ToastContainer } from "react-toastify"
import { Form, Formik } from "formik"
import * as Yup from "yup"
import styles from "@/src/styles/module/Login.module.css"
import "react-toastify/dist/ReactToastify.css"
import Input from "@/src/components/FormWithFormik/Input"
import email from "@/src/typescript/YupValidator/email"
import string from "@/src/typescript/YupValidator/string"

interface FormValues {
  email: string
  password: string
}

const Login: React.FC = () => {
  const router = useRouter()
     
  const initialValues: FormValues = {
    email: "",
    password: ""
  }

  const validationSchema = {
    email,
    password: string
  }

  const handleSubmit = async (values: FormValues) => {
    const data = await signIn('credentials', { 
      redirect: false, 
      email: values.email.toLowerCase(),
      password: values.password        
    })

    if(data?.ok) return router.push("/dashboard")
        
    return toast.error("The Email/Password is wrong", { position: "bottom-right" })
  }

  const handleFields = (isValid: boolean, dirty: boolean) => {
    if (!isValid || !dirty) return toast.error("Required Fields", {position: "bottom-right"})
  }

  return (
    <main className={styles.container} >
      <Formik 
        initialValues={initialValues}
        validationSchema={Yup.object(validationSchema)}
        onSubmit={(values) => handleSubmit(values)}
      >
        {({ errors, touched, isValid, dirty, values }) => 
          <Form className={styles["form-container"]} >
            <span className={styles.title} >
              LOG IN
            </span>

            <div className={styles.helper} >
              ?

              <p className={styles["helper-text"]} >
                test.admin.1@gmail.com/uT5550Ywhl              
              </p>
            </div>


            <Input 
              active={false}
              error={Boolean(errors.email)}
              fieldWidth="w-90"
              name="email"
              touched={Boolean(touched.email)}
              type="email"
              value={values.email}
              autoComplete="off"
              textFormat="lowercase"
            />

            <Input 
              active={false}
              error={Boolean(errors.password)}
              fieldWidth="w-90"
              name="password"
              touched={Boolean(touched.password)}
              type="password"
              value={values.password}
            />               
                  
            <button 
              className={styles["btn-submit"]}
              type="submit"
              onClick={() => handleFields(isValid, dirty)}
            >
              LOG IN
            </button>
          </Form>
        }
      </Formik>

      <ToastContainer />
    </main>
  );
}

export default Login