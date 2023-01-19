import { signIn } from "next-auth/react"
import { useRouter } from "next/router"
import { toast, ToastContainer } from "react-toastify"
import { Field, Form, Formik } from "formik"
import Link from "next/link"
import * as Yup from "yup"
import styles from "@/src/styles/module/Login.module.css"
import "react-toastify/dist/ReactToastify.css"

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
    email: Yup.string()
      .email()
      .required(),
    password: Yup.string()
      .required()
  }

  const handleSubmit = async (values: FormValues) => {
    const data = await signIn('credentials', { 
      redirect: false, 
      email: values.email,
      password: values.password        
    })

    if(data?.ok) {
      return router.push("/dashboard")
    }
    
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
        {({ errors, touched, isValid, dirty }) => 
          <Form className={styles["form-container"]} >
            <span className={styles.title} >
              LOG IN
            </span>

            <label className={styles.label} >
              <Field 
                className={(errors.email && touched.email) ? `${styles.label__input} ${styles["label__input--error"]}` : styles.label__input}
                name="email"
                type="email"
                placeholder="Your email"
              />
            </label>

            <label className={styles.label} >
              <Field 
                className={(errors.password && touched.password) ? `${styles.label__input} ${styles["label__input--error"]}` : styles.label__input}
                name="password"  
                type="password" 
                placeholder="Your password" 
              />
            </label>

            <Link
              href="/login/recovery-password"
              className={styles["recovery-password"]}
            >
              Forgot<b>Password?</b>
            </Link>
                  
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